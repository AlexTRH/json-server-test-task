import * as styles from './Form.module.css'
import { Controller, useFormContext } from 'react-hook-form'
import Input from '../ui-kit/Input/Input.tsx'

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  type: 'add' | 'update'
  closeModal: () => void
  onSubmit: (data: any) => void
  footerContent?: React.ReactNode
}

const Form = ({
  type,
  closeModal,
  onSubmit,
  footerContent,
  ...props
}: FormProps) => {
  const { control, handleSubmit } = useFormContext()

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={closeModal} {...props}>
      <div className={styles.body}>
        <h2 className={styles.title}>
          {type === 'add' ? 'New Contact' : 'Edit a contact'}
        </h2>
        <div className={styles.grid}>
          <div>
            <Controller
              name="firstname"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  label="First Name*"
                  type="text"
                  placeholder="First Name*"
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="lastname"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  label="Last Name*"
                  type="text"
                  placeholder="Last Name*"
                  {...field}
                />
              )}
            />
          </div>
          <div className={styles.span}>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  label="E-Mail*"
                  type="email"
                  placeholder="E-Mail*"
                  {...field}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className={styles.footer}>{footerContent}</div>
    </form>
  )
}

export default Form
