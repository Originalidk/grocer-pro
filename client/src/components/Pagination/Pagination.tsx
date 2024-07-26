import React from 'react'
import { PaginationProps } from './Pagination.type';

function Pagination(props: PaginationProps) {
    const { currentPage, itemsPerPage, totalItems, handlePageChange } = props;
    const pages: Array<number> = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    /**
     * Page should be dotted under 3 conditions:
     * 1) The page is not 1, 2 or the final page
     * 2) The absolute difference between the page number and current page is greater than 2
     * 3) The pages before or after it have yet to represented by the dots
     */
    const isPageDotted = (page: number) => {
        return (currentPage > 5 && page === currentPage - 3) // If current page is above 5, hide previous pages that have a difference greater than 2
        || (currentPage <= 2 && page === 6 && page < totalPages) // While current page is below 2, hide future pages that are not the last page
        || (currentPage > 2 && page === currentPage + 3 && page < totalPages) // If current page is above 5, hide future pages that are not the last page
    }

    /**
     * Page should be shown as long as one of the following conditions is met:
     * 1) The page is 1, 2 or the last page number
     * 2) The absolute difference between the page number and current page is less than or equal to 2
     * 3) If the current page number is less than or equal to 5, all pages below it should be shown
     */
    const isPageShown = (page: number) => {
        return page <= 2 // page is 1 or 2
        || (page <= 5 && currentPage <= 5) // current page is less than or equal to 5, making the first 5 pages shown 
        || (page <= currentPage + 2 && page >= currentPage - 2) // page is within the correct range
        || page === totalPages; // page is the last page
    }

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
  return (
    <div className='flex flex-row space-x-2'>
      <button key='previous-page' onClick={() => handlePageChange(currentPage - 1)} className='py-2 px-2' disabled={currentPage <= 1}>&lt; Previous</button>
      {pages.map((page) => {
        return (isPageDotted(page)) ? (
          <button key={`dots-page-${page}`}>...</button>
        ) : (isPageShown(page)) && (
          <button key={`${page}`} onClick={() => handlePageChange(page)} className={`py-2 px-4 ${currentPage === page && 'border-2 border-green-700 font-semibold'}`}>{page}</button>
        )
      })}
      <button key='next-page' onClick={() => handlePageChange(currentPage + 1)} className='py-2 px-2' disabled={currentPage >= totalPages}>Next &gt;</button>
    </div>
  )
}

export default Pagination
