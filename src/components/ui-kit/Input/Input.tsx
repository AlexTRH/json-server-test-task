import * as styles from './Input.module.css'
import {forwardRef, useId} from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label:string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props}, ref) => {
  const id = useId()

  return (
    <>
    <label className={styles.label} htmlFor={id}>{label}</label>
      <input className={styles.input} id={id} ref={ref} {...props} />
    </>
  )
})

export default Input

