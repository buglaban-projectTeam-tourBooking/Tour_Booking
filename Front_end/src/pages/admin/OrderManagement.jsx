/**
 * OrderManagement Page
 * Trang chính Quản lý đơn hàng
 * Import các components và quản lý logic chính
 */

import React, { useCallback } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { deleteOrder } from '../../services/orderService';
import { OrderSearch } from '../../components/order/OrderSearch';
import { OrderFilter } from '../../components/order/OrderFilter';
import { OrderTable } from '../../components/order/OrderTable';
import { OrderPagination } from '../../components/order/OrderPagination';
import '../../assets/order-management.css';

export const OrderManagement = () => {
  const {
    orders,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    updatePagination,
    resetFilters,
  } = useOrders();

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
   * Xử lý chỉnh sửa đơn
   */
  const handleEdit = useCallback((order) => {
    // TODO: Implementation for edit order
    // Có thể mở modal hoặc navigate đến edit page
    console.log('Edit order:', order);
    alert(`Chỉnh sửa đơn: ${order._id || order.id}\n(Chức năng đang phát triển)`);
  }, []);

  /**
   * Xử lý xóa đơn
   */
  const handleDelete = useCallback(
    async (orderId) => {
      try {
        await deleteOrder(orderId);
        alert('Xóa đơn hàng thành công');
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

  const activeFilterCount = Object.values(filters).filter((v) => v !== '').length;

  return (
    <div className="order-management">
      {/* Header */}
      <div className="order-management-header">
        <h1>📋 Quản Lý Đơn Hàng</h1>
        <p className="header-subtitle">
          Quản lý, theo dõi và cập nhật tất cả đơn hàng của bạn
        </p>
      </div>

      {/* Toolbar */}
      <div className="order-management-toolbar">
        <OrderSearch onSearch={handleSearch} />
        <OrderFilter onFilterChange={handleFilterChange} onReset={handleResetFilters} />

        {activeFilterCount > 0 && (
          <div className="filter-status">
            Áp dụng {activeFilterCount} bộ lọc
          </div>
        )}
      </div>

      {/* Table */}
      <div className="order-management-content">
        <OrderTable
          orders={orders}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Pagination */}
      <div className="order-management-footer">
        <OrderPagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};
