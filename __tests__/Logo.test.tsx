import { render } from '@testing-library/react'
import { Logo } from '../src/components/ui-kit'

test('renders Address book logo', () => {
  const { getByText } = render(<Logo />)
  expect(getByText('Address book')).toBeInTheDocument()
})
