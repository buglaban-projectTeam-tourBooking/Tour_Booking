/**
 * UserRow Component
 * Render từng dòng trong table - hiển thị thông tin người dùng
 */

import React, { useState } from 'react';
import '../../assets/user-row.css';

export const UserRow = ({ user, onEdit, onDelete, onStatusChange }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      active: 'badge-active',
      inactive: 'badge-inactive',
      blocked: 'badge-blocked',
    };
    return statusMap[status] || 'badge-inactive';
  };

  const getStatusLabel = (status) => {
    const labelMap = {
      active: 'Hoạt động',
      inactive: 'Tạm dừng',
      blocked: 'Bị khóa',
    };
    return labelMap[status] || status;
  };

  const getRoleBadgeClass = (role) => {
    const roleMap = {
      admin: 'role-admin',
      moderator: 'role-moderator',
      user: 'role-user',
    };
    return roleMap[role] || 'role-user';
  };

  const getRoleLabel = (role) => {
    const labelMap = {
      admin: 'Admin',
      moderator: 'Moderator',
      user: 'Người dùng',
    };
    return labelMap[role] || role;
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('vi-VN');
  };

  return (
    <>
      <tr className="user-row">
        <td className="user-expand">
          <button
            className="expand-btn"
            onClick={() => setShowDetails(!showDetails)}
            title={showDetails ? 'Thu gọn' : 'Mở rộng'}
          >
            {showDetails ? '▼' : '▶'}
          </button>
        </td>

        <td className="user-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.fullName} className="avatar-img" />
          ) : (
            <div className="avatar-placeholder">
              {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
        </td>

        <td className="user-info">
          <div className="user-name">{user.fullName || '-'}</div>
          <div className="user-email">{user.email || '-'}</div>
        </td>

        <td className="user-phone">
          {user.phone || '-'}
        </td>

        <td className="user-address">
          {user.address || '-'}
        </td>

        <td className="user-role">
          <span className={`role-badge ${getRoleBadgeClass(user.role)}`}>
            {getRoleLabel(user.role)}
          </span>
        </td>

        <td className="user-status">
          <span className={`status-badge ${getStatusBadgeClass(user.status)}`}>
            {getStatusLabel(user.status)}
          </span>
        </td>

        <td className="user-date">
          {formatDate(user.createdAt)}
        </td>

        <td className="user-actions">
          <button
            className="action-btn edit-btn"
            onClick={() => onEdit(user)}
            title="Chỉnh sửa"
          >
            ✎
          </button>
          <button
            className="action-btn delete-btn"
            onClick={() => {
              if (confirm('Bạn chắc chắn muốn xóa người dùng này?')) {
                onDelete(user._id || user.id);
              }
            }}
            title="Xóa"
          >
            🗑️
          </button>
        </td>
      </tr>

      {showDetails && (
        <tr className="user-row-details">
          <td colSpan="9">
            <div className="details-content">
              <h4>Chi tiết người dùng</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">ID:</span>
                  <span className="detail-value">{user._id || user.id}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Họ tên:</span>
                  <span className="detail-value">{user.fullName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{user.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Điện thoại:</span>
                  <span className="detail-value">{user.phone || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Địa chỉ:</span>
                  <span className="detail-value">{user.address || '-'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Vai trò:</span>
                  <span className="detail-value">{getRoleLabel(user.role)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Trạng thái:</span>
                  <span className="detail-value">{getStatusLabel(user.status)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Ngày tạo:</span>
                  <span className="detail-value">{formatDate(user.createdAt)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Lần cập nhật cuối:</span>
                  <span className="detail-value">{formatDate(user.updatedAt)}</span>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
