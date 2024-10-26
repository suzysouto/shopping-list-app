import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 37.5rem;
  margin: 0 auto;
  padding: 1.25rem;
`

export const Form = styled.div`
  display: flex;
  gap: 0.625rem;
  margin-bottom: 1.25rem;

  input {
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #0070f3;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #005bb5;
    }
  }
`

export const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
`

export const ItemContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
`

export const PriceInput = styled.input`
  width: 6.25rem;
  padding: 0.25rem;
  font-size: 1rem;
  text-align: right;
`

export const QuantityInput = styled.input`
  width: 3.75rem;
  padding: 0.25rem;
  font-size: 1rem;
  text-align: center;
`

export const DeleteButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #E63946;
  color: #FFF;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #D62828;
  }
`