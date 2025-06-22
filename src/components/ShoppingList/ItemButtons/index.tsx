import { FaEdit, FaHistory, FaTrash } from 'react-icons/fa'
import { ItemButtonsPropsTypes } from './types'
import { ButtonsContainer, ActionButton } from './styles'

export const ItemButtons = ({ onEdit, onShowHistory, onRemove }: ItemButtonsPropsTypes) => {
  return (
    <ButtonsContainer>
      <ActionButton 
        onClick={onEdit} 
        icon={FaEdit}
        aria-label="Editar item"
      >
        <FaEdit size={14} />
      </ActionButton>
      
      <ActionButton 
        onClick={onShowHistory} 
        icon={FaHistory}
        aria-label="Ver histórico"
      >
        <FaHistory size={14} />
      </ActionButton>
      
      <ActionButton 
        onClick={onRemove} 
        icon={FaTrash}
        aria-label="Remover item"
      >
        <FaTrash size={14} />
      </ActionButton>
    </ButtonsContainer>
  )
}