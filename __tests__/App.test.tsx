import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from '../src/App'

test('renders Header, Main, and Home components', async () => {
  const { findByText } = render(
    <QueryClientProvider client={new QueryClient()}>
      <App />
    </QueryClientProvider>,
  )

  const addressBookElement = await findByText('Address book')
  expect(addressBookElement).toBeInTheDocument()

  const newContactElement = await findByText('New Contact')
  expect(newContactElement).toBeInTheDocument()
})
