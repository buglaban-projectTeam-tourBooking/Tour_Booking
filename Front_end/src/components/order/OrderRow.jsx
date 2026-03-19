/**
 * OrderRow Component
 * Render từng dòng trong table - hiển thị thông tin đơn hàng
 */

import React, { useState } from 'react';
import '../../assets/order-row.css';

export const OrderRow = ({ order, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      pending: 'badge-pending',
      confirmed: 'badge-confirmed',
      completed: 'badge-completed',
      cancelled: 'badge-cancelled',
    };
    return statusMap[status] || 'badge-pending';
  };

  const getStatusLabel = (status) => {
    const labelMap = {
      pending: 'Khởi tạo',
      confirmed: 'Xác nhận',
      completed: 'Hoàn thành',
      cancelled: 'Hủy',
    };
    return labelMap[status] || status;
  };

  const getPaymentStatusBadgeClass = (status) => {
    return status === 'paid' ? 'badge-paid' : 'badge-unpaid';
  };

  const getPaymentStatusLabel = (status) => {
    const labelMap = {
      unpaid: 'Chưa thanh toán',
      paid: 'Đã thanh toán',
      refunded: 'Hoàn tiền',
    };
    return labelMap[status] || status;
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('vi-VN');
  };

  const formatCurrency = (amount) => {
    if (!amount) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <>
      <tr className="order-row">
        <td className="order-id">
          <button
            className="expand-btn"
            onClick={() => setShowDetails(!showDetails)}
            title={showDetails ? 'Thu gọn' : 'Mở rộng'}
          >
            {showDetails ? '▼' : '▶'}
          </button>
          {order._id || order.id}
        </td>

        <td className="customer-info">
          <div className="customer-name">{order.customerName || '-'}</div>
          <div className="customer-email">{order.customerEmail || '-'}</div>
          <div className="customer-phone">{order.customerPhone || '-'}</div>
        </td>

        <td className="tour-info">
          <div className="tours-preview">
            {order.tours && order.tours.length > 0 ? (
              <>
                {order.tours.slice(0, 2).map((tour, idx) => (
                  <div key={idx} className="tour-item">
                    {tour.image && (
                      <img src={tour.image} alt={tour.name} className="tour-thumbnail" />
                    )}
                    <div>
                      <span className="tour-name">{tour.name || 'Tour'}</span>
                      <span className="tour-price">{formatCurrency(tour.price)}</span>
                    </div>
                  </div>
                ))}
                {order.tours.length > 2 && (
                  <div className="tour-more">+{order.tours.length - 2} tour khác</div>
                )}
              </>
            ) : (
              <span>-</span>
            )}
          </div>
        </td>

        <td className="payment-info">
          <div className="payment-method">{order.paymentMethod || '-'}</div>
          <div className={`payment-status-badge ${getPaymentStatusBadgeClass(order.paymentStatus)}`}>
            {getPaymentStatusLabel(order.paymentStatus)}
          </div>
        </td>

        <td className="order-status">
          <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
        </td>

        <td className="order-date">
          {formatDate(order.createdAt)}
        </td>

        <td className="order-amount">
          {formatCurrency(order.totalAmount)}
        </td>

        <td className="order-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(order)}
            title="Chỉnh sửa"
          >
            ✎
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => {
              if (confirm('Bạn chắc chắn muốn xóa đơn hàng này?')) {
                onDelete(order._id || order.id);
              }
            }}
            title="Xóa"
          >
            🗑️
          </button>
        </td>
      </tr>

      {showDetails && (
        <tr className="order-row-details">
          <td colSpan="8">
            <div className="details-content">
              <h4>Chi tiết đơn hàng</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Mã đơn:</span>
                  <span className="detail-value">{order._id || order.id}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Khách hàng:</span>
                  <span className="detail-value">{order.customerName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{order.customerEmail}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Điện thoại:</span>
                  <span className="detail-value">{order.customerPhone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tổng tiền:</span>
                  <span className="detail-value">{formatCurrency(order.totalAmount)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Ngày đặt:</span>
                  <span className="detail-value">{formatDate(order.createdAt)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Ghi chú:</span>
                  <span className="detail-value">{order.notes || '-'}</span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
