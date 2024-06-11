import { render, screen } from '@testing-library/react'
import { Input } from '@components/ui-kit'
test('renders input with label', () => {
  render(<Input label="Test Label" />)
  expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
})
