import { ItemRowPropsTypes } from './types'
import {
  ItemContainer,
  ItemWrapper,
  CheckboxContainer,
  Checkbox,
  DoneItem,
  PendingItem,
  SpecItemsWrapper,
  QuantityInput,
  PriceInput
} from './styles'
import { ItemButtons } from '../ItemButtons'

export const ItemRow = ({
  item,
  index,
  isCompleted = false,
  onToggleDone,
  onUpdateQuantity,
  onUpdatePrice,
  onEdit,
  onShowHistory,
  onRemove
}: ItemRowPropsTypes) => {
  return (
    <ItemContainer className={isCompleted ? 'completed' : ''}>
      <ItemWrapper>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={item.done}
            onChange={() => onToggleDone(index)}
          />
          {item.done ? (
            <DoneItem>{item.name}</DoneItem>
          ) : (
            <PendingItem>{item.name}</PendingItem>
          )}
        </CheckboxContainer>
        <SpecItemsWrapper>
          <QuantityInput
            type="number"
            placeholder="Qtd"
            value={item.quantity > 0 ? item.quantity : ""}
            onChange={(e) => onUpdateQuantity(index, parseInt(e.target.value) || 0)}
          />
          <PriceInput
            type="number"
            placeholder="Preço"
            step="0.01"
            value={item.price > 0 ? item.price : ""}
            onChange={(e) => {
              const inputValue = e.target.valueAsNumber || 0
              onUpdatePrice(index, inputValue)
            }}
            onBlur={() => onUpdatePrice(index, item.price)}
          />
          <ItemButtons
            onEdit={() => onEdit(index)}
            onShowHistory={() => onShowHistory(index)}
            onRemove={() => onRemove(index)}
          />
        </SpecItemsWrapper>
      </ItemWrapper>
    </ItemContainer>
  )
}