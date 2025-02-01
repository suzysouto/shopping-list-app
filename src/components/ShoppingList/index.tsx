import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { ShoppingListTypes } from './types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Global, css } from '@emotion/react'
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
  InnerHeader,
  PaginationWrapper,
  ButtonNumbers,
  ReportButton,
} from './styles'
import { auth } from '../../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { saveList, getList } from '@/services/ListService'
import { LoginRegister } from '../LoginRegister'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  const [currentHistory, setCurrentHistory] = useState<{ price: number; date: string }[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

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
      // Verifica se o produto já existe na lista
      const isDuplicate = items.some(
        (item) => item.name.toLowerCase() === newItemName.toLowerCase()
      )
  
      if (isDuplicate) {
        toast.error("Este produto já está na lista!") // Exibe mensagem de erro
        return // Impede a adição do item duplicado
      }
  
      // Se não for duplicado, adiciona o novo item
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
      toast.success("Produto adicionado com sucesso!") // Feedback de sucesso
    }
  }

  /* const addItem = () => {
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
  } */

  const handleShowHistory = (index: number) => {
    const item = items[index]
  
    if (item && item.priceHistory) {
      setCurrentHistory(item.priceHistory)
      setModalIsOpen(true)
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
          const currentDate = new Date().toLocaleDateString('pt-BR') // Obtém a data atual formatada

          // Certifica-se de que priceHistory é uma array válida
          const priceHistory = item.priceHistory || []
          
          // Verifica se já existe um registro no histórico com a data de hoje
          const lastEntry = item.priceHistory?.[item.priceHistory.length - 1]
          const isSameDay = lastEntry && lastEntry.date === currentDate

          const updatedPriceHistory = isSameDay
            ? [...priceHistory] // Se for o mesmo dia, o histórico é mantido sem adição
            : [...priceHistory, { price: previousPrice, date: currentDate }] //Adciona o novo registro
  
          return {
            ...item,
            price: newPrice,
            priceHistory: updatedPriceHistory.slice(-5), // Mantém apenas os últimos 5 registros
          }
        }
        return item;
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

  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    doc.setFont("helvetica", "bold")

    // Título do relatório
    doc.text("Relatório de Compras", 10, 10)

    if (supermarketName) {
        doc.setFontSize(12)
        doc.text(`Supermercado: ${supermarketName}`, 10, 20)
    }

    const tableData = filteredItems.map((item) => [
      item.name || "-",
      item.quantity || 0,
      `R$ ${(item.price ?? 0).toFixed(2)}`,
      item.priceHistory
        ?.map((entry) =>
          entry.price !== undefined
            ? `R$ ${entry.price.toFixed(2)} (${entry.date})`
            : `- (${entry.date || "Data indisponível"})`
        )
        .join("\n") || "-", // Quebra de linha no histórico de preços
    ])

    let finalY = 30

    autoTable(doc, {
        head: [["Produto", "Quantidade", "Preço", "Histórico de Preços"]],
        body: tableData,
        startY: supermarketName ? 30 : 20,
        styles: { halign: "center", valign: "middle" },
        didDrawCell: (data) => {
            finalY = data.table.finalY ?? finalY
        },
    });

    // Adiciona o total abaixo da tabela com uma distância ajustada
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    const totalY = finalY + 250;  // Distância entre a tabela e o total
    doc.text(`Total Geral: R$ ${total.toFixed(2)}`, 10, totalY)

    doc.save("relatorio_compras.pdf")
  } 
  
  // Paginação: calcula os itens visíveis
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)

  // Funções de navegação
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredItems.length / itemsPerPage)))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  return (
    <ThemeProvider>
      <Global
        styles={css`
          body {
            background-color: var(--background-color);
            color: var(--text-color);
          }
        `}
      />
        <Container>
        <Header>
          <Title>Lista de Compras</Title>
        </Header>

        {!userId ? (
          <LoginRegister setUserId={setUserId} />
        ) : (
          <>
            <InnerHeader>
              <ExitButton onClick={handleLogout}>Sair</ExitButton>
            </InnerHeader>
            <ReportButton>
              <button onClick={handleDownloadPDF}>Baixar Relatório em PDF</button>
            </ReportButton>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={handleCloseModal}
              contentLabel='Histórico de Preços'
              overlayClassName="ModalOverlay"
              className="ModalContent"
            >
              <h2>Histórico de Preços</h2>
              <ul>
                {currentHistory.map((entry, idx) => (
                  <li key={idx}>
                    {entry.price !== undefined ? (
                      <>
                        Preço: R$ {entry.price.toFixed(2)} - Data: {entry.date}
                      </>
                    ) : (
                      "Preço indisponível"
                    )}
                  </li>
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
          {currentItems.map((item, index) => {
            // Calcula o índice real na lista completa (filteredItems)
            const realIndex = indexOfFirstItem + index

            return (
              <ItemContainer key={realIndex}>
                <ItemWrapper>
                  <CheckboxContainer>
                    <Checkbox
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleDone(realIndex)} // Usa o índice real
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
                      onChange={(e) => updateQuantity(realIndex, parseInt(e.target.value) || 0)} // Usa o índice real
                    />
                    <PriceInput
                      type="number"
                      placeholder="Preço"
                      step="0.01"
                      value={item.price > 0 ? item.price : ""}
                      onChange={(e) => {
                        const inputValue = e.target.valueAsNumber || 0
                        setItems((prevItems) =>
                          prevItems.map((item, i) =>
                            i === realIndex ? { ...item, price: inputValue } : item // Usa o índice real
                          )
                        );
                      }}
                      onBlur={() => updatePrice(realIndex, item.price)} // Usa o índice real
                    />
                    <DeleteButton onClick={() => removeItem(realIndex)}>Excluir</DeleteButton> {/* Usa o índice real */}
                  </SpecItemsWrapper>
                </ItemWrapper>
                <HistoryButton>
                  <button onClick={() => handleShowHistory(realIndex)}>+ Histórico</button> {/* Usa o índice real */}
                </HistoryButton>
              </ItemContainer>
            )
          })}
        </ItemList>
        {/* Controles de paginação */}
        {filteredItems.length > itemsPerPage && (
          <PaginationWrapper>
            <ButtonNumbers onClick={prevPage} disabled={currentPage === 1}>Anterior</ButtonNumbers>
            {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }, (_, i) => (
              <ButtonNumbers 
                key={i + 1} // Chave única baseada no número da página
                onClick={() => paginate(i + 1)}
                style={{
                  backgroundColor: currentPage === i + 1 ? 'var(--foreground)' : 'var(--background-color)',
                  color: currentPage === i + 1 ? 'var(--background-color)' : 'var(--text-color)',
                }}
              >
                {i + 1} {/* Exibe o número da página começando em 1 */}
              </ButtonNumbers>
            ))}
            <ButtonNumbers onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}>
              Próximo
            </ButtonNumbers>
          </PaginationWrapper>
        )}
        {userId && <TotalPrice>Total: R$ {total.toFixed(2)}</TotalPrice>}
        <ToastContainer />
      </Container>
    </ThemeProvider>    
  )
}
