// index.tsx
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
  ReportTotalDiv,
  AddSupermarket,
  SupermarketDiv,
  SupermarketName,
  ChangeSupermarket,
  SupermarketLabel,
} from './styles'
import { auth } from '../../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { saveList, getList } from '@/services/ListService'
import { LoginRegister } from '../LoginRegister'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Pagination } from './Pagination'
import { SupermarketForm } from './SupermarketForm'
import { ItemInputForm } from './ItemInputForm'
import { ItemRow } from './ItemRow'
import SupermarketModal from './SupermarketModal'
import { PriceHistoryModal } from './PriceHistoryModal'
import { EditingItemModal } from './EditingItem'

Modal.setAppElement('body')

// Componente para exibir seções da lista
const ShoppingListSection = ({
  title,
  items,
  onToggleDone,
  onUpdateQuantity,
  onUpdatePrice,
  onRemoveItem,
  onEditItem,
  onShowHistory,
  isCompletedList = false,
}: {
  title: string
  items: ShoppingListTypes[]
  onToggleDone: (index: number) => void
  onUpdateQuantity: (index: number, quantity: number) => void
  onUpdatePrice: (index: number, price: number) => void
  onRemoveItem: (index: number) => void
  onEditItem: (index: number) => void
  onShowHistory: (index: number) => void
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
  // Estados principais
  const [items, setItems] = useState<ShoppingListTypes[]>([])
  const [newItemName, setNewItemName] = useState("")
  const [newItemQuantity, setNewItemQuantity] = useState<number>(0)
  const [newItemPrice, setNewItemPrice] = useState<number>(0)
  const [supermarketName, setSupermarketName] = useState<string>("")
  const [userId, setUserId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSupermarketOptional, setIsSupermarketOptional] = useState<boolean>(false)
  const [isSupermarketModalOpen, setSupermarketModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [currentHistory, setCurrentHistory] = useState<{ price: number; date: string }[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false) // Para o modal de histórico
  const [editModalOpen, setEditModalOpen] = useState(false) // Para o modal de edição
  const [editingItemName, setEditingItemName] = useState("")

  // Autenticação e carregamento da lista
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
    return unsubscribe
  }, [])

  const loadUserList = async (uid: string) => {
    const userList = await getList(uid)
    if (userList) {
      setItems(userList.items || [])
      setSupermarketName(userList.supermarket || '')
    }
  }

  // Adicionar item
  const addItem = () => {
    if (!newItemName.trim()) return

    const isDuplicate = items.some(
      (item) => item.name.toLowerCase() === newItemName.toLowerCase()
    )
    if (isDuplicate) {
      setTimeout(() => toast.error("Este produto já está na lista!", { autoClose: 3000 }), 10)
      return
    }

    const newItem: ShoppingListTypes = {
      name: newItemName,
      quantity: newItemQuantity,
      price: newItemPrice,
      done: false,
      priceHistory: [],
    }

    const updatedItems = sortItemsAlphabetically([...items, newItem])
    setItems(updatedItems)
    setNewItemName("")
    setNewItemQuantity(0)
    setNewItemPrice(0)

    setTimeout(() => toast.success("Produto adicionado com sucesso!", { autoClose: 3000 }), 10)
  }

  // Mostrar histórico de preços
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

  // Funções de atualização e remoção de itens
  const toggleDone = (index: number) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, done: !item.done } : item))
  }

  const updatePrice = (index: number, newPrice: number) => {
    setItems(prev =>
      prev.map((item, i) => {
        if (i !== index) return item
        const previousPrice = item.price
        const currentDate = new Date().toLocaleDateString('pt-BR')
        const priceHistory = item.priceHistory || []
        const lastEntry = priceHistory[priceHistory.length - 1]
        const isSameDay = lastEntry && lastEntry.date === currentDate
        const updatedPriceHistory = isSameDay
          ? [...priceHistory]
          : [...priceHistory, { price: previousPrice, date: currentDate }]
        return { ...item, price: newPrice, priceHistory: updatedPriceHistory.slice(-5) }
      })
    )
  }

  const updateQuantity = (index: number, quantity: number) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, quantity } : item))
  }

  const removeItem = (index: number) => setItems(prev => prev.filter((_, i) => i !== index))

  const handleSaveList = async () => {
    if (!userId) return
    try {
      await saveList(userId, items, supermarketName)
      setTimeout(() => toast.success("Lista salva com sucesso!", { autoClose: 3000 }), 10)
    } catch (error) {
      console.error(error)
      setTimeout(() => toast.error("Erro ao salvar a lista!", { autoClose: 3000 }), 10)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUserId(null)
      setItems([])
      setSupermarketName('')
    } catch (error) { console.error(error) }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addItem()
  }

  const sortItemsAlphabetically = (list: ShoppingListTypes[]) =>
    list.sort((a, b) => a.name.localeCompare(b.name))

  const sortedItems = sortItemsAlphabetically(items)
  const filteredItems = sortedItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pendingItems = filteredItems.filter(item => !item.done)
  const completedItems = filteredItems.filter(item => item.done)
  const indexOfLastPendingItem = currentPage * itemsPerPage
  const indexOfFirstPendingItem = indexOfLastPendingItem - itemsPerPage
  const currentPendingItems = pendingItems.slice(indexOfFirstPendingItem, indexOfLastPendingItem)

  useEffect(() => {
    if (currentPendingItems.length === 0 && currentPage > 1) setCurrentPage(currentPage - 1)
  }, [pendingItems, currentPage, currentPendingItems.length])

  const total = filteredItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleDownloadPDF = () => {
    const doc = new jsPDF()
    doc.setFont("helvetica", "bold")
    doc.text("Relatório de Compras", 10, 10)

    if (supermarketName) {
      doc.setFontSize(12)
      doc.text(`Supermercado: ${supermarketName}`, 10, 20)
    }

    const tableData = filteredItems.map(item => [
      item.name || "-",
      item.quantity || 0,
      `R$ ${(item.price ?? 0).toFixed(2)}`,
      item.priceHistory?.map(entry =>
        entry.price !== undefined
          ? `R$ ${entry.price.toFixed(2)} (${entry.date})`
          : `- (${entry.date || "Data indisponível"})`
      ).join("\n") || "-"
    ])

    let finalY = 30

    autoTable(doc, {
      head: [["Produto", "Quantidade", "Preço", "Histórico de Preços"]],
      body: tableData,
      startY: supermarketName ? 30 : 20,
      styles: { halign: "center", valign: "middle" },
      didDrawCell: (data) => { finalY = data.table.finalY ?? finalY },
    })

    doc.setFont("helvetica", "bold")
    doc.setFontSize(14)
    doc.text(`Total Geral: R$ ${total.toFixed(2)}`, 10, finalY + 10)
    doc.save("relatorio_compras.pdf")
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredItems.length / itemsPerPage)))
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))

  const handleEditItem = (index: number) => {
    const item = items[index]
    if (item) {
      setEditingIndex(index)
      setEditingItemName(item.name)
      setEditModalOpen(true)
    }
  }

  const handleSaveEdit = () => {
    if (editingIndex === null) return
    const updatedItems = [...items]
    updatedItems[editingIndex] = {
      ...updatedItems[editingIndex],
      name: newItemName,
      quantity: newItemQuantity,
      price: newItemPrice,
    }
    setItems(updatedItems)
    setEditingIndex(null)
    setNewItemName("")
    setNewItemQuantity(0)
    setNewItemPrice(0)
    setTimeout(() => toast.success("Item atualizado com sucesso!", { autoClose: 3000 }), 10)
  }

  const handleSaveEditModal = (newName: string) => {
    if (editingIndex === null) return
    const updatedItems = [...items]
    updatedItems[editingIndex] = {
      ...updatedItems[editingIndex],
      name: newName
    }
    setItems(updatedItems)
    setEditingIndex(null)
    setEditingItemName("")
    setTimeout(() => toast.success("Item atualizado com sucesso!", { autoClose: 3000 }), 10)
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setNewItemName("")
    setNewItemQuantity(0)
    setNewItemPrice(0)
  }

  // ===================== Render =====================
  return (
    <ThemeProvider>
      <Global styles={css`body { background-color: var(--background-color); color: var(--text-color); }`} />
      <Container>
        <Header><Title>Lista de Compras</Title></Header>

        {!userId ? (
          <LoginRegister setUserId={setUserId} />
        ) : (
          <>
            <InnerHeader><ExitButton onClick={handleLogout}>Sair</ExitButton></InnerHeader>

            {/* Botão para abrir modal de supermercado */}
            <SupermarketDiv>
              {supermarketName ? (
                <div>
                  <SupermarketLabel>Supermercado:</SupermarketLabel>
                  <SupermarketName>{supermarketName}</SupermarketName>
                  <ChangeSupermarket
                    onClick={() => setSupermarketModalOpen(true)}
                  >
                    Alterar
                  </ChangeSupermarket>
                </div>
              ) : (
                <AddSupermarket onClick={() => setSupermarketModalOpen(true)}>
                  Informar Supermercado (opcional)
                </AddSupermarket>
              )}
            </SupermarketDiv>
            <SupermarketModal
              isOpen={isSupermarketModalOpen}
              onClose={() => setSupermarketModalOpen(false)}
            >
              <SupermarketForm
                isOptional={isSupermarketOptional}
                supermarketName={supermarketName}
                onOptionChange={setIsSupermarketOptional}
                onSupermarketChange={setSupermarketName}
                onSave={async () => {
                  if (!isSupermarketOptional || !supermarketName.trim() || !userId) {
                    setSupermarketModalOpen(false)
                    return
                  }

                  try {
                    await saveList(userId, items, supermarketName)
                    setSupermarketModalOpen(false)
                    setTimeout(() => 
                      toast.success(`Supermercado "${supermarketName}" salvo com sucesso!`, { 
                        autoClose: 3000 
                      }), 10
                    )
                  } catch (error) {
                    console.error("Erro ao salvar supermercado:", error)
                    setTimeout(() => 
                      toast.error("Erro ao salvar no Firebase. Tente novamente.", { 
                        autoClose: 3000 
                      }), 10
                    )
                  }
                }}
                onCancel={() => {
                  setSupermarketModalOpen(false)
                }}
              />
            </SupermarketModal>

            {/* Modal de histórico de preços */}
            <PriceHistoryModal
              isOpen={modalIsOpen}
              onClose={handleCloseModal}
              history={currentHistory}
            />

            <EditingItemModal
              isOpen={editModalOpen}
              onClose={() => setEditModalOpen(false)}
              itemName={editingItemName}
              onSave={handleSaveEditModal}
            />

            {/* Formulário de adicionar item */}
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

            {/* Busca */}
            <SearchContainer onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                placeholder="Buscar na lista abaixo"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
              />
              <button type="button">Buscar</button>
            </SearchContainer>
          </>
        )}

        {userId && filteredItems.length >= 3 && (
          <TotalPrice>Total: R$ {total.toFixed(2)}</TotalPrice>
        )}

        {/* Lista de itens pendentes */}
        <ShoppingListSection
          title="Itens Pendentes"
          items={currentPendingItems}
          onToggleDone={(index) => {
            const item = currentPendingItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) toggleDone(originalIndex)
          }}
          onUpdateQuantity={(index, quantity) => {
            const item = currentPendingItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) updateQuantity(originalIndex, quantity)
          }}
          onUpdatePrice={(index, price) => {
            const item = currentPendingItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) updatePrice(originalIndex, price)
          }}
          onRemoveItem={(index) => {
            const item = currentPendingItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) removeItem(originalIndex)
          }}
          onEditItem={(index) => {
            const item = currentPendingItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) handleEditItem(originalIndex)
          }}
          onShowHistory={(index) => {
            const item = currentPendingItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) handleShowHistory(originalIndex)
          }}
        />

        {/* Paginação */}
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

        {/* Lista de itens concluídos */}
        <ShoppingListSection
          title="Itens Concluídos"
          items={completedItems}
          onToggleDone={(index) => {
            const item = completedItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) toggleDone(originalIndex)
          }}
          onUpdateQuantity={(index, quantity) => {
            const item = completedItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) updateQuantity(originalIndex, quantity)
          }}
          onUpdatePrice={(index, price) => {
            const item = completedItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) updatePrice(originalIndex, price)
          }}
          onRemoveItem={(index) => {
            const item = completedItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) removeItem(originalIndex)
          }}
          onEditItem={(index) => {
            const item = completedItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) handleEditItem(originalIndex)
          }}
          onShowHistory={(index) => {
            const item = completedItems[index]
            const originalIndex = items.findIndex(i => i.name === item.name)
            if (originalIndex !== -1) handleShowHistory(originalIndex)
          }}
          isCompletedList
        />

        {/* Botão de relatório PDF */}
        <ReportTotalDiv>
          {userId && 
            <ReportButton>
              <button onClick={handleDownloadPDF}>Baixar Relatório (PDF)</button>
            </ReportButton>
          }
          {userId && <TotalPrice>Total: R$ {total.toFixed(2)}</TotalPrice>}
        </ReportTotalDiv>

        <ToastContainer />
      </Container>
    </ThemeProvider>
  )
}
