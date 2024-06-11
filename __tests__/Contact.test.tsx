import { render } from '@testing-library/react'
import { Contact } from '../src/components/ui-kit'

test('renders contact with title and text', () => {
  const { getByText } = render(
    <Contact title="John Doe" text="john.doe@example.com" />,
  )
  expect(getByText('John Doe')).toBeInTheDocument()
  expect(getByText('john.doe@example.com')).toBeInTheDocument()
})
