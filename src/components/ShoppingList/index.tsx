import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { ShoppingListTypes } from './types'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Form,
  ItemContainer,
  ItemList,
  PriceInput,
  QuantityInput,
  DeleteButton,
  TotalPrice,
  CheckboxContainer,
  Checkbox,
  DoneItem,
  PendingItem,
  SpecItemsWrapper,
  ExitButton,
  Header,
  Title,
  SearchContainer,
  SupermarketField,
  SupermarketLabel,
  SupermarketInput,
  RadioButtonContainer,
  RadioButtonLabel,
  ItemWrapper,
  HistoryButton,
} from './styles'
import { auth } from '../../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { saveList, getList } from '@/services/ListService'
import { LoginRegister } from '../LoginRegister'

Modal.setAppElement('body')

export const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingListTypes[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState<number>(0)
  const [newItemPrice, setNewItemPrice] = useState<number>(0)
  const [supermarketName, setSupermarketName] = useState<string>("")
  const [userId, setUserId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSupermarketOptional, setIsSupermarketOptional] = useState<boolean>(false)
  const [currentHistory, setCurrentHistory] = useState<number[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
        loadUserList(user.uid)
      } else {
        setUserId(null)
        setItems([])
        setSupermarketName('')
      }
    })
    return unsubscribe;
  }, [])

  const loadUserList = async (uid: string) => {
    const userList = await getList(uid)
    if (userList) {
      setItems(userList.items || [])
      setSupermarketName(userList.supermarket || '')
    }
  }

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem: ShoppingListTypes = {
        name: newItemName,
        quantity: newItemQuantity,
        price: newItemPrice,
        done: false,
        priceHistory: [], 
      }
      setItems((prevItems) => [...prevItems, newItem])
      setNewItemName("")
      setNewItemQuantity(0)
      setNewItemPrice(0)
    }
  }

  const handleShowHistory = (index: number) => {
    const item = items[index];
  
    if (item && item.priceHistory) {
      setCurrentHistory(item.priceHistory);
      setModalIsOpen(true);
    }
  }  

  const handleCloseModal = () => {
    setModalIsOpen(false)
    setCurrentHistory([])
  }

  const toggleDone = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    )
    setItems(updatedItems)
  }

  const updatePrice = (index: number, newPrice: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) => {
        if (i === index) {
          const previousPrice = item.price
  
          // Verifique se o histórico de preços existe e é um array
          const updatedPriceHistory = Array.isArray(item.priceHistory) 
            ? [...item.priceHistory, previousPrice]  
            : [previousPrice]
  
          return {
            ...item,
            price: newPrice,
            priceHistory: updatedPriceHistory.slice(-5), 
          }
        }
        return item
      })
  
      return updatedItems
    })
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
        await saveList(userId, items, supermarketName)
        toast.success("Lista salva com sucesso!")
      } catch (error) {
        console.error("Erro ao salvar a lista: ", error)
        toast.error("Erro ao salvar a lista.")
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUserId(null)
      setItems([])
      setSupermarketName('')
    } catch (error) {
      console.error("Erro ao fazer logout: ", error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addItem();
    }
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const total = filteredItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

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
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
            contentLabel='Histórico de Preços'
            overlayClassName="ModalOverlay"
            className="ModalContent"
          >
            <h2>Histórico de Preços</h2>
            <ul>
              {currentHistory.map((price, idx) => (
                <li key={idx}>R$ {price.toFixed(2)}</li>
              ))}
            </ul>
            <button onClick={handleCloseModal}>Fechar</button>
          </Modal>

          Deseja informar o supermercado?
          <RadioButtonContainer>
            <RadioButtonLabel>
              <input 
                type='radio'
                name='supermarketOption'
                value='yes'
                checked={isSupermarketOptional === true}
                onChange={() => setIsSupermarketOptional(true)}
              />
              Sim
            </RadioButtonLabel>
            <RadioButtonLabel>
              <input 
                type='radio'
                name='supermarketOption'
                value='no'
                checked={isSupermarketOptional === false}
                onChange={() => setIsSupermarketOptional(false)}
              />
              Não
            </RadioButtonLabel>
          </RadioButtonContainer>
          {isSupermarketOptional && (
            <SupermarketField>
              <SupermarketLabel>
                Nome do supermercado
              </SupermarketLabel>
              <SupermarketInput
                type='text'
                placeholder='Informe o nome do supermercado'
                value={supermarketName}
                onChange={(e) => setSupermarketName(e.target.value)}
              />
            </SupermarketField>
          )}
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

          <SearchContainer>
            <input
              type="text"
              placeholder="Buscar produto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Buscar</button>
          </SearchContainer>
        </>
      )}

      <ItemList>
        {filteredItems.map((item, index) => (
          <ItemContainer key={index}>
            <ItemWrapper>
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
                  step="0.01"
                  value={item.price > 0 ? item.price : ""}
                  onChange={(e) => {
                    const inputValue = e.target.valueAsNumber || 0
                    setItems(prevItems =>
                      prevItems.map((item, i) =>
                        i === index ? { ...item, price: inputValue } : item
                      )
                    );
                  }}
                  onBlur={() => updatePrice(index, item.price)}  // Atualiza quando o campo perde foco
                />
                <DeleteButton onClick={() => removeItem(index)}>Excluir</DeleteButton>
              </SpecItemsWrapper> 
            </ItemWrapper>           
            <HistoryButton>
              <button onClick={() => handleShowHistory(index)}>+ Histórico</button>
            </HistoryButton>
          </ItemContainer>
        ))}
      </ItemList>
      {userId && <TotalPrice>Total: R$ {total.toFixed(2)}</TotalPrice>}
      <ToastContainer />
    </Container>
  )
}
