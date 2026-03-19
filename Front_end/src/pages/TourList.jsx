import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TourCard from './TourCard';
import './TourList.css';

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [destination, setDestination] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [startDate, setStartDate] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchTours(currentPage);
  }, [currentPage]);

  const fetchTours = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tours/domestic`, {
        params: {
          page,
          limit: 6,
        },
      });

      setTours(response.data.data);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (err) {
      setError('Lỗi khi tải danh sách tour.');
      console.error('Error fetching tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (tourId) => {
    // TODO: Navigate to tour detail page
    console.log('View tour detail:', tourId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search with filters
    setCurrentPage(1);
  };

  return (
    <div className="tour-list-page">
      {/* Header Section */}
      <header className="tour-list-header">
        <div className="header-content">
          <h1>Tour Trong Nước</h1>
          <p>Khám phá vẻ đẹp đặc sắc của đất nước với những tour du lịch hấp dẫn</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="tour-list-main">
        {/* Left Sidebar - Filters */}
        <aside className="tour-list-sidebar">
          <div className="filter-section">
            <h3>Bộ Lọc</h3>

            {/* Destination Filter */}
            <div className="filter-group">
              <label htmlFor="destination">Điểm Đi</label>
              <select
                id="destination"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">-- Chọn điểm đi --</option>
                <option value="ha-noi">Hà Nội</option>
                <option value="ho-chi-minh">Hồ Chí Minh</option>
                <option value="tim-toan-quoc">Tìm toàn quốc</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label>Khoảng Giá</label>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="price-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="price-slider"
                />
                <div className="price-inputs">
                  <input
                    type="number"
                    min="0"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    max="5000000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Start Date Filter */}
            <div className="filter-group">
              <label htmlFor="start-date">Ngày Khởi Hành</label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <button className="btn-filter-apply" onClick={handleSearch}>
              Tìm Tour
            </button>
          </div>
        </aside>

        {/* Right Content - Tour List */}
        <section className="tour-list-content">
          {/* Sort Options */}
          <div className="sort-bar">
            <div className="sort-info">
              <span>Sắp xếp:</span>
              <select defaultValue="new">
                <option value="new">Mới nhất</option>
                <option value="popular">Phổ biến</option>
                <option value="price-low">Giá thấp - cao</option>
                <option value="price-high">Giá cao - thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* Tours Grid */}
          {loading ? (
            <div className="loading">Đang tải tour...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : tours.length === 0 ? (
            <div className="no-results">Không tìm thấy tour nào.</div>
          ) : (
            <>
              <div className="tours-grid">
                {tours.map((tour) => (
                  <TourCard
                    key={tour.id}
                    tour={tour}
                    onViewDetail={handleViewDetail}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    « Trước
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`pagination-btn ${
                        currentPage === page ? 'active' : ''
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Sau »
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default TourList;
