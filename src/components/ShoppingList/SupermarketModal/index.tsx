import { SupermarketModalTypes } from './types'
import { Backdrop, ModalBox, CloseButton } from './styles'

const SupermarketModal = ({ onClose, children, isOpen }: SupermarketModalTypes) => {
  if (!isOpen) return null

  return (
    <Backdrop onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>X</CloseButton>
        {children}
      </ModalBox>
    </Backdrop>
  )
}

export default SupermarketModal