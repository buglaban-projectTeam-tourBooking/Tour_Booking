import React from 'react';
import './TourCard.css';

const TourCard = ({ tour, onViewDetail }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '☆'}
      </>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="tour-card">
      <div className="tour-card-image">
        <img src={tour.image} alt={tour.title} />
        {tour.discount > 0 && (
          <div className="tour-discount">
            <span className="discount-badge">♥ GIẢM {tour.discount}%</span>
          </div>
        )}
      </div>

      <div className="tour-card-content">
        <h3 className="tour-title">{tour.title}</h3>
        
        <p className="tour-description">{tour.description}</p>

        <div className="tour-info">
          <div className="tour-meta">
            <span>Mã Tour: {tour.id}</span>
          </div>
          <div className="tour-meta">
            <span>Ngày Khởi Hành: {tour.startDate}</span>
          </div>
          <div className="tour-meta">
            <span>Thời Gian: {tour.duration}</span>
          </div>
        </div>

        <div className="tour-footer">
          <div className="tour-rating">
            <div className="stars">{renderStars(tour.rating)}</div>
            <span className="rating-value">({tour.reviews})</span>
            <span className="spots">Số chỗ còn: {tour.available}</span>
          </div>
        </div>

        <div className="tour-price">
          <span className="original-price">{formatPrice(tour.originalPrice)}</span>
          <span className="current-price">{formatPrice(tour.price)}</span>
          <span className="price-unit">/ khách</span>
        </div>

        <button 
          className="btn-view-detail" 
          onClick={() => onViewDetail && onViewDetail(tour.id)}
        >
          Xem Chi Tiết
        </button>
      </div>
    </div>
  );
};

export default TourCard;
