/**
 * Custom Hook - useOrders
 * Quản lý state cho orders, loading, error, filters, pagination
 * Gọi orderService để fetch dữ liệu
 */

import { useState, useEffect, useCallback } from 'react';
import { getOrders } from '../services/orderService';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    paymentMethod: '',
    paymentStatus: '',
    dateFrom: '',
    dateTo: '',
  });

  /**
   * Fetch orders từ API
   */
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };

      const response = await getOrders(params);

      setOrders(response.data || []);
      setPagination((prev) => ({
        ...prev,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      }));
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  /**
   * Gọi fetch khi filters hay pagination thay đổi
   */
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  /**
   * Cập nhật filters
   */
  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    // Reset về trang 1 khi filter thay đổi
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, []);

  /**
   * Cập nhật pagination
   */
  const updatePagination = useCallback((page, limit) => {
    setPagination((prev) => ({
      ...prev,
      page,
      limit,
    }));
  }, []);

  /**
   * Reset filters
   */
  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      status: '',
      paymentMethod: '',
      paymentStatus: '',
      dateFrom: '',
      dateTo: '',
    });
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, []);

  return {
    // State
    orders,
    loading,
    error,
    pagination,
    filters,
    // Actions
    fetchOrders,
    updateFilters,
    updatePagination,
    resetFilters,
  };
};
