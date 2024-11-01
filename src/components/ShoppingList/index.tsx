import { useEffect, useState } from 'react'
import { ShoppingListTypes } from './types'
import { Container, Form, ItemContainer, ItemList, PriceInput, QuantityInput, DeleteButton, TotalPrice, CheckboxContainer, Checkbox, DoneItem, PendingItem, SpecItemsWrapper, ExitButton, Header, Title } from './styles'
import { auth } from '../../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { saveList, getList } from '@/services/ListService'
import { LoginRegister } from '../LoginRegister'

export const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingListTypes[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState<number>(0)
  const [newItemPrice, setNewItemPrice] = useState<number>(0)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
        loadUserList(user.uid)
      } else {
        setUserId(null)
        setItems([])
      }
    })
    return unsubscribe;
  }, [])

  const loadUserList = async (uid: string) => {
    const userItems = await getList(uid)
    setItems(userItems)
  }

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem: ShoppingListTypes = {
        name: newItemName,
        quantity: newItemQuantity,
        price: newItemPrice,
        done: false,
      }
      setItems((prevItems) => [...prevItems, newItem])
      setNewItemName("")
      setNewItemQuantity(0)
      setNewItemPrice(0)
    }
  }

  const toggleDone = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    )
    setItems(updatedItems)
  }

  const updatePrice = (index: number, price: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, price } : item
    )
    setItems(updatedItems)
  }

  const updateQuantity = (index: number, quantity: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, quantity } : item
    )
    setItems(updatedItems)
  }

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  const handleSaveList = async () => {
    if (userId) {
      try {
        await saveList(userId, items)
        console.log("Lista salva com sucesso!")
      } catch (error) {
        console.error("Erro ao salvar a lista: ", error)
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUserId(null)
      setItems([])
    } catch (error) {
      console.error("Erro ao fazer logout: ", error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addItem();
    }
  }

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <Container>
      <Header>
        <Title>Lista de Compras</Title>
        <ExitButton onClick={handleLogout}>Sair</ExitButton>
      </Header>

      {!userId ? (
        <LoginRegister setUserId={setUserId} />
      ) : (
        <>
          <Form>
            <input
              type="text"
              placeholder="Nome do produto"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button type="button" onClick={addItem}>Adicionar</button>
            <button type="button" onClick={handleSaveList}>Salvar Lista</button>
          </Form>
        </>
      )}

      <ItemList>
        {items.map((item, index) => (
          <ItemContainer key={index}>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={item.done}
                onChange={() => toggleDone(index)}
              />
              {item.done ? (
                <DoneItem>{item.name}</DoneItem>
              ) : (
                <PendingItem>{item.name}</PendingItem>
              )}
            </CheckboxContainer>
            <SpecItemsWrapper>
              <QuantityInput
                type="number"
                placeholder="Qtd"
                value={item.quantity > 0 ? item.quantity : ""}
                onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 0)}
              />
              <PriceInput
                type="number"
                placeholder="Preço"
                value={item.price > 0 ? item.price : ""}
                onChange={(e) => updatePrice(index, parseFloat(e.target.value) || 0)}
              />
              <DeleteButton onClick={() => removeItem(index)}>Excluir</DeleteButton>
            </SpecItemsWrapper>
          </ItemContainer>
        ))}
      </ItemList>

      {userId && <TotalPrice>Total: R$ {total.toFixed(2)}</TotalPrice>}
    </Container>
  )
}
