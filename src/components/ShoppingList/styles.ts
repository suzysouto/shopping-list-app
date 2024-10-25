import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`

export const Form = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 8px;
    font-size: 1rem;
  }

  button {
    padding: 8px 16px;
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
  padding: 8px 0;
  border-bottom: 1px solid #ccc;
`

export const PriceInput = styled.input`
  width: 100px;
  padding: 4px;
  font-size: 1rem;
  text-align: right;
`

export const QuantityInput = styled.input`
  width: 60px;
  padding: 4px;
  font-size: 1rem;
  text-align: center;
`