import { ItemInputFormPropsTypes } from './types'
import { FormContainer, FormInput, FormButton, ButtonGroup } from './styles'

export const ItemInputForm = ({
  itemName,
  onItemNameChange,
  onAddItem,
  onSaveList,
  isEditing,
  onSaveEdit,
  onCancelEdit,
  onKeyDown
}: ItemInputFormPropsTypes) => {
  return (
    <FormContainer onSubmit={(e) => e.preventDefault()}>
      <FormInput
        type="text"
        placeholder="Nome do produto"
        value={itemName}
        onChange={(e) => onItemNameChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <ButtonGroup>
        {isEditing ? (
          <>
            <FormButton type="button" onClick={onSaveEdit}>
              Salvar Edição
            </FormButton>
            <FormButton type="button" onClick={onCancelEdit}>
              Cancelar
            </FormButton>
          </>
        ) : (
          <FormButton type="button" onClick={onAddItem}>
            Adicionar
          </FormButton>
        )}
        <FormButton type="button" onClick={onSaveList}>
          Salvar Lista
        </FormButton>
      </ButtonGroup>
    </FormContainer>
  )
}