import styled from '@emotion/styled'
import { ButtonStylePropsTypes } from './types'
import { FaEdit, FaHistory } from 'react-icons/fa'

export const Content = styled.div``

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`

export const ActionButton = styled.button<ButtonStylePropsTypes>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  background-color: ${({ icon }) => 
      icon === FaEdit ? 'var(--edit-color)' :
      icon === FaHistory ? 'var(--primary-color)' :
      'var(--delete-color)'};

  &:hover {
    background-color: ${({ icon }) => 
      icon === FaEdit ? 'var(--edit-color-hover)' :
      icon === FaHistory ? 'var(--secondary-color)' :
      'var(--delete-color-hover)'};
  }
`
