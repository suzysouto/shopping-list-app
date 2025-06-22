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

export const CloseButton = styled.button`
  margin-top: 0.9375rem;
  padding: 0.5rem 1rem;
  background-color: var(--delete-color-hover);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  :hover {
    background-color: var(--delete-color);
  }
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