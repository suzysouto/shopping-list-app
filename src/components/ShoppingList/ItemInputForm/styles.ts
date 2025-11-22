import styled from '@emotion/styled'

export const Content = styled.div`
  width: 100%;
  display: flex;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  gap: 0.625rem;
  margin: 1.25rem 0;
  width: 100%;
`

export const FormInput = styled.input`
  padding: 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  width: 68.5%;

  @media (max-width: 768px) {
    height: 2.3rem;
    font-size: 0.875rem;
  }
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

  @media (max-width: 768px) {
    height: 2.3rem;
    font-size: 0.875rem;
    padding: 0.2rem 0.5rem;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.625rem;
`