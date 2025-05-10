export interface SupermarketFormPropsTypes {
  isOptional: boolean
  supermarketName: string
  onSupermarketChange: (name: string) => void
  onOptionChange: (isOptional: boolean) => void
}