import { PaginationWrapper, ButtonNumbers } from './styles'
import { PaginationPropsTypes } from './types'

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onPrevPage,
  onNextPage,
}: PaginationPropsTypes) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  return (
    <PaginationWrapper>
      <ButtonNumbers 
        onClick={onPrevPage} 
        disabled={currentPage === 1}
      >
        Anterior
      </ButtonNumbers>
      
      {Array.from({ length: totalPages }, (_, i) => (
        <ButtonNumbers 
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          style={{
            backgroundColor: currentPage === i + 1 ? 'var(--foreground)' : 'var(--background-color)',
            color: currentPage === i + 1 ? 'var(--background-color)' : 'var(--text-color)',
          }}
        >
          {i + 1}
        </ButtonNumbers>
      ))}
      
      <ButtonNumbers 
        onClick={onNextPage} 
        disabled={currentPage === totalPages}
      >
        Próximo
      </ButtonNumbers>
    </PaginationWrapper>
  )
}