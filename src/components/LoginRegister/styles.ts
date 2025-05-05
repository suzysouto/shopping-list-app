import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--text-color);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    margin-bottom: 8px;
    color: var(--text-color);
  }

  input {
    padding: 8px;
    border: 1px solid var(--text-color);
    border-radius: 4px;
    width: 100%;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  input::placeholder {
    color: var(--text-color);
    opacity: 0.7;
  }
`

export const Button = styled.button`
  padding: 8px;
  margin-top: 8px;
  background-color: var(--button-background-color);
  color: var(--button-text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: var(--button-hover-background-color);
  }
`

export const GoogleButton = styled.button`
  padding: 0.75rem;
  margin: 0.5rem 0;
  background-color: white;
  color: #757575;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;

  &:hover {
    background-color: #f5f5f5;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
`