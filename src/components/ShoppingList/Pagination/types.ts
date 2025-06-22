export interface PaginationPropsTypes {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (pageNumber: number) => void
  onPrevPage: () => void
  onNextPage: () => void
}