import styled from '@emotion/styled'

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: #00000088;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

export const ModalBox = styled.div`
  background: #333;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
`

export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  background: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-color: #e63946;
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;

  &:hover {
    background-color: #d62828;
  }
`