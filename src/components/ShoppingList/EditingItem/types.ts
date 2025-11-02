export interface EditingItemModalPropsTypes {
  isOpen: boolean
  onClose: () => void
  itemName?: string
  onSave: (newName: string) => void
}
