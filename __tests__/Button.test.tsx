import { fireEvent, render } from '@testing-library/react'
import { Button } from '@components/ui-kit'
import { vi } from 'vitest'

test('renders button and handles click', () => {
  const onClick = vi.fn()
  const { getByText } = render(
    <Button variant="primary" onClick={onClick}>
      Click Me
    </Button>,
  )
  fireEvent.click(getByText('Click Me'))
  expect(onClick).toHaveBeenCalled()
})
