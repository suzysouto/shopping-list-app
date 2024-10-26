import { ShoppingListTypes } from './types'
import { Container, DeleteButton, Form, ItemContainer, ItemList, PriceInput, QuantityInput } from './styles'
import { useState } from 'react';

export const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingListTypes[]>([])
  const [name, setName] = useState("")

  // Função para adicionar item apenas com o nome
  const addItem = () => {
    if (name.trim()) {
      setItems([...items, { name, price: 0, quantity: 1 }]) // Adiciona item com preço inicial de 0
      setName("")
    }
  }

  // Função para atualizar o preço de um item específico
  const updatePrice = (index: number, price: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, price } : item
    );
    setItems(updatedItems);
  }

  // Função para atualizar a quantidade de um item específico
  const updateQuantity = (index: number, quantity: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
    )
    setItems(updatedItems)
  }

  // Função para remover um item da lista
  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index)
    setItems(updatedItems)
  }

  //Função que captura se a tecla Enter foi pressionada e adiciona o item
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" ? addItem() : null
  }

  // Calcular o total
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <Container>
      <h1>Lista de Compras</h1>
      <Form>
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={addItem}>
          Adicionar
        </button>
      </Form>

      <ItemList>
        {items.map((item, index) => (
          <ItemContainer key={index}>
            <span>{item.name}</span>
            <QuantityInput
              type="number"
              placeholder="Qtd"
              value={item.quantity > 0 ? item.quantity : ""}
              onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
            />
            <PriceInput
              type="number"
              placeholder="Preço"
              value={item.price > 0 ? item.price : ""}
              onChange={(e) => updatePrice(index, parseFloat(e.target.value) || 0)}
            />
            <DeleteButton onClick={() => removeItem(index)}>Excluir</DeleteButton>
          </ItemContainer>
        ))}
      </ItemList>

      <h2>Total: R$ {total.toFixed(2)}</h2>
    </Container>
  )
}