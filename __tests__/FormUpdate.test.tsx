import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useUpdateContact, useDeleteContact, useContacts } from '@/hooks'
import FormUpdate from '../src/components/FormUpdate/FormUpdate'
import { vi } from 'vitest'

vi.mock('@/hooks', () => ({
  useUpdateContact: vi.fn(),
  useDeleteContact: vi.fn(),
  useContacts: vi.fn(),
}))

vi.mock('react-hook-form', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...original,
    useForm: vi.fn().mockReturnValue({
      control: {},
      handleSubmit: (fn) => fn,
      formState: { isValid: true },
      setError: vi.fn(),
    }),
    useFormContext: vi.fn().mockReturnValue({
      control: {},
      handleSubmit: (fn) => fn,
      formState: { isValid: true },
      setError: vi.fn(),
    }),
    Controller: ({ render }) => render({ field: {} }),
    FormProvider: ({ children }) => <div>{children}</div>,
  }
})

const mockContacts = [
  { id: 1, firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com' },
]

test('renders and updates contact', async () => {
  useContacts.mockReturnValue({ data: mockContacts })
  const updateContactMock = vi.fn().mockResolvedValue({})
  useUpdateContact.mockReturnValue({ mutateAsync: updateContactMock })

  render(<FormUpdate contactId={1} closeModal={vi.fn()} />)

  fireEvent.click(screen.getByText('Save'))
  expect(updateContactMock).toHaveBeenCalled()
})

test('handles contact deletion', async () => {
  useContacts.mockReturnValue({ data: mockContacts })
  const deleteContactMock = vi.fn().mockResolvedValue({})
  useDeleteContact.mockReturnValue({ mutateAsync: deleteContactMock })
  const closeModal = vi.fn()

  render(<FormUpdate contactId={1} closeModal={closeModal} />)

  fireEvent.click(screen.getByText('Delete'))
  expect(deleteContactMock).toHaveBeenCalled()
})
