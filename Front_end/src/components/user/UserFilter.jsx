/**
 * UserFilter Component
 * Xử lý filter UI: role, status, date range
 */

import React, { useState, useCallback } from 'react';
import '../../assets/user-filter.css';

export const UserFilter = ({ onFilterChange, onReset }) => {
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleRoleChange = useCallback((e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, role: value }));
    onFilterChange({ role: value });
  }, [onFilterChange]);

  const handleStatusChange = useCallback((e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, status: value }));
    onFilterChange({ status: value });
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
      role: '',
      status: '',
      dateFrom: '',
      dateTo: '',
    });
    onReset();
  }, [onReset]);

  const activeFilterCount = Object.values(filters).filter((v) => v !== '').length;

  return (
    <div className="user-filter">
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
            <label htmlFor="role">Vai trò</label>
            <select
              id="role"
              value={filters.role}
              onChange={handleRoleChange}
            >
              <option value="">Tất cả</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">Người dùng</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="status">Trạng thái</label>
            <select
              id="status"
              value={filters.status}
              onChange={handleStatusChange}
            >
              <option value="">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm dừng</option>
              <option value="blocked">Bị khóa</option>
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
