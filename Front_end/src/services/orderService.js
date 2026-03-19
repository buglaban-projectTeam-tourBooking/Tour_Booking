/**
 * Order Service - Tất cả API calls cho Order Management
 * Không gọi API trực tiếp trong component, chỉ dùng service này
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Lấy danh sách đơn hàng với filter
 * @param {Object} params - Query parameters
 * @param {number} params.page - Trang (default: 1)
 * @param {number} params.limit - Giới hạn items/trang (default: 10)
 * @param {string} params.status - Lọc theo trạng thái
 * @param {string} params.paymentMethod - Lọc theo phương thức thanh toán
 * @param {string} params.paymentStatus - Lọc theo trạng thái thanh toán
 * @param {string} params.search - Tìm kiếm (mã đơn, email khách)
 * @param {string} params.dateFrom - Từ ngày
 * @param {string} params.dateTo - Đến ngày
 * @returns {Promise<Object>} Orders data
 */
export const getOrders = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([_, value]) => value !== null && value !== '')
    ).toString();

    const url = `${API_URL}/api/orders${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

/**
 * Lấy chi tiết một đơn hàng
 * @param {string} orderId - ID của đơn hàng
 * @returns {Promise<Object>} Order details
 */
export const getOrderById = async (orderId) => {
  try {
    const response = await fetch(`${API_URL}/api/orders/${orderId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

/**
 * Cập nhật trạng thái đơn hàng
 * @param {string} orderId - ID của đơn hàng
 * @param {Object} updateData - Dữ liệu cập nhật
 * @returns {Promise<Object>} Updated order
 */
export const updateOrder = async (orderId, updateData) => {
  try {
    const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
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
    console.error('Error updating order:', error);
    throw error;
  }
};

/**
 * Xóa đơn hàng
 * @param {string} orderId - ID của đơn hàng
 * @returns {Promise<Object>} Response message
 */
export const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};
