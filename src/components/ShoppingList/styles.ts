import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { ItemContainer } from "./ItemRow/styles"

export const Container = styled.div`
  width: 100%;
  max-width: 50%;
  margin: 1.5rem auto;
  padding: 1.5rem;
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--text-color);
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    max-width: 100%;
  }
`

export const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

export const TotalPrice = styled.h2`
  font-size: 1.25rem;
  margin-top: 1.5rem;
  text-align: right;
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