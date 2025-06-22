// pages/index.tsx
import { ShoppingList } from '@/components/ShoppingList'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Lista de Compras</title>
        <meta name="description" content="Lista de compras com cálculo total" />
      </Head>
      <main>
        <ThemeSwitcher />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
        <ShoppingList />
      </main>
    </div>
  )
}

export default Home
