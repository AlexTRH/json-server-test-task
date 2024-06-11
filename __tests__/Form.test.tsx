import { render, screen, fireEvent } from '@testing-library/react'
import { FormProvider } from 'react-hook-form'
import Form from '@components/Form/Form'
import { vi } from 'vitest'
import Button from '@components/ui-kit/Button/Button'

vi.mock('react-hook-form', async (importOriginal) => {
  const originalModule = await importOriginal()
  return {
    ...originalModule,
    useFormContext: vi.fn().mockReturnValue({
      control: {},
      handleSubmit: (fn) => fn,
      formState: { isValid: true },
    }),
    Controller: ({ render }) => render({ field: {} }),
  }
})

test('renders form and handles submit', () => {
  const onSubmit = vi.fn()
  const closeModal = vi.fn()

  const footerContent = (
    <div>
      <Button variant="outlined" type="reset">
        Cancel
      </Button>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </div>
  )

  render(
    <FormProvider>
      <Form
        type="add"
        closeModal={closeModal}
        onSubmit={onSubmit}
        footerContent={footerContent}
      />
    </FormProvider>,
  )

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
  expect(onSubmit).toHaveBeenCalled()
})
