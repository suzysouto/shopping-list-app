import styled from '@emotion/styled'

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin: 1.25rem 0;
`

export const FormInput = styled.input`
  padding: 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
`

export const FormButton = styled.button`
  padding: 0.625rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 1rem;

  &:hover {
    background-color: var(--secondary-color);
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.625rem;
`