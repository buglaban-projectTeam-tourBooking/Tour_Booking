import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/?search=${encodeURIComponent(searchInput)}`);
      setSearchInput('');
    }
  };

  return (
    <header className="header">
      {/* Top Info Bar */}
      <div className="header-top">
        <div className="header-top-container">
          <div className="header-contact-info">
            <span className="contact-item">
              <i className="phone-icon">📞</i> (028) 0001 501
            </span>
            <span className="contact-item">
              <i className="email-icon">✉️</i> contact@28travel.com
            </span>
            <span className="contact-item">
              <i className="location-icon">📍</i> 28 Luong Anh Nhat, Ho Chi Minh City
            </span>
          </div>
          <div className="header-social">
            <a href="#facebook" className="social-link">f</a>
            <a href="#twitter" className="social-link">𝕏</a>
            <a href="#instagram" className="social-link">📷</a>
            <a href="#youtube" className="social-link">▶</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">✈️</div>
            <div className="logo-text">
              <span className="logo-name">28TRAVEL</span>
              <span className="logo-subtitle">Tour & Travel</span>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="nav-menu">
            <Link to="/" className="nav-item active">Trang Chủ</Link>
            <Link to="/tours/domestic" className="nav-item">Tour Trong Nước</Link>
            <div className="nav-item dropdown">
              <span>Tour Nước Ngoài ▼</span>
              <div className="dropdown-menu">
                <a href="#asia" className="dropdown-item">Châu Á</a>
                <a href="#europe" className="dropdown-item">Châu Âu</a>
                <a href="#america" className="dropdown-item">Châu Mỹ</a>
              </div>
            </div>
            <Link to="/about" className="nav-item">Về Chúng Tôi</Link>
            <Link to="/contact" className="nav-item">Liên Hệ</Link>
          </nav>

          {/* Search and Cart */}
          <div className="header-actions">
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Tìm kiếm tour..."
                className="search-input"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="search-btn">🔍</button>
            </form>
            <button className="cart-btn">
              🛒 <span className="cart-badge">0</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
