//分頁
// Pagination.tsx
import React from 'react';

interface PaginationProps {
  totalItems: number; // 總數量
  itemsPerPage: number; // 每頁顯示的數量
  currentPage: number; // 當前頁面
  onPageChange: (page: number) => void; // 分頁變更事件
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        上一頁
      </button>
      
      <span>{currentPage} / {totalPages}</span>
      
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        下一頁
      </button>
    </div>
  );
};

export default Pagination;
