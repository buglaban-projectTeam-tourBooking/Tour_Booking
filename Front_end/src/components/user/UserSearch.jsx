/**
 * UserSearch Component
 * Xử lý search input cho tên, email người dùng
 */

import React, { useState, useCallback } from 'react';
import '../../assets/user-search.css';

export const UserSearch = ({ onSearch, placeholder = 'Tìm kiếm tên, email...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      onSearch(value);
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setSearchTerm('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className="user-search">
      <div className="search-input-wrapper">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 14L10.5 10.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {searchTerm && (
          <button className="clear-btn" onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
