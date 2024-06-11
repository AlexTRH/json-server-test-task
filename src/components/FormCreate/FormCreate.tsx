import { useCreateContact } from '@/hooks'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '../index.ts'
import { Contact } from '@/types'
import Button from '../ui-kit/Button/Button.tsx'
import * as styles from '@components/Form/Form.module.css'

interface FormCreateProps {
  closeModal: () => void
}

const FormCreate = ({ closeModal }: FormCreateProps) => {
  const methods = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
    },
  })

  const createContact = useCreateContact()

  const onSubmit = async (data: Partial<Contact>) => {
    try {
      await createContact.mutateAsync(data)
      closeModal()
    } catch (err) {
      methods.setError('submit', {
        type: 'manual',
        message: (err as Error).message,
      })
    }
  }

  const footerContent = (
    <div className={styles.footerInner}>
      <Button variant="outlined" type="reset">
        Cancel
      </Button>
      <Button
        variant="primary"
        type="submit"
        disabled={!methods.formState.isValid}
      >
        Save
      </Button>
    </div>
  )

  return (
    <FormProvider {...methods}>
      <Form
        type="add"
        closeModal={closeModal}
        onSubmit={onSubmit}
        footerContent={footerContent}
      />
    </FormProvider>
  )
}

export default FormCreate
