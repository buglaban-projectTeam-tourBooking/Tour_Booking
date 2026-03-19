/**
 * Custom Hook - useUsers
 * Quản lý state cho users, loading, error, filters, pagination
 * Gọi userService để fetch dữ liệu
 */

import { useState, useEffect, useCallback } from 'react';
import { getUsers } from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
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
    role: '',
    status: '',
    dateFrom: '',
    dateTo: '',
  });

  /**
   * Fetch users từ API
   */
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };

      const response = await getUsers(params);

      setUsers(response.data || []);
      setPagination((prev) => ({
        ...prev,
        total: response.total || 0,
        totalPages: response.totalPages || 0,
      }));
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters]);

  /**
   * Gọi fetch khi filters hay pagination thay đổi
   */
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
      role: '',
      status: '',
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
    users,
    loading,
    error,
    pagination,
    filters,
    // Actions
    fetchUsers,
    updateFilters,
    updatePagination,
    resetFilters,
  };
};
