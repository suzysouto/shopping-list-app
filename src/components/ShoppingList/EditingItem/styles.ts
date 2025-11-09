import styled from '@emotion/styled'

export const ModalContent = styled.div`
  background: #333;
  padding: 1.25rem;
  border-radius: 0.5rem;
  max-width: 400px;
  width: 90%;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color);
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`

export const HistoryTitle = styled.h2`
  font-size: 1.2rem;
  color: var(--primary-color);
  padding-bottom: 1rem;
`

export const List = styled.ul`
  list-style: none;
`

export const Item = styled.li`
  font-size: 1rem;
  color: #ccc;
  margin: 0.2rem 0;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`

export const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 0.3rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background-color: #218838;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const CloseButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--delete-color-hover);
  color: white;
  border: none;
  border-radius: 0.3rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  :hover {
    background-color: var(--delete-color);
  }
`

export const InputField = styled.input`
  border: 0.5px solid #ccc;
  border-radius: 0.3rem;
  font-size: 1rem;
  padding: 0.3rem 0.5rem;
`