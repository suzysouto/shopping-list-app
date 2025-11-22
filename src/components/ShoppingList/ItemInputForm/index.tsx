import { ItemInputFormPropsTypes } from './types'
import { FormContainer, FormInput, FormButton, ButtonGroup, Content } from './styles'

export const ItemInputForm = ({
  itemName,
  onItemNameChange,
  onAddItem,
  onSaveList,
  onKeyDown
}: ItemInputFormPropsTypes) => {
  return (
    <Content>
      <FormContainer onSubmit={(e) => e.preventDefault()}>
        <FormInput
          type="text"
          placeholder="Nome do produto"
          value={itemName}
          onChange={(e) => onItemNameChange(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <ButtonGroup>
          <FormButton type="button" onClick={onAddItem}>
            Adicionar
          </FormButton>
          <FormButton type="button" onClick={onSaveList}>
            Salvar Lista
          </FormButton>
        </ButtonGroup>
      </FormContainer>
    </Content>
  )
}