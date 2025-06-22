import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--text-color);
  border-radius: 0.75rem;
  box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.15);
  width: 100%;
  transition: all 0.3s ease-in-out;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  animation: ${fadeSlideIn} 0.6s ease forwards;

  h2 {
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    text-align: center;
    color: var(--text-color);
  }

  input {
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--text-color);
    border-radius: 0.375rem;
    width: 100%;
    background-color: var(--background-color);
    color: var(--text-color);
    transition: border-color 0.3s ease;

    &:focus {
      border-color: var(--button-background-color);
      outline: none;
    }
  }

  input::placeholder {
    color: var(--text-color);
    opacity: 0.7;
  }
`

export const Button = styled.button`
  padding: 0.625rem;
  margin-top: 0.625rem;
  background-color: var(--button-background-color);
  color: var(--button-text-color);
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  width: 100%;
  font-weight: 600;
  font-size: 0.875rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: var(--button-hover-background-color);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (min-width: 600px) {
    font-size: 1rem;
  }
`

export const GoogleButton = styled(Button)`
  background-color: var(--text-color);
  color: #757575;
  border: 1px solid var(--foreground);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0.5rem 0 0;

  &:hover {
    background-color: var(--background-color);
  }

  @media (min-width: 600px) {
    padding: 0.75rem;
  }
`