import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchFeaturedTours();
  }, []);

  const fetchFeaturedTours = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tours/domestic`, {
        params: {
          page: 1,
          limit: 8,
        },
      });
      setTours(response.data.data || []);
      setFeatured(response.data.data?.slice(0, 4) || []);
    } catch (err) {
      console.error('Error fetching tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const destination = e.target.elements.destination.value;
    const startDate = e.target.elements.startDate.value;
    
    if (destination) {
      navigate(`/tours/domestic?destination=${encodeURIComponent(destination)}`);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price);
  };

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

  return (
    <main className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">Du Lịch Châu Á - Khám Phá Mỹ, Úc, Âu Á Nơi Đầu Hân Muôn</h1>
          <p className="hero-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          </p>

          {/* Search Form */}
          <form className="search-form-hero" onSubmit={handleSearch}>
            <div className="search-field">
              <label htmlFor="destination">Điểm Đi</label>
              <input
                id="destination"
                type="text"
                placeholder="Chọn điểm đi"
                name="destination"
              />
            </div>
            <div className="search-field">
              <label htmlFor="startDate">Ngày Khởi Hành</label>
              <input
                id="startDate"
                type="date"
                name="startDate"
              />
            </div>
            <button type="submit" className="btn-search-hero">Tìm Kiếm</button>
          </form>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="special-offers">
        <div className="container">
          <h2 className="section-title">Ưu Đãi 2024</h2>
          <p className="section-subtitle">Tour Giá Chót</p>

          <div className="offers-grid">
            {/* Offer 1 */}
            <div className="offer-card offer-card-primary">
              <div className="offer-icon">🎊</div>
              <div className="offer-content">
                <h3>Ưu Đãi 2024</h3>
                <p>TOUR GIÁ CHÓT</p>
                <div className="countdown">
                  <div className="countdown-item">
                    <span className="countdown-value">12</span>
                    <span className="countdown-label">Ngày</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-value">20</span>
                    <span className="countdown-label">Giờ</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-value">30</span>
                    <span className="countdown-label">Phút</span>
                  </div>
                </div>
                <p className="offer-price">Giá từ <strong>990.000đ</strong></p>
              </div>
            </div>

            {/* Offer 2 */}
            <div className="offer-card offer-card-secondary">
              <div className="offer-icon">🎁</div>
              <div className="offer-content">
                <h3>Siêu Sale 50%</h3>
                <p>CÁC TOUR TRONG NƯỚC</p>
                <div className="countdown">
                  <div className="countdown-item">
                    <span className="countdown-value">08</span>
                    <span className="countdown-label">Ngày</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-value">14</span>
                    <span className="countdown-label">Giờ</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-value">45</span>
                    <span className="countdown-label">Phút</span>
                  </div>
                </div>
                <p className="offer-price">Giá từ <strong>1,250.000đ</strong></p>
              </div>
            </div>

            {/* Offer 3 */}
            <div className="offer-card offer-card-tertiary">
              <div className="offer-icon">✈️</div>
              <div className="offer-content">
                <h3>Tour Nước Ngoài</h3>
                <p>CHUYÊN BIỆT XUẤT NGOẠI</p>
                <div className="countdown">
                  <div className="countdown-item">
                    <span className="countdown-value">05</span>
                    <span className="countdown-label">Ngày</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-value">09</span>
                    <span className="countdown-label">Giờ</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-value">20</span>
                    <span className="countdown-label">Phút</span>
                  </div>
                </div>
                <p className="offer-price">Giá từ <strong>4,500.000đ</strong></p>
              </div>
            </div>

            {/* Tour Cards in Special Offers */}
            {featured.slice(0, 3).map((tour) => (
              <div key={tour.id} className="offer-tour-card">
                <div className="offer-tour-image">
                  <img src={tour.image} alt={tour.title} />
                  {tour.discount > 0 && (
                    <span className="discount-badge">♥ GIẢM {tour.discount}%</span>
                  )}
                </div>
                <div className="offer-tour-info">
                  <h4>{tour.title}</h4>
                  <p className="tour-location">{tour.destination}</p>
                  <p className="tour-duration">
                    <span className="duration-icon">📅</span>
                    Thời Gian: {tour.duration}
                  </p>
                  <p className="tour-spots">
                    <span className="spots-icon">👥</span>
                    Số chỗ còn: {tour.available}
                  </p>
                  <div className="offer-tour-rating">
                    <span className="stars">{renderStars(tour.rating)}</span>
                    <span className="reviews">({tour.reviews})</span>
                  </div>
                  <div className="offer-tour-price">
                    <span className="price-original">{formatPrice(tour.originalPrice)}</span>
                    <span className="price-current">{formatPrice(tour.price)}</span>
                  </div>
                  <Link to={`/tour/${tour.id}`} className="btn-view-offer">
                    Xem Chi Tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Tour Destinations */}
      <section className="special-destinations">
        <div className="container">
          <h2 className="section-title">Khuyên Mại Bùng Nổ - Dành Tặn Nông Bắc</h2>
          
          <div className="destinations-carousel">
            <div className="destination-card">
              <img src="https://via.placeholder.com/400x300/667eea/ffffff?text=Gô+Nam+Du" alt="Tour Gô Nam Du" />
              <div className="destination-info">
                <h3>TOUR GÔ NAM DU</h3>
                <p>1,250.000đ</p>
              </div>
            </div>
            <div className="destination-card featured">
              <img src="https://via.placeholder.com/400x300/764ba2/ffffff?text=Nước+Ngoài" alt="International Tour" />
              <div className="destination-info">
                <h3>Tour Nước Ngoài</h3>
                <p>Khám Phá Thế Giới</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://via.placeholder.com/400x300/667eea/ffffff?text=Thành+Phố" alt="Tour Thành Phố" />
              <div className="destination-info">
                <h3>Hành Trình Thành Phố</h3>
                <p>Tận Hưởng Tây Âu</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://via.placeholder.com/400x300/e74c3c/ffffff?text=Phú+Quốc" alt="Tour Phú Quốc" />
              <div className="destination-info">
                <h3>TOUR PHÚ QUỐC</h3>
                <p>2,100.000đ</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://via.placeholder.com/400x300/3498db/ffffff?text=Đà+Nẵng" alt="Tour Đà Nẵng" />
              <div className="destination-info">
                <h3>COMBO ĐÀ NẴNG</h3>
                <p>1,890.000đ</p>
              </div>
            </div>
            <div className="destination-card">
              <img src="https://via.placeholder.com/400x300/2ecc71/ffffff?text=Sa+Pa" alt="Tour Sa Pa" />
              <div className="destination-info">
                <h3>TOUR SA PA</h3>
                <p>1,650.000đ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="flash-sale-section">
        <div className="container">
          <h2 className="section-title">💥 Flash Sale - Hôm Nay</h2>
          <p className="section-subtitle">Ưu Đãi Giới Hạn - Chỉ Hôm Nay Thôi</p>

          <div className="flash-sale-grid">
            <div className="flash-sale-card">
              <div className="flash-sale-image">
                <img src="https://via.placeholder.com/400x250/f39c12/ffffff?text=Vịnh+Hạ+Long" alt="Vịnh Hạ Long" />
                <span className="flash-badge">🔥 -40%</span>
              </div>
              <div className="flash-sale-info">
                <h4>Vịnh Hạ Long 2N1Đ</h4>
                <p className="flash-original">Giá gốc: 3,500.000đ</p>
                <p className="flash-price">Chỉ còn: <strong>2,100.000đ</strong></p>
                <button className="btn-flash-sale">Mua Ngay</button>
              </div>
            </div>

            <div className="flash-sale-card">
              <div className="flash-sale-image">
                <img src="https://via.placeholder.com/400x250/9b59b6/ffffff?text=Sapa+Fansipan" alt="Sapa" />
                <span className="flash-badge">🔥 -35%</span>
              </div>
              <div className="flash-sale-info">
                <h4>Sapa - Fansipan 3N2Đ</h4>
                <p className="flash-original">Giá gốc: 2,800.000đ</p>
                <p className="flash-price">Chỉ còn: <strong>1,820.000đ</strong></p>
                <button className="btn-flash-sale">Mua Ngay</button>
              </div>
            </div>

            <div className="flash-sale-card">
              <div className="flash-sale-image">
                <img src="https://via.placeholder.com/400x250/1abc9c/ffffff?text=Nha+Trang" alt="Nha Trang" />
                <span className="flash-badge">🔥 -38%</span>
              </div>
              <div className="flash-sale-info">
                <h4>Nha Trang Biển 3N2Đ</h4>
                <p className="flash-original">Giá gốc: 2,200.000đ</p>
                <p className="flash-price">Chỉ còn: <strong>1,364.000đ</strong></p>
                <button className="btn-flash-sale">Mua Ngay</button>
              </div>
            </div>

            <div className="flash-sale-card">
              <div className="flash-sale-image">
                <img src="https://via.placeholder.com/400x250/e67e22/ffffff?text=Hôi+An" alt="Hội An" />
                <span className="flash-badge">🔥 -32%</span>
              </div>
              <div className="flash-sale-info">
                <h4>Hội An Cổ Kính 2N1Đ</h4>
                <p className="flash-original">Giá gốc: 1,950.000đ</p>
                <p className="flash-price">Chỉ còn: <strong>1,326.000đ</strong></p>
                <button className="btn-flash-sale">Mua Ngay</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Deals Section */}
      <section className="hot-deals-section">
        <div className="container">
          <h2 className="section-title">🔥 Deal Sốc Hôm Nay</h2>
          <p className="section-subtitle">Những Gói Tours Combo Siêu Rẻ</p>

          <div className="hot-deals-grid">
            <div className="hot-deal-card">
              <div className="deal-tag">COMBO</div>
              <h4>Đà Lạt + Đà Nẵng</h4>
              <p className="deal-nights">5 Ngày 4 Đêm</p>
              <p className="deal-original">4,500.000đ</p>
              <p className="deal-price">2,950.000đ</p>
              <p className="deal-save">Tiết kiệm: 1,550.000đ</p>
              <button className="btn-hot-deal">Chi Tiết</button>
            </div>

            <div className="hot-deal-card">
              <div className="deal-tag">COMBO</div>
              <h4>Cần Thơ + Miền Tây</h4>
              <p className="deal-nights">4 Ngày 3 Đêm</p>
              <p className="deal-original">2,800.000đ</p>
              <p className="deal-price">1,680.000đ</p>
              <p className="deal-save">Tiết kiệm: 1,120.000đ</p>
              <button className="btn-hot-deal">Chi Tiết</button>
            </div>

            <div className="hot-deal-card">
              <div className="deal-tag">COMBO</div>
              <h4>Sapa + Hà Nội</h4>
              <p className="deal-nights">3 Ngày 2 Đêm</p>
              <p className="deal-original">2,200.000đ</p>
              <p className="deal-price">1,430.000đ</p>
              <p className="deal-save">Tiết kiệm: 770.000đ</p>
              <button className="btn-hot-deal">Chi Tiết</button>
            </div>

            <div className="hot-deal-card">
              <div className="deal-tag">COMBO</div>
              <h4>Phú Quốc + Hà Tiên</h4>
              <p className="deal-nights">4 Ngày 3 Đêm</p>
              <p className="deal-original">3,600.000đ</p>
              <p className="deal-price">2,160.000đ</p>
              <p className="deal-save">Tiết kiệm: 1,440.000đ</p>
              <button className="btn-hot-deal">Chi Tiết</button>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-tours">
        <div className="container">
          <h2 className="section-title">Tour Trong Nước</h2>

          {loading ? (
            <div className="loading">Đang tải dữ liệu...</div>
          ) : (
            <div className="tours-grid">
              {tours.map((tour) => (
                <div key={tour.id} className="featured-tour-card">
                  <div className="featured-tour-image">
                    <img src={tour.image} alt={tour.title} />
                    {tour.discount > 0 && (
                      <span className="discount-badge-featured">♥ GIẢM {tour.discount}%</span>
                    )}
                  </div>
                  <div className="featured-tour-content">
                    <h3>{tour.title}</h3>
                    <p className="featured-tour-location">📍 {tour.destination}</p>
                    <div className="featured-tour-details">
                      <p>
                        <span className="detail-icon">📅</span>
                        {tour.duration}
                      </p>
                      <p>
                        <span className="detail-icon">⭐</span>
                        {renderStars(tour.rating)} ({tour.reviews} đánh giá)
                      </p>
                    </div>
                    <div className="featured-tour-footer">
                      <div className="featured-tour-price">
                        <del>{formatPrice(tour.originalPrice)}</del>
                        <strong>{formatPrice(tour.price)}</strong>
                      </div>
                      <Link to={`/tour/${tour.id}`} className="btn-view-featured">
                        Chi Tiết →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="view-all-section">
            <Link to="/tours/domestic" className="btn-view-all">
              Xem Tất Cả Tour Trong Nước
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="container">
          <h2 className="section-title">Tin Tức Mới</h2>

          <div className="news-grid">
            <article className="news-card">
              <div className="news-image">
                <img src="/api/placeholder/500/300" alt="News" />
              </div>
              <div className="news-content">
                <h3>Top 5 điểm du lịch độc lạ tại Singapore</h3>
                <p>Đây là 5 địa điểm du lịch không nên bỏ lỡ khi tới Singapore...</p>
                <a href="#" className="read-more">Đọc Thêm →</a>
              </div>
            </article>

            <article className="news-card">
              <div className="news-image">
                <img src="/api/placeholder/500/300" alt="News" />
              </div>
              <div className="news-content">
                <h3>Những lưu ý khi đi du lịch nước ngoài</h3>
                <p>Chuẩn bị tốt cho chuyến công tác hoặc du lịch nước ngoài lần đầu...</p>
                <a href="#" className="read-more">Đọc Thêm →</a>
              </div>
            </article>

            <article className="news-card">
              <div className="news-image">
                <img src="/api/placeholder/500/300" alt="News" />
              </div>
              <div className="news-content">
                <h3>Cẩm nang du lịch Paris - Thủ đô của tình yêu</h3>
                <p>Paris được biết đến là thủ đô của tình yêu, được nhiều cặp đôi yêu...</p>
                <a href="#" className="read-more">Đọc Thêm →</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="newsletter-cta">
        <div className="container">
          <h2>Đăng Ký Nhận Ưu Đãi Từ 28TRAVEL</h2>
          <form className="newsletter-form-home">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              required
            />
            <button type="submit" className="btn-subscribe">Đăng Ký Ngay</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
