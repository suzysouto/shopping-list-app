import { css } from "@emotion/react"
import styled from "@emotion/styled"

export const Container = styled.div`
  max-width: 43.5rem;
  margin: 1.5rem auto;
  padding: 1.5rem;
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--text-color);
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);
`

export const Form = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  input {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background-color: #2c2c2c;
    color: #ffffff;
    width: 50%;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #0070f3;
    color: #ffffff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #005bb5;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;

    button {
      width: 100%;
    }
    
    input {
      width: 100%;
    }
  }
`

export const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

export const ItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #444;
  gap: 0.75rem;
  background-color: #2c2c2c;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const ItemWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`

export const PriceInput = styled.input`
  width: 6.25rem; /* 100px */
  padding: 0.5rem;
  font-size: 1rem;
  text-align: right;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #2c2c2c;
  color: #ffffff;

  @media (max-width: 600px) {
    width: 100%;
    text-align: left;
  }
`

export const QuantityInput = styled.input`
  width: 3.75rem; /* 60px */
  padding: 0.5rem;
  font-size: 1rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #2c2c2c;
  color: #ffffff;

  @media (max-width: 600px) {
    width: 100%;
  }
`

export const EditButton = styled.button`
  padding: 8px;
  background-color: #f0ad4e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ec971f;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const HistoryButton = styled.button`
  padding: 8px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--secondary-color);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const DeleteButton = styled.button`
  padding: 8px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c9302c;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const TotalPrice = styled.h2`
  font-size: 1.25rem;
  margin-top: 1.5rem;
  text-align: right;
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`

export const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  accent-color: #4caf50;
`

export const DoneItem = styled.span`
  text-decoration: line-through;
  color: #888888;
`

export const PendingItem = styled.span`
  color: #ffffff;
`

export const SpecItemsWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    text-align-last: center;
    gap: 0.7rem;
  }
`

export const ExitButton = styled.button`
  padding: 8px;
  margin-top: 8px;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 20%;

  &:hover {
    background-color: #d62828;
  }

  @media (max-width: 600px) {
    margin-bottom: 0.7rem;
  }
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 2rem;
  align-items: baseline;
`

export const Title = styled.h1`
  font-size: 2rem;

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`

export const SearchContainer = styled.div`
  display: flex;
  gap: 0.625rem;
  margin-bottom: 1.25rem;

  input {
    flex: 1; /* Para ocupar o espaço disponível */
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #005bb5;
    }
  }
`

export const SupermarketField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`

export const SupermarketLabel = styled.label`
  font-size: 1rem;
  color: #FFF;
  margin-bottom: 0.5rem;
`

export const SupermarketInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`

export const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 8rem;
  padding: 1rem 0;
`

export const RadioButtonLabel = styled.div`
  input {
    margin-right: 0.5rem;
  }
`

export const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalContent = styled.div`
  background: #ccc;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

export const GlobalStyles = css`
  .ModalOverlay {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ModalContent {
    background: #333;
    color: #0070f3;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    h2 {
      font-size: 1.3rem;
      margin-bottom: 1.3rem;
    }

    ul {
      list-style: none;
      color: #ccc;
      
      li {
        font-size: 1rem;
        margin-bottom: 0.3rem;
      }
    }

    button {
      background-color: var(--primary-color);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      cursor: pointer;

      :hover {
        background-color: var(--secondary-color);
      }
    }
  }
`

export const InnerHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: -4.5rem 0 2rem;
`

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 0.5rem; /* Espaçamento entre os botões */
`

export const ButtonNumbers = styled.button<{ isActive?: boolean }>`
  margin: 0 0.25rem;
  padding: 0.5rem 1rem;
  color: ${({ isActive }) => (isActive ? 'var(--button-text-color)' : 'var(--text-color)')};
  background-color: ${({ isActive }) => (isActive ? 'var(--primary-color)' : 'transparent')};
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? 'var(--primary-color)' : 'var(--secondary-color)'};
    color: ${({ isActive }) => (isActive ? 'var(--button-text-color)' : 'var(--text-color)')};
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`

export const ReportButton = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin: 0 0.25rem;
    padding: 0.5rem 1rem;
    color: var(--button-text-color);
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 0.875rem;
    transition:
      background-color 0.3s ease,
      color 0.3s ease,
      transform 0.2s ease;

    &:hover {
      background-color: var(--secondary-color);
    }
  }
`

export const SectionTitle = styled.h3`
  margin: 20px 0 10px;
  color: var(--text-color);
  font-size: 1.2rem;
  border-bottom: 1px solid var(--foreground);
  padding-bottom: 5px;
`

export const CompletedSection = styled.div`
  opacity: 0.8;
  margin-top: 30px;
  
  ${ItemContainer} {
    background-color: var(--completed-item-bg);
  }
`

export const SectionWrapper = styled.div`
  margin-top: 20px;
`