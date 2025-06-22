export interface PriceHistoryModalPropsTypes {
  isOpen: boolean
  onClose: () => void
  history: Array<{
    price?: number
    date: string
  }>
}