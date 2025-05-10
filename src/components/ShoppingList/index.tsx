import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { ShoppingListTypes } from './types'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { Global, css } from '@emotion/react'
import {
  Container,
  ItemList,
  TotalPrice,
  ExitButton,
  Header,
  Title,
  SearchContainer,
  InnerHeader,
  ReportButton,
  SectionWrapper,
  SectionTitle,
} from './styles'
import { auth } from '../../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { saveList, getList } from '@/services/ListService'
import { LoginRegister } from '../LoginRegister'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Pagination } from './Pagination'
import { PriceHistoryModal } from './PriceHistoryModal'
import { SupermarketForm } from './SupermarketForm'
import { ItemInputForm } from './ItemInputForm'
import { ItemRow } from './ItemRow'

Modal.setAppElement('body')

const ShoppingListSection = ({
  title,
  items,
  onToggleDone,
  onUpdateQuantity,
  onUpdatePrice,
  onRemoveItem,
  onShowHistory,
  onEditItem,
  isCompletedList = false,
}: {
  title: string
  items: ShoppingListTypes[]
  onToggleDone: (index: number) => void
  onUpdateQuantity: (index: number, quantity: number) => void
  onUpdatePrice: (index: number, price: number) => void
  onRemoveItem: (index: number) => void
  onShowHistory: (index: number) => void
  onEditItem: (index: number) => void
  isCompletedList?: boolean
}) => {
  if (items.length === 0) return null

  return (
    <SectionWrapper>
      <SectionTitle>{title}</SectionTitle>
      <ItemList>
        {items.map((item, index) => (
          <ItemRow
            key={index}
            item={item}
            index={index}
            isCompleted={isCompletedList}
            onToggleDone={onToggleDone}
            onUpdateQuantity={onUpdateQuantity}
            onUpdatePrice={onUpdatePrice}
            onEdit={onEditItem}
            onShowHistory={onShowHistory}
            onRemove={onRemoveItem}
          />
        ))}
      </ItemList>
    </SectionWrapper>
  )
}

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
  const [itemsPerPage] = useState(10)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

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
        return
      }
  
      // Se não for duplicado, adiciona o novo item
      const newItem: ShoppingListTypes = {
        name: newItemName,
        quantity: newItemQuantity,
        price: newItemPrice,
        done: false,
        priceHistory: [],
      }

      const updatedItems = [...items, newItem]
      const sortedItems = sortItemsAlphabetically(updatedItems) // Ordena a lista após adiconar
      setItems(sortedItems)
      setNewItemName("")
      setNewItemQuantity(0)
      setNewItemPrice(0)
      toast.success("Produto adicionado com sucesso!") // Feedback de sucesso
    }
  }

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

  const sortItemsAlphabetically = (items: ShoppingListTypes[]) => {
    return items.sort((a, b) => a.name.localeCompare(b.name))
  }

  const sortedItems = sortItemsAlphabetically(items) // Ordena a lista alfabeticamente

  // Corrigindo a busca para considerar itens pendentes e concluídos
  const filteredItems = sortedItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Itens pendentes filtrados e paginados
  const pendingItems = filteredItems.filter(item => !item.done)
  const indexOfLastPendingItem = currentPage * itemsPerPage
  const indexOfFirstPendingItem = indexOfLastPendingItem - itemsPerPage
  const currentPendingItems = pendingItems.slice(indexOfFirstPendingItem, indexOfLastPendingItem)

  // Itens concluídos (não paginados)
  const completedItems = filteredItems.filter(item => item.done)

  // Corrigindo a paginação para atualizar quando itens são marcados como concluídos
  useEffect(() => {
    // Se a página atual ficar vazia após marcar itens como concluídos, volta uma página
    if (currentPendingItems.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }, [pendingItems, currentPage, currentPendingItems.length])


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
    })

    // Adiciona o total abaixo da tabela com uma distância ajustada
    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    const totalY = finalY + 250  // Distância entre a tabela e o total
    doc.text(`Total Geral: R$ ${total.toFixed(2)}`, 10, totalY)

    doc.save("relatorio_compras.pdf")
  } 

  // Funções de navegação
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredItems.length / itemsPerPage)))
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  const handleEditItem = (index: number) => {
    setEditingIndex(index)
    const item = items[index]
    setNewItemName(item.name)
    setNewItemQuantity(item.quantity)
    setNewItemPrice(item.price)
    toast.info("Editando item...")
  }
  
  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedItems = [...items]
      updatedItems[editingIndex] = {
        ...updatedItems[editingIndex],
        name: newItemName,
        quantity: newItemQuantity,
        price: newItemPrice
      }
      setItems(updatedItems)
      setEditingIndex(null)
      setNewItemName("")
      setNewItemQuantity(0)
      setNewItemPrice(0)
      toast.success("Item atualizado com sucesso!")
    }
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setNewItemName("")
    setNewItemQuantity(0)
    setNewItemPrice(0)
  }

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
            <PriceHistoryModal
              isOpen={modalIsOpen}
              onClose={handleCloseModal}
              history={currentHistory}
            />
            <SupermarketForm
              isOptional={isSupermarketOptional}
              supermarketName={supermarketName}
              onSupermarketChange={setSupermarketName}
              onOptionChange={setIsSupermarketOptional}
            />
            <ItemInputForm
              itemName={newItemName}
              onItemNameChange={setNewItemName}
              onAddItem={addItem}
              onSaveList={handleSaveList}
              isEditing={editingIndex !== null}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onKeyDown={handleKeyDown}
            />
            <SearchContainer onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Buscar produto"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Resetar a página ao buscar
                }}
              />
              <button type="button">Buscar</button>
            </SearchContainer>
          </>
        )}
      {/* Lista principal (itens pendentes) - usando currentPendingItems */}
      <ShoppingListSection
          title="Itens Pendentes"
          items={currentPendingItems}
          onToggleDone={(index) => {
            const item = currentPendingItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) {
              toggleDone(originalIndex)
            }
          }}
          onUpdateQuantity={(index, quantity) => {
            const item = currentPendingItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) {
              updateQuantity(originalIndex, quantity)
            }
          }}
          onUpdatePrice={(index, price) => {
            const item = currentPendingItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) {
              updatePrice(originalIndex, price)
            }
          }}
          onRemoveItem={(index) => {
            const item = currentPendingItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) {
              removeItem(originalIndex)
            }
          }}
          onShowHistory={(index) => {
            const item = currentPendingItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) {
              handleShowHistory(originalIndex)
            }
          }}
          onEditItem={(index) => {
            const item = currentPendingItems[index];
            const originalIndex = items.findIndex(i => i.name === item.name);
            if (originalIndex !== -1) {
              handleEditItem(originalIndex);
            }
          }}
        />

        {/* Lista de itens concluídos - usando completedItems */}
        <ShoppingListSection
          title="Itens Concluídos"
          items={completedItems}
          onToggleDone={(index) => {
            const item = completedItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) {
              toggleDone(originalIndex)
            }
          }}
          onUpdateQuantity={(index, quantity) => {
            const item = completedItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) {
              updateQuantity(originalIndex, quantity)
            }
          }}
          onUpdatePrice={(index, price) => {
            const item = completedItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) {
              updatePrice(originalIndex, price)
            }
          }}
          onRemoveItem={(index) => {
            const item = completedItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) {
              removeItem(originalIndex)
            }
          }}
          onShowHistory={(index) => {
            const item = completedItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) {
              handleShowHistory(originalIndex)
            }
          }}
          onEditItem={(index) => {
            const item = currentPendingItems[index];
            const originalIndex = items.findIndex(i => i.name === item.name);
            if (originalIndex !== -1) {
              handleEditItem(originalIndex);
            }
          }}
          isCompletedList={true}
        />

        {/* Controles de paginação - agora baseado em pendingItems */}
        {pendingItems.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalItems={pendingItems.length}
            itemsPerPage={itemsPerPage}
            onPageChange={paginate}
            onPrevPage={prevPage}
            onNextPage={nextPage}
          />
        )}
      
      {userId && <TotalPrice>Total: R$ {total.toFixed(2)}</TotalPrice>}
      <ToastContainer />
      </Container>
    </ThemeProvider>    
  )
}
