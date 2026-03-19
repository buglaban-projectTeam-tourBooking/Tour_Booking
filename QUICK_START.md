# 🚀 Quick Start Guide - Frontend Setup

## ✅ Hoàn Thành Công Việc

### 📁 Các File Được Tạo

#### Components (Tái sử dụng):
- ✅ `src/components/Header.jsx` - Header đầy đủ với navigation
- ✅ `src/components/Header.css` - Styling header
- ✅ `src/components/Footer.jsx` - Footer hoàn chỉnh
- ✅ `src/components/Footer.css` - Styling footer

#### Pages:
- ✅ `src/pages/HomePage.jsx` - Trang chủ mới
- ✅ `src/pages/HomePage.css` - Styling trang chủ

#### Global:
- ✅ `src/App.jsx` - Updated with Header & Footer
- ✅ `src/App.css` - Reset & global layout
- ✅ `src/index.css` - Modern CSS reset

#### Documentation:
- ✅ `FRONTEND_GUIDE.md` - Tài liệu đầy đủ

---

## 🎯 Tính Năng Chính

### 1️⃣ **HEADER** - Thanh Điều Hướng
```
├─ Top Bar: Liên hệ, giờ làm việc, mạng xã hội
├─ Main Bar:
│  ├─ Logo 28TRAVEL
│  ├─ Navigation Menu (Trang Chủ, Tour Nước, Tour Nước Ngoài, v.v.)
│  ├─ Search Bar
│  └─ Shopping Cart Button
└─ Sticky positioning khi scroll
```

**Features:**
- 📌 Sticky navigation
- 🔍 Search form
- 🛒 Cart icon với badge
- 📱 Fully responsive
- ✨ Smooth animations

### 2️⃣ **HOME PAGE** - Trang Chủ Đầy Đủ
```
1. Hero Banner
   ├─ Large title & subtitle
   └─ Search form (Điểm đi, Ngày khởi hành, Tìm kiếm)

2. Special Offers Section
   ├─ Main discount card với countdown
   └─ 3 featured tour cards

3. Special Destinations
   ├─ Tour carousel 
   └─ Responsive grid

4. Featured Tours Grid
   ├─ 8 tour cards với info
   ├─ Price, rating, discount
   └─ Xem chi tiết button

5. News Section
   ├─ 3 news articles
   ├─ Image, title, description
   └─ Read more link

6. Newsletter CTA
   ├─ Email subscription form
   └─ Subscribe button
```

**Features:**
- 🎨 Modern gradient design
- 📊 Dynamic data từ API
- 💰 Price formatting (VND)
- ⭐ Star ratings
- 🎁 Discount badges
- 📱 Mobile-first responsive
- ✨ Smooth animations

### 3️⃣ **FOOTER** - Chân Trang
```
1. Main Footer (5 columns):
   ├─ About 28TRAVEL
   ├─ Quick Links
   ├─ Services
   ├─ Contact Info
   └─ Newsletter Signup

2. Footer Bottom:
   ├─ Copyright
   └─ Policies & Terms

3. Back-to-Top Button:
   └─ Auto-show khi scroll down
```

**Features:**
- 📐 5-column grid layout
- 📧 Newsletter form
- 🔗 Quick navigation links
- 📞 Contact information
- 🔝 Auto back-to-top button
- 🌐 Social media links
- 📱 Responsive on all devices

---

## 🎨 Design Highlights

### Color Palette
```
🟣 Primary: #667eea (Bright Purple)
🟣 Secondary: #764ba2 (Dark Purple)
⚫ Accent: #6c5ce7 (Medium Purple)
🟤 Text: #2c3e50 (Dark Gray)
🩶 Light Gray: #95a5a6 & #ecf0f1
```

### Typography
- **Headings:** Bold, large size (20px-42px)
- **Body:** Regular weight, 13-16px
- **Buttons:** Bold, uppercase, 12-14px

### Spacing
- Generous padding & margins
- Consistent gap between elements (15px-30px)
- Container max-width: 1200px

### Animations
- Smooth transitions (0.3s ease)
- Hover effects on cards & buttons
- Scroll smooth behavior
- Button transform on hover

---

## 📱 Responsive Design

### Desktop (1200px+)
- Full navigation menu
- Multi-column grids
- Large hero section
- Side-by-side layouts

### Tablet (768px - 1199px)
- Adjusted grid columns
- Reduced padding
- Mobile-optimized navigation

### Mobile (< 768px)
- Single column layouts
- Hamburger-menu ready (implement if needed)
- Touch-friendly buttons
- Vertical stacking

---

## 🔌 API Integration

### Base URL
```
http://localhost:5000/api
```

### Endpoints Used
```
GET /api/tours/domestic?page=1&limit=8
- Fetch domestic tours with pagination

GET /api/tours/:id
- Get single tour details

POST /api/tours/search
- Search tours with filters
```

### Response Format
```json
{
  "data": [
    {
      "id": "tour_id",
      "title": "Tour Name",
      "image": "image_url",
      "price": 1000000,
      "originalPrice": 1500000,
      "discount": 30,
      "rating": 4.5,
      "reviews": 128,
      "duration": "3 ngày 2 đêm",
      "startDate": "2026-04-01",
      "available": 5,
      "destination": "Hà Nội"
    }
  ],
  "totalPages": 5,
  "currentPage": 1
}
```

---

## 🚀 Cách Chạy Ứng Dụng

### 1. Install Dependencies
```bash
cd Front_end
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Server sẽ chạy tại `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 📋 File Structure Chi Tiết

```
Front_end/
├── src/
│   ├── components/
│   │   ├── Header.jsx          (95 lines - Navigation component)
│   │   ├── Header.css          (Responsive sticky header)
│   │   ├── Footer.jsx          (127 lines - Footer with scroll)
│   │   └── Footer.css          (Complete footer styles)
│   │
│   ├── pages/
│   │   ├── HomePage.jsx        (280+ lines - Full home page)
│   │   ├── HomePage.css        (800+ lines - Comprehensive styling)
│   │   ├── TourList.jsx        (Existing - List view)
│   │   ├── TourCard.jsx        (Existing - Card component)
│   │   ├── TourDetail.jsx      (Existing - Detail view)
│   │   └── TourList.css        (Existing styles)
│   │
│   ├── App.jsx                 (Updated routing)
│   ├── App.css                 (Updated global layout)
│   ├── index.css               (Modern CSS reset)
│   └── main.jsx                (Entry point)
│
├── package.json
└── vite.config.js
```

---

## 🎯 Routing Structure

```
/ (Home Page)
  ├─ Shows hero, features, news, tours
  └─ Links to tour listings

/tours/domestic (Tour List)
  ├─ Domestic tours with filters
  └─ Pagination & search

/tour/:id (Tour Detail)
  ├─ Full tour information
  └─ Booking form (future)
```

---

## ✨ Usage Examples

### To Use HomePage
```jsx
import HomePage from './pages/HomePage';

// Already included in App.jsx
```

### To Use Header
```jsx
import Header from './components/Header';

// Already included in App.jsx
```

### To Use Footer
```jsx
import Footer from './components/Footer';

// Already included in App.jsx
// Auto back-to-top on scroll
```

---

## 🔧 Customization

### Change Theme Colors
Edit the primary color in each CSS file:
```css
/* Header.css */
background-color: #667eea; /* Change this */

/* Footer.css */
background-color: #2c3e50; /* Change this */
```

### Modify Hero Banner
Edit `HomePage.jsx` hero section:
```jsx
<h1 className="hero-title">Your Title Here</h1>
<p className="hero-subtitle">Your Subtitle</p>
```

### Update Footer Links
Edit `Footer.jsx` footer-links:
```jsx
<li><Link to="/your-page">Your Link</Link></li>
```

---

## 🐛 Troubleshooting

### Components not showing?
- Make sure all imports are correct
- Check if you ran `npm install`
- Verify API URL is correct

### Styling issues?
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check CSS file paths

### API not connecting?
- Verify backend is running on port 5000
- Check network tab in DevTools
- Verify API endpoints exist

---

## 📚 Documentation Structure

- **FRONTEND_GUIDE.md** - Complete technical guide
- **README.md** - Project overview
- **This file** - Quick start & features

---

## ✅ Verification Checklist

- [x] Header component created & styled
- [x] Footer component created & styled
- [x] HomePage component created & styled
- [x] App.jsx updated with routing
- [x] Global styles updated
- [x] Responsive design implemented
- [x] API integration ready
- [x] Back-to-top functionality added
- [x] Newsletter form included
- [x] All animations smooth
- [x] Mobile-friendly layout
- [x] Documentation complete

---

## 🎉 Complete!

Your frontend is now ready with:
- ✅ Professional Header/Navigation
- ✅ Beautiful Footer
- ✅ Complete Home Page
- ✅ Responsive Design
- ✅ API Integration Ready
- ✅ Modern Styling
- ✅ Full Documentation

**Happy Coding! 🚀**
