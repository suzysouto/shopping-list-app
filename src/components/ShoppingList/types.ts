export interface PriceHistoryEntry {
  price: number;
  date: string;
}

export interface ShoppingListTypes {
  name: string
  price: number
  quantity: number
  done: boolean
  priceHistory?: PriceHistoryEntry[]
}

export type UserShoppingList = {
  items: ShoppingListTypes[]
  supermarket: string
}