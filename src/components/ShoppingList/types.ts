// Representa um item individual na lista de compras
export interface ShoppingListTypes {
  name: string
  price: number
  quantity: number
  done: boolean
  priceHistory?: number[]
}

// Representa a lista de compras completa com os itens e o nome do supermercado
export type UserShoppingList = {
  items: ShoppingListTypes[]
  supermarket: string
}