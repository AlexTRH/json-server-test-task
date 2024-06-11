import { render } from '@testing-library/react'
import { Main } from '../src/components'

test('renders children inside main container', () => {
  const { getByText } = render(
    <Main>
      <div>Child Component</div>
    </Main>,
  )
  expect(getByText('Child Component')).toBeInTheDocument()
})
