/**
 * OrderTable Component
 * Render table chứa danh sách đơn hàng
 */

import React from 'react';
import { OrderRow } from './OrderRow';
import '../../assets/order-table.css';

export const OrderTable = ({ orders, loading, error, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="order-table-loading">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-table-error">
        <p>❌ Lỗi: {error}</p>
        <p className="error-hint">Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="order-table-empty">
        <p>📭 Không có đơn hàng nào</p>
      </div>
    );
  }

  return (
    <div className="order-table-wrapper">
      <table className="order-table">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Tour</th>
            <th>Thanh toán</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
            <th>Số tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order._id || order.id}
              order={order}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
