import { useUpdateContact, useDeleteContact, useContacts } from '@/hooks'
import { FormProvider, useForm } from 'react-hook-form'
import { Form } from '../index.ts'
import { Contact } from '@types/'
import Button from '../ui-kit/Button/Button.tsx'
import * as styles from '@components/Form/Form.module.css'

interface FormUpdateProps {
  contactId: number
  closeModal: () => void
}

const FormUpdate = ({ contactId, closeModal }: FormUpdateProps) => {
  const { data: contacts } = useContacts()
  const contact = contacts?.find((contact) => contact.id === contactId)

  const methods = useForm({
    defaultValues: {
      firstname: contact?.firstname ?? '',
      lastname: contact?.lastname ?? '',
      email: contact?.email ?? '',
    },
  })

  const updateContact = useUpdateContact()
  const deleteContact = useDeleteContact()

  console.log(updateContact)

  // isLoading
  const onSubmit = async (data: Contact) => {
    try {
      await updateContact.mutateAsync({ id: contactId, ...data })
      closeModal()
    } catch (err) {
      methods.setError('submit', {
        type: 'manual',
        message: (err as Error).message,
      })
    }
  }

  const onDelete = async () => {
    try {
      await deleteContact.mutateAsync(contactId)
      closeModal()
    } catch (err) {
      methods.setError('submit', {
        type: 'manual',
        message: (err as Error).message,
      })
    }
  }

  const footerContent = (
    <>
      <Button variant="text" type="button" onClick={onDelete}>
        Delete
      </Button>
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
    </>
  )

  return (
    <FormProvider {...methods}>
      <Form
        type="update"
        closeModal={closeModal}
        onSubmit={onSubmit}
        footerContent={footerContent}
      />
    </FormProvider>
  )
}

export default FormUpdate
