import { render, screen, fireEvent } from '@testing-library/react'
import { useContacts, useCreateContact } from '@/hooks'
import { Home } from '@pages/Home/Home.tsx'
import { vi } from 'vitest'

vi.mock('@/hooks', () => ({
  useContacts: vi.fn(),
  useCreateContact: vi.fn(),
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
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Smith',
    email: 'jane.smith@example.com',
  },
]

test('renders contacts and opens add modal', () => {
  useContacts.mockReturnValue({ data: mockContacts, isLoading: false })
  useCreateContact.mockReturnValue({
    mutateAsync: vi.fn().mockResolvedValue({}),
  })

  render(<Home />)

  mockContacts.forEach((contact) => {
    expect(
      screen.getByText(`${contact.firstname} ${contact.lastname}`),
    ).toBeInTheDocument()
    expect(screen.getByText(contact.email)).toBeInTheDocument()
  })

  const newContactButtons = screen.getAllByText('New Contact')
  const newContactButton = newContactButtons.find(
    (button) => button.tagName === 'BUTTON',
  )
  fireEvent.click(newContactButton)

  expect(screen.getByRole('dialog')).toBeInTheDocument()
})
