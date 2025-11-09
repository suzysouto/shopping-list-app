/* import styled from '@emotion/styled'

export const RadioButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 10px 0;
`

export const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

export const SupermarketField = styled.div`
  margin: 15px 0;
`

export const SupermarketLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`

export const SupermarketInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
` */

// styles.ts (atualizado)
import styled from '@emotion/styled'

export const RadioButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin: 10px 0;
`

export const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

export const SupermarketField = styled.div`
  margin: 15px 0;
`

export const SupermarketLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`

export const SupermarketInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
`

// Novos estilos
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`

export const SaveButton = styled.button`
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background-color: #218838;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const CancelButton = styled.button`
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #5a6268;
  }
`