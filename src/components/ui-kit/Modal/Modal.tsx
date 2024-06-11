import { createPortal } from 'react-dom'
import cn from 'classnames'
import * as styles from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const overlayClassName = cn(styles.modal, {
    [styles.visible]: isOpen,
  })

  return createPortal(
    <div
      className={overlayClassName}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
