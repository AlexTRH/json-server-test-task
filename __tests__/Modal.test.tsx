import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from '@components/ui-kit'
import { vi } from 'vitest'

test('renders children and handles close', () => {
  const onClose = vi.fn()
  render(
    <Modal isOpen={true} onClose={onClose}>
      <div>Modal Content</div>
    </Modal>,
  )

  expect(screen.getByText('Modal Content')).toBeInTheDocument()
  fireEvent.click(screen.getByText('Modal Content'))
  expect(onClose).not.toHaveBeenCalled()

  fireEvent.click(screen.getByRole('dialog'))
  expect(onClose).toHaveBeenCalled()
})
