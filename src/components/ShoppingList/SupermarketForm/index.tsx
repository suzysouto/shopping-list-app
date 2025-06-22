import { SupermarketFormPropsTypes } from './types'
import {
  RadioButtonContainer,
  RadioButtonLabel,
  SupermarketField,
  SupermarketLabel,
  SupermarketInput
} from './styles'

export const SupermarketForm = ({
  isOptional,
  supermarketName,
  onSupermarketChange,
  onOptionChange
}: SupermarketFormPropsTypes) => {
  return (
    <>
      <div>Deseja informar o supermercado?</div>
      <RadioButtonContainer>
        <RadioButtonLabel>
          <input 
            type='radio'
            name='supermarketOption'
            value='yes'
            checked={isOptional === true}
            onChange={() => onOptionChange(true)}
          />
          Sim
        </RadioButtonLabel>
        <RadioButtonLabel>
          <input 
            type='radio'
            name='supermarketOption'
            value='no'
            checked={isOptional === false}
            onChange={() => onOptionChange(false)}
          />
          Não
        </RadioButtonLabel>
      </RadioButtonContainer>
      {isOptional && (
        <SupermarketField>
          <SupermarketLabel>
            Nome do supermercado
          </SupermarketLabel>
          <SupermarketInput
            type='text'
            placeholder='Informe o nome do supermercado'
            value={supermarketName}
            onChange={(e) => onSupermarketChange(e.target.value)}
          />
        </SupermarketField>
      )}
    </>
  )
}