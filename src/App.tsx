import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Home } from '@pages/Home/Home.tsx'
import { Header, Main } from '@components/index'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Main>
          <Home />
        </Main>
      </QueryClientProvider>
    </>
  )
}

export default App
