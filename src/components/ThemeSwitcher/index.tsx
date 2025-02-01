import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa'; // Ícones de sol e lua
import styled from '@emotion/styled';

// Estilos para o botão
const SwitchButton = styled.button`
  background: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#333' : '#f0f0f0')};
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-self: flex-end;
  transition: background 0.3s ease, color 0.3s ease;
  margin: 1rem;

  &:hover {
    background: ${({ theme }) => (theme === 'light' ? '#ddd' : '#444')};
  }
`;

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <SwitchButton theme={theme} onClick={toggleTheme}>
      {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
    </SwitchButton>
  )
}