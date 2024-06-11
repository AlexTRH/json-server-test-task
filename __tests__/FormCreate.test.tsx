import { render, screen, fireEvent } from '@testing-library/react'
import { useCreateContact } from '@/hooks'
import FormCreate from '../src/components/FormCreate/FormCreate'
import { vi } from 'vitest'

vi.mock('@/hooks', () => ({
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

test('renders and creates contact', () => {
  const mutateAsyncMock = vi.fn().mockResolvedValue({})
  useCreateContact.mockReturnValue({ mutateAsync: mutateAsyncMock })

  render(<FormCreate closeModal={vi.fn()} />)

  fireEvent.input(screen.getByLabelText('First Name*'), {
    target: { value: 'John' },
  })
  fireEvent.input(screen.getByLabelText('Last Name*'), {
    target: { value: 'Doe' },
  })
  fireEvent.input(screen.getByLabelText('E-Mail*'), {
    target: { value: 'john.doe@example.com' },
  })

  fireEvent.click(screen.getByText('Save'))
  expect(mutateAsyncMock).toHaveBeenCalled()
})
