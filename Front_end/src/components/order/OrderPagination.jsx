/**
 * OrderPagination Component
 * Xử lý phân trang
 */

import React, { useCallback } from 'react';
import '../../assets/order-pagination.css';

export const OrderPagination = ({ pagination, onPageChange }) => {
  const { page, limit, total, totalPages } = pagination;

  const handlePrevious = useCallback(() => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  }, [page, onPageChange]);

  const handleNext = useCallback(() => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  }, [page, totalPages, onPageChange]);

  const handlePageClick = useCallback(
    (newPage) => {
      if (newPage !== page && newPage > 0 && newPage <= totalPages) {
        onPageChange(newPage);
      }
    },
    [page, totalPages, onPageChange]
  );

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, page - Math.floor(showPages / 2));
      let end = Math.min(totalPages, start + showPages - 1);

      if (end - start + 1 < showPages) {
        start = Math.max(1, end - showPages + 1);
      }

      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="order-pagination">
      <div className="pagination-info">
        Hiển thị {startItem} - {endItem} của {total} đơn hàng
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn prev-btn"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          ← Trước
        </button>

        <div className="pagination-pages">
          {getPageNumbers().map((pageNum, idx) => (
            <button
              key={idx}
              className={`pagination-page ${pageNum === page ? 'active' : ''} ${pageNum === '...' ? 'dots' : ''}`}
              onClick={() => handlePageClick(pageNum)}
              disabled={pageNum === '...'}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          className="pagination-btn next-btn"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Sau →
        </button>
      </div>
    </div>
  );
};
