import { PriceHistoryModalPropsTypes } from './types'
import { ModalOverlay, ModalContent, CloseButton, HistoryTitle, List, Item } from './styles'

export const PriceHistoryModal = ({ isOpen, onClose, history }: PriceHistoryModalPropsTypes) => {
  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <HistoryTitle>Histórico de Preços</HistoryTitle>
        <List>
          {history.map((entry, idx) => (
            <Item key={idx}>
              {entry.price !== undefined ? (
                `Preço: R$ ${entry.price.toFixed(2)} - Data: ${entry.date}`
              ) : (
                "Preço indisponível"
              )}
            </Item>
          ))}
        </List>
        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalContent>
    </ModalOverlay>
  )
}