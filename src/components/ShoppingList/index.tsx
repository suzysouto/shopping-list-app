import { ShoppingListTypes } from './types'
import { Container, Form } from './styles'
import { useState } from 'react';

export const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingListTypes[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // Função para adicionar item
  const addItem = () => {
    if (name && price) {
      const newItem = { name, price: parseFloat(price) };
      setItems([...items, newItem]);
      setName("");
      setPrice("");
    }
  };

  // Calcular o total
  const total = items.reduce((acc, item) => acc + item.price, 0)

  return (
    <Container>
      <h1>Lista de Compras</h1>
      <Form>
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Preço do produto"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="button" onClick={addItem}>
          Adicionar
        </button>
      </Form>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} - R$ {item.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <h2>Total: R$ {total.toFixed(2)}</h2>
    </Container>
  )
}