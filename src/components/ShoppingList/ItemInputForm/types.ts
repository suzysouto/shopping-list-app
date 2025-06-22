export interface ItemInputFormPropsTypes {
  itemName: string
  onItemNameChange: (name: string) => void
  onAddItem: () => void
  onSaveList: () => void
  isEditing: boolean
  onSaveEdit: () => void
  onCancelEdit: () => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}