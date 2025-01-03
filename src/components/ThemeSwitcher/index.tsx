import { useContext } from 'react'
import { ThemeContext } from '@/contexts/ThemeContext'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button onClick={toggleTheme}>
      Alternar para {theme === "light" ? "Tema Escuro" : "Tema Claro"}
    </button>
  )
}