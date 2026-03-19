# 📱 Tour Booking Frontend - Tài Liệu Hoàn Chỉnh

## 📋 Cấu Trúc Dự Án

```
Front_end/
├── src/
│   ├── components/           # Các component tái sử dụng
│   │   ├── Header.jsx        # Component header với navigation
│   │   ├── Header.css
│   │   ├── Footer.jsx        # Component footer đầy đủ
│   │   └── Footer.css
│   │
│   ├── pages/               # Các trang chính
│   │   ├── HomePage.jsx     # Trang chủ đầy đủ
│   │   ├── HomePage.css
│   │   ├── TourList.jsx     # Danh sách tour
│   │   ├── TourList.css
│   │   ├── TourCard.jsx     # Card component cho tour
│   │   ├── TourCard.css
│   │   ├── TourDetail.jsx   # Chi tiết tour
│   │   └── TourDetail.css
│   │
│   ├── App.jsx              # Component chính
│   ├── App.css              # Styling chính
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
│
└── package.json
```

## 🎨 Các Component Chính

### 1. **Header Component** (`components/Header.jsx`)
- **Features:**
  - Logo branding
  - Navigation menu với dropdown
  - Search functionality
  - Sticky positioning
  - Responsive design
  - Top contact bar

**Styling:**
- Gradient logo
- Smooth hover transitions
- Responsive dropdown menu
- Mobile-friendly navigation

### 2. **Footer Component** (`components/Footer.jsx`)
- **Features:**
  - 5 columns: About, Links, Services, Contact, Newsletter
  - Social media links
  - Back-to-top button (auto-show khi scroll)
  - Newsletter subscription form
  - Contact information
  - Copyright & policies

**Functionality:**
- Scroll event listener
- Smooth back-to-top animation
- Responsive grid layout

### 3. **HomePage Component** (`pages/HomePage.jsx`)
- **Sections:**
  1. **Hero Banner** - Search form tìm tour
  2. **Special Offers** - Tour ưu đãi với countdown
  3. **Special Destinations** - Tour carousel
  4. **Featured Tours** - Danh sách tour nổi bật
  5. **News Section** - Tin tức du lịch
  6. **Newsletter CTA** - Đăng ký nhận tin

**Features:**
- Fetch tour data từ API
- Dynamic pricing formatting (VND)
- Star rating display
- Image carousel
- Fully responsive

### 4. **TourList Component** (`pages/TourList.jsx`)
- Filter by destination, price range, date
- Pagination
- Tour cards with details
- Error handling

### 5. **TourCard Component** (`pages/TourCard.jsx`)
- Reusable card for displaying tour info
- Price formatting
- Star rating
- Discount badge

### 6. **TourDetail Component** (`pages/TourDetail.jsx`)
- Full tour information
- Booking functionality

## 🛣️ Routing Structure

```
/                       → HomePage
/tours/domestic          → TourList (Domestic tours)
/tours/international     → TourList (International tours)
/tour/:id               → TourDetail
```

## 🎨 Color Scheme

```
Primary: #667eea (Purple)
Secondary: #764ba2 (Dark Purple)
Accent: #6c5ce7 (Medium Purple)
Text: #2c3e50 (Dark Gray)
Gray: #95a5a6 (Light Gray)
Success: #27ae60 (Green)
Danger: #e74c3c (Red)
Warning: #f39c12 (Orange)
```

## 📦 Dependencies

```json
{
  "dependencies": {
    "axios": "^1.6.2",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.1.0"
  }
}
```

## 🚀 Chạy Ứng Dụng

### Development
```bash
cd Front_end
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

## 💡 Tính Năng Chính

### ✅ Header
- [x] Top contact bar
- [x] Logo & branding
- [x] Navigation menu
- [x] Dropdown submenu
- [x] Search form
- [x] Shopping cart icon
- [x] Sticky positioning
- [x] Responsive design

### ✅ Footer
- [x] Company information
- [x] Quick links
- [x] Services list
- [x] Contact details
- [x] Newsletter signup
- [x] Social media links
- [x] Back-to-top button
- [x] Copyright & policies
- [x] Responsive layout

### ✅ Home Page
- [x] Hero banner with search
- [x] Special offers section
- [x] Countdown timer
- [x] Tour carousel
- [x] Featured tours grid
- [x] News section
- [x] Newsletter CTA
- [x] Dynamic API integration

### ✅ Tour Management
- [x] Tour listing
- [x] Tour card display
- [x] Price formatting
- [x] Star ratings
- [x] Discount badges
- [x] Filtering & search
- [x] Pagination

## 📱 Responsive Design

Tất cả components đều hỗ trợ:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

**Breakpoints:**
- `@media (max-width: 768px)` - Tablet
- `@media (max-width: 576px)` - Mobile

## 🔧 Customization Tips

### Change Colors
Update trong `Header.css`, `Footer.css`, `HomePage.css`:
```css
background-color: #667eea; /* Primary color */
color: #2c3e50;            /* Text color */
```

### Adjust Layout
- Modify grid columns trong `HomePage.css`
- Update max-width trong `.container`
- Change padding/margins theo nhu cầu

### Add New Features
1. Create new component trong `components/` hoặc `pages/`
2. Import và sử dụng trong `App.jsx`
3. Add route nếu là page mới
4. Create corresponding CSS file

## 🌐 API Integration

Base URL: `http://localhost:5000/api`

**Endpoints được sử dụng:**
```
GET /api/tours/domestic - Danh sách tour trong nước
POST /api/tours/search - Tìm kiếm tour
GET /api/tours/:id - Chi tiết tour
```

## 📝 Notes

- Component sử dụng React Hooks (useState, useEffect)
- Tất cả styling dùng CSS (không dùng CSS-in-JS)
- Images placeholder được sử dụng - replace với real URLs
- Responsive design mobile-first approach
- Accessibility features included (aria-labels, semantic HTML)

## 🎯 Next Steps

1. Connect to backend API hoàn toàn
2. Implement authentication
3. Add shopping cart functionality
4. Create booking page
5. Add payment gateway integration
6. Implement user dashboard
7. Add admin panel
8. Implement real-time notifications

---

**Created:** March 20, 2026
**Status:** ✅ Frontend Complete
**Version:** 1.0.0
