// pages/index.tsx
import { ShoppingList } from '@/components/ShoppingList';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import Head from 'next/head';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Lista de Compras</title>
        <meta name="description" content="Lista de compras com cálculo total" />
      </Head>
      <main>
        <ThemeSwitcher />
        <ShoppingList />
      </main>
    </div>
  )
}

export default Home
