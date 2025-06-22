import React, { createContext, useState, useEffect, ReactNode } from "react";

// Definição dos temas
const lightTheme = {
  "background-color": "#ffffff",
  "text-color": "#000000",
  "button-background-color": "#4caf50",
  "button-text-color": "#ffffff",
  "button-hover-background-color": "#45a049",
}

const darkTheme = {
  "background-color": "#121212",
  "text-color": "#ffffff",
  "button-background-color": "#4caf50",
  "button-text-color": "#ffffff",
  "button-hover-background-color": "#3e8e41",
}

// Criação do contexto
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("dark");

  // Função para alternar entre os temas
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  // Atualiza as variáveis CSS dinamicamente ao alterar o tema
  useEffect(() => {
    const root = document.documentElement
    const themeVars = theme === "light" ? lightTheme : darkTheme

    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
