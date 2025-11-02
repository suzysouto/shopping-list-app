import { ReactNode } from "react"

export interface SupermarketModalTypes {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}