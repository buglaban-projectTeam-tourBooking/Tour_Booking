/**
 * UserTable Component
 * Render table chứa danh sách người dùng
 */

import React from 'react';
import { UserRow } from './UserRow';
import '../../assets/user-table.css';

export const UserTable = ({ users, loading, error, onEdit, onDelete, onStatusChange }) => {
  if (loading) {
    return (
      <div className="user-table-loading">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-table-error">
        <p>❌ Lỗi: {error}</p>
        <p className="error-hint">Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="user-table-empty">
        <p>👥 Không có người dùng nào</p>
      </div>
    );
  }

  return (
    <div className="user-table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th></th>
            <th>Ảnh</th>
            <th>Thông tin</th>
            <th>Điện thoại</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Ngày tạo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user._id || user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
