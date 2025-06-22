import { ShoppingListTypes } from '../types'

export interface ItemRowPropsTypes {
  item: ShoppingListTypes
  index: number
  isCompleted?: boolean
  onToggleDone: (index: number) => void
  onUpdateQuantity: (index: number, quantity: number) => void
  onUpdatePrice: (index: number, price: number) => void
  onEdit: (index: number) => void
  onShowHistory: (index: number) => void
  onRemove: (index: number) => void
}