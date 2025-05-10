import styled from '@emotion/styled'

export const Content = styled.div``

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
