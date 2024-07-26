export type PaginationProps = {
    currentPage: number,
    itemsPerPage: number,
    totalItems: number,
    handlePageChange: (page: number) => void,
}