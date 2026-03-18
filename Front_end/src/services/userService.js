/**
 * User Service - Tất cả API calls cho User Management
 * Không gọi API trực tiếp trong component, chỉ dùng service này
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Lấy danh sách người dùng với filter
 * @param {Object} params - Query parameters
 * @param {number} params.page - Trang (default: 1)
 * @param {number} params.limit - Giới hạn items/trang (default: 10)
 * @param {string} params.role - Lọc theo vai trò (admin, user, moderator)
 * @param {string} params.status - Lọc theo trạng thái (active, inactive, blocked)
 * @param {string} params.search - Tìm kiếm (tên, email)
 * @param {string} params.dateFrom - Từ ngày
 * @param {string} params.dateTo - Đến ngày
 * @returns {Promise<Object>} Users data
 */
export const getUsers = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([_, value]) => value !== null && value !== '')
    ).toString();

    const url = `${API_URL}/api/users${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Lấy chi tiết một người dùng
 * @param {string} userId - ID của người dùng
 * @returns {Promise<Object>} User details
 */
export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Cập nhật thông tin người dùng
 * @param {string} userId - ID của người dùng
 * @param {Object} updateData - Dữ liệu cập nhật
 * @returns {Promise<Object>} Updated user
 */
export const updateUser = async (userId, updateData) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Xóa người dùng
 * @param {string} userId - ID của người dùng
 * @returns {Promise<Object>} Response message
 */
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

/**
 * Thay đổi trạng thái người dùng
 * @param {string} userId - ID của người dùng
 * @param {string} status - Trạng thái mới (active, inactive, blocked)
 * @returns {Promise<Object>} Updated user
 */
export const updateUserStatus = async (userId, status) => {
  return updateUser(userId, { status });
};

/**
 * Cấp lại mật khẩu người dùng
 * @param {string} userId - ID của người dùng
 * @returns {Promise<Object>} Response message
 */
export const resetUserPassword = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}/reset-password`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
