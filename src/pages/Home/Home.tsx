import { useState } from 'react'
import { useContacts } from '@/hooks'
import { FormType } from '@components/Form/Form.tsx'
import * as styles from './Home.module.css'
import { Button, Contact, Modal } from '@components/ui-kit'
import FormCreate from '@components/FormCreate/FormCreate.tsx'
import FormUpdate from '@components/FormUpdate/FormUpdate.tsx'

export const Home = () => {
  const { data: contacts, isLoading } = useContacts()
  const [formType, setFormType] = useState<FormType>('hidden')
  const [contactToUpdate, setContactToUpdate] = useState<number | null>(null)

  if (isLoading) return <div>Loading...</div>

  const openAddModal = () => {
    setFormType('add')
  }

  const openUpdateModal = (id: number) => () => {
    setFormType('update')
    setContactToUpdate(id)
  }

  const closeModal = () => {
    setFormType('hidden')
    setContactToUpdate(null)
  }

  return (
    <>
      <div className={styles.buttonDesktop}>
        <Button variant="primary" onClick={openAddModal}>
          New Contact
        </Button>
      </div>
      <div className={styles.buttonMobile}>
        <Button variant="icon" onClick={openAddModal}>
          +
        </Button>
      </div>
      <ul className={styles.contacts}>
        {contacts?.map(({ id, firstname, lastname, email }) => (
          <li key={id} className={styles.contact} onClick={openUpdateModal(id)}>
            <Contact title={`${firstname} ${lastname}`} text={email} />
          </li>
        ))}
      </ul>

      <Modal isOpen={formType !== 'hidden'} onClose={closeModal}>
        {formType === 'add' && <FormCreate closeModal={closeModal} />}
        {formType === 'update' && (
          <FormUpdate contactId={contactToUpdate} closeModal={closeModal} />
        )}
      </Modal>
    </>
  )
}
