import styled from '@emotion/styled'

export const ItemContainer = styled.div`
  background-color: #333;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;

  &.completed {
    opacity: 0.7;
  }
`

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-grow: 1;
`

export const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  accent-color: #4caf50;
`

export const DoneItem = styled.span`
  text-decoration: line-through;
  color: #888888;
`

export const PendingItem = styled.span`
  color: #ffffff;
`

export const SpecItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const PriceInput = styled.input`
  width: 6.25rem;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: right;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #2c2c2c;
  color: #ffffff;

  @media (max-width: 600px) {
    width: 100%;
    text-align: left;
  }
`

export const QuantityInput = styled.input`
  width: 3.75rem;
  padding: 0.5rem;
  font-size: 1rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #2c2c2c;
  color: #ffffff;

  @media (max-width: 600px) {
    width: 100%;
  }
`