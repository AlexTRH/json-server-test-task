import { render } from '@testing-library/react'
import { Header } from '../src/components'

test('renders header with logo', () => {
  const { getByText } = render(<Header />)
  expect(getByText('Address book')).toBeInTheDocument()
})
