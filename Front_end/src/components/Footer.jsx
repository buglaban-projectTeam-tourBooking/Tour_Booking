import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Column 1: About */}
          <div className="footer-column">
            <h4 className="footer-title">Về 28TRAVEL</h4>
            <div className="footer-content">
              <p className="footer-description">
                28TRAVEL là đơn vị chuyên cung cấp dịch vụ tour du lịch chất lượng cao với đội ngũ hướng dẫn viên chuyên nghiệp và giàu kinh nghiệm.
              </p>
              <div className="footer-badges">
                <span className="badge">✓ Uy Tín</span>
                <span className="badge">✓ Chất Lượng</span>
                <span className="badge">✓ Chuyên Nghiệp</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h4 className="footer-title">Liên Kết Nhanh</h4>
            <ul className="footer-links">
              <li><Link to="/">Trang Chủ</Link></li>
              <li><Link to="/tours/domestic">Tour Trong Nước</Link></li>
              <li><Link to="/tours/international">Tour Nước Ngoài</Link></li>
              <li><Link to="/about">Về Chúng Tôi</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">Câu Hỏi Thường Gặp</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-column">
            <h4 className="footer-title">Dịch Vụ</h4>
            <ul className="footer-links">
              <li><a href="#booking">Đặt Tour</a></li>
              <li><a href="#visa">Hỗ Trợ Visa</a></li>
              <li><a href="#insurance">Bảo Hiểm Du Lịch</a></li>
              <li><a href="#transfers">Dịch Vụ Xe</a></li>
              <li><a href="#accommodation">Lưu Trú</a></li>
              <li><a href="#customizable">Tour Theo Yêu Cầu</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-column">
            <h4 className="footer-title">Liên Hệ</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <p className="contact-label">Địa Chỉ</p>
                  <p className="contact-value">28 Luong Anh Nhat, Ho Chi Minh City</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <p className="contact-label">Điện Thoại</p>
                  <p className="contact-value"><a href="tel:02800001501">(028) 0001 501</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <div>
                  <p className="contact-label">Email</p>
                  <p className="contact-value"><a href="mailto:contact@28travel.com">contact@28travel.com</a></p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕐</span>
                <div>
                  <p className="contact-label">Giờ Làm Việc</p>
                  <p className="contact-value">8:00 - 18:00 (Thứ 2 - CN)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 5: Newsletter */}
          <div className="footer-column">
            <h4 className="footer-title">Nhận Bản Tin</h4>
            <p className="footer-subtitle">Đăng ký nhận ưu đãi và tin tức mới nhất từ 28TRAVEL</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Email của bạn"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">Đăng Ký</button>
            </form>
            <div className="social-links">
              <p className="social-title">Theo dõi chúng tôi</p>
              <div className="social-icons">
                <a href="#facebook" className="social-icon">f</a>
                <a href="#twitter" className="social-icon">𝕏</a>
                <a href="#instagram" className="social-icon">📷</a>
                <a href="#youtube" className="social-icon">▶</a>
                <a href="#tiktok" className="social-icon">♪</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {currentYear} 28TRAVEL. Tất cả quyền được bảo lưu.</p>
            </div>
            <div className="footer-policies">
              <a href="#privacy">Chính Sách Bảo Mật</a>
              <span className="divider">|</span>
              <a href="#terms">Điều Khoản Sử Dụng</a>
              <span className="divider">|</span>
              <a href="#cookies">Chính Sách Cookies</a>
              <span className="divider">|</span>
              <a href="#complaints">Khiếu Nại</a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;
