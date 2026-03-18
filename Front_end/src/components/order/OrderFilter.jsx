/**
 * OrderFilter Component
 * Xử lý filter UI: status, payment method, payment status, date range
 */

import React, { useState, useCallback } from 'react';
import '../../assets/order-filter.css';

export const OrderFilter = ({ onFilterChange, onReset }) => {
  const [filters, setFilters] = useState({
    status: '',
    paymentMethod: '',
    paymentStatus: '',
    dateFrom: '',
    dateTo: '',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = useCallback((e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, status: value }));
    onFilterChange({ status: value });
  }, [onFilterChange]);

  const handlePaymentMethodChange = useCallback((e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, paymentMethod: value }));
    onFilterChange({ paymentMethod: value });
  }, [onFilterChange]);

  const handlePaymentStatusChange = useCallback((e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, paymentStatus: value }));
    onFilterChange({ paymentStatus: value });
  }, [onFilterChange]);

  const handleDateFromChange = useCallback((e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, dateFrom: value }));
    onFilterChange({ dateFrom: value });
  }, [onFilterChange]);

  const handleDateToChange = useCallback((e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, dateTo: value }));
    onFilterChange({ dateTo: value });
  }, [onFilterChange]);

  const handleReset = useCallback(() => {
    setFilters({
      status: '',
      paymentMethod: '',
      paymentStatus: '',
      dateFrom: '',
      dateTo: '',
    });
    onReset();
  }, [onReset]);

  const activeFilterCount = Object.values(filters).filter((v) => v !== '').length;

  return (
    <div className="order-filter">
      <button
        className="filter-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 3H14M4 8H12M6 13H10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Bộ lọc
        {activeFilterCount > 0 && <span className="filter-badge">{activeFilterCount}</span>}
      </button>

      {isExpanded && (
        <div className="filter-panel">
          <div className="filter-group">
            <label htmlFor="status">Trạng thái</label>
            <select
              id="status"
              value={filters.status}
              onChange={handleStatusChange}
            >
              <option value="">Tất cả</option>
              <option value="pending">Khởi tạo</option>
              <option value="confirmed">Xác nhận</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Hủy</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="paymentMethod">Phương thức thanh toán</label>
            <select
              id="paymentMethod"
              value={filters.paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option value="">Tất cả</option>
              <option value="credit_card">Thẻ tín dụng</option>
              <option value="bank_transfer">Chuyển khoản</option>
              <option value="e_wallet">Ví điện tử</option>
              <option value="pay_on_site">Thanh toán tại quầy</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="paymentStatus">Trạng thái thanh toán</label>
            <select
              id="paymentStatus"
              value={filters.paymentStatus}
              onChange={handlePaymentStatusChange}
            >
              <option value="">Tất cả</option>
              <option value="unpaid">Chưa thanh toán</option>
              <option value="paid">Đã thanh toán</option>
              <option value="refunded">Hoàn tiền</option>
            </select>
          </div>

          <div className="filter-group date-range">
            <label htmlFor="dateFrom">Từ ngày</label>
            <input
              id="dateFrom"
              type="date"
              value={filters.dateFrom}
              onChange={handleDateFromChange}
            />
          </div>

          <div className="filter-group date-range">
            <label htmlFor="dateTo">Đến ngày</label>
            <input
              id="dateTo"
              type="date"
              value={filters.dateTo}
              onChange={handleDateToChange}
            />
          </div>

          <button className="reset-btn" onClick={handleReset}>
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
