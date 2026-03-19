/**
 * UserManagement Page
 * Trang chính Quản lý người dùng
 * Import các components và quản lý logic chính
 */

import React, { useCallback } from 'react';
import { useUsers } from '../../../hooks/useUsers';
import { deleteUser } from '../../../services/userService';
import { UserSearch } from '../../../components/user/UserSearch';
import { UserFilter } from '../../../components/user/UserFilter';
import { UserTable } from '../../../components/user/UserTable';
import { UserPagination } from '../../../components/user/UserPagination';
import '../../../assets/user-management.css';

export const UserManagement = () => {
  const {
    users,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    updatePagination,
    resetFilters,
  } = useUsers();

  /**
   * Xử lý tìm kiếm
   */
  const handleSearch = useCallback(
    (searchTerm) => {
      updateFilters({ search: searchTerm });
    },
    [updateFilters]
  );

  /**
   * Xử lý filter thay đổi
   */
  const handleFilterChange = useCallback(
    (newFilters) => {
      updateFilters(newFilters);
    },
    [updateFilters]
  );

  /**
   * Xử lý reset filter
   */
  const handleResetFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  /**
   * Xử lý chỉnh sửa người dùng
   */
  const handleEdit = useCallback((user) => {
    // TODO: Implementation for edit user
    // Có thể mở modal hoặc navigate đến edit page
    console.log('Edit user:', user);
    alert(`Chỉnh sửa người dùng: ${user.fullName}\n(Chức năng đang phát triển)`);
  }, []);

  /**
   * Xử lý xóa người dùng
   */
  const handleDelete = useCallback(
    async (userId) => {
      try {
        await deleteUser(userId);
        alert('Xóa người dùng thành công');
        // Reload lại danh sách
        updatePagination(pagination.page, pagination.limit);
      } catch (err) {
        alert(`Lỗi khi xóa: ${err.message}`);
      }
    },
    [pagination.page, pagination.limit, updatePagination]
  );

  /**
   * Xử lý thay đổi trang
   */
  const handlePageChange = useCallback(
    (page) => {
      updatePagination(page, pagination.limit);
    },
    [pagination.limit, updatePagination]
  );

  /**
   * Xử lý thay đổi trạng thái
   */
  const handleStatusChange = useCallback((userId, status) => {
    // TODO: Implementation for status change
    console.log(`Change user ${userId} status to ${status}`);
  }, []);

  const activeFilterCount = Object.values(filters).filter((v) => v !== '').length;

  return (
    <div className="user-management">
      {/* Header */}
      <div className="user-management-header">
        <h1>👥 Quản Lý Người Dùng</h1>
        <p className="header-subtitle">
          Quản lý thông tin và trạng thái tất cả người dùng trong hệ thống
        </p>
      </div>

      {/* Toolbar */}
      <div className="user-management-toolbar">
        <UserSearch onSearch={handleSearch} />
        <UserFilter onFilterChange={handleFilterChange} onReset={handleResetFilters} />

        {activeFilterCount > 0 && (
          <div className="filter-status">
            Áp dụng {activeFilterCount} bộ lọc
          </div>
        )}
      </div>

      {/* Table */}
      <div className="user-management-content">
        <UserTable
          users={users}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </div>

      {/* Pagination */}
      <div className="user-management-footer">
        <UserPagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};
