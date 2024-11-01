import styled from '@emotion/styled'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    margin-bottom: 8px;
  }

  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
  }
`

export const Button = styled.button`
  padding: 8px;
  margin-top: 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #45a049;
  }
`