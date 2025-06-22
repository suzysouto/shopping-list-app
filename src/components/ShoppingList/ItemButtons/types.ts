import { FaEdit, FaHistory, FaTrash } from 'react-icons/fa'

export interface ItemButtonsPropsTypes {
  onEdit: () => void
  onShowHistory: () => void
  onRemove: () => void
}

export interface ButtonStylePropsTypes {
  icon: typeof FaEdit | typeof FaHistory | typeof FaTrash
}