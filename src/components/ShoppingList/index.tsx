import { ShoppingListTypes } from './types'
import { Container, DeleteButton, Form, ItemContainer, ItemList, PriceInput, QuantityInput } from './styles'
import { useEffect, useState } from 'react'
import { auth } from '../../firebaseConfig'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { saveList, getList } from '@/services/ListService'

export const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingListTypes[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState<number>(0)
  const [newItemPrice, setNewItemPrice] = useState<number>(0)
  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)

  // Observar o estado de autenticação do usuário
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

  // Função para carregar a lista de compras do usuário
  const loadUserList = async (uid: string) => {
    const userItems = await getList(uid)
    setItems(userItems)
  }

  // Função para adicionar um item à lista
  const addItem = () => {
    if (newItemName.trim()) {
      const newItem: ShoppingListTypes = {
        name: newItemName,
        quantity: newItemQuantity,
        price: newItemPrice,
      }

      setItems((prevItems) => [...prevItems, newItem])
      setNewItemName("")
      setNewItemQuantity(0)
      setNewItemPrice(0)
    }
  }

  // Função para atualizar o preço de um item específico
  const updatePrice = (index: number, price: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, price } : item
    )
    setItems(updatedItems)
  }

  // Função para atualizar a quantidade de um item específico
  const updateQuantity = (index: number, quantity: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, quantity } : item
    )
    setItems(updatedItems)
  }

  // Função para remover um item da lista
  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index))
  }

  // Função para salvar a lista no Firestore
  const handleSaveList = async () => {
    if (userId) {
      try {
        await saveList(userId, items) // Salva a lista no Firestore
        console.log("Lista salva com sucesso!")
      } catch (error) {
        console.error("Erro ao salvar a lista: ", error)
      }
    } else {
      console.log("Usuário não autenticado. Não é possível salvar a lista.")
    }
  }

  // Função para fazer login do usuário
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUserId(userCredential.user.uid)
    } catch (error) {
      console.error("Erro ao fazer login: ", error)
    }
  }

  // Função para criar um novo usuário
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      setUserId(userCredential.user.uid)
      setIsRegistering(false)
    } catch (error) {
      console.error("Erro ao registrar: ", error)
    }
  }

  // Função para fazer logout do usuário
  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUserId(null)
      setItems([])
    } catch (error) {
      console.error("Erro ao fazer logout: ", error)
    }
  }

  // Função que captura se a tecla Enter foi pressionada e adiciona o item
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addItem()
  }

  // Calcular o total
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container>
      <h1>Lista de Compras</h1>

      {/* Formulário de Login ou Registro */}
      {!userId ? (
        <div>
          {isRegistering ? (
            <div>
              <h2>Criar Conta</h2>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleRegister}>Registrar</button>
              <button onClick={() => setIsRegistering(false)}>Já tem uma conta? Entrar</button>
            </div>
          ) : (
            <div>
              <h2>Login</h2>
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Entrar</button>
              <button onClick={() => setIsRegistering(true)}>Criar conta</button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={handleLogout}>Sair</button>
      )}

      {/* Formulário para adicionar itens à lista */}
      {userId && (
        <Form>
          <input
            type="text"
            placeholder="Nome do produto"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" onClick={addItem}>
            Adicionar
          </button>
          <button type="button" onClick={handleSaveList}>
            Salvar Lista
          </button>
        </Form>
      )}

      <ItemList>
        {items.map((item, index) => (
          <ItemContainer key={index}>
            <span>{item.name}</span>
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
          </ItemContainer>
        ))}
      </ItemList>

      <h2>Total: R$ {total.toFixed(2)}</h2>
    </Container>
  )
}