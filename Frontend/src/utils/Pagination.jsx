// paginationUtils.js
export const getPageRange = (currentPage, totalPages, maxPagesToShow) => {
    const pages = [];
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = currentPage - Math.floor(maxPagesToShow / 2);
      let endPage = currentPage + Math.floor(maxPagesToShow / 2);
  
      if (startPage < 1) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxPagesToShow + 1;
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    return pages;
  };
  