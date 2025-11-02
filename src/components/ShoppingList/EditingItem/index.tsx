import { useState, useEffect } from 'react'
import { EditingItemModalPropsTypes } from './types'
import { ModalOverlay, ModalContent, CloseButton, HistoryTitle, SaveButton, InputField } from './styles'

export const EditingItemModal = ({
  isOpen,
  onClose,
  itemName,
  onSave
}: EditingItemModalPropsTypes) => {
  const [name, setName] = useState("")

  useEffect(() => {
    if (isOpen) {
      setName(itemName || "")
    }
  }, [isOpen, itemName])

  if (!isOpen) return null

  const handleSave = () => {
    onSave(name)
    onClose()
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <HistoryTitle>Editando Item</HistoryTitle>
        <InputField 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Nome do item"
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <CloseButton onClick={onClose}>Fechar</CloseButton>
          <SaveButton onClick={handleSave}>Salvar</SaveButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  )
}
