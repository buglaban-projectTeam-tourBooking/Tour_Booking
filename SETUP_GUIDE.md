# 📌 HƯỚNG DẪN SỬ DỤNG - DỰ ÁN TOUR BOOKING

## ✅ Các Tính Năng Vừa Hoàn Thành

### 🎨 Frontend
- ✅ **TourList Component** - Danh sách tour trong nước với giao diện đẹp
- ✅ **TourCard Component** - Thẻ tour hiển thị thông tin chi tiết
- ✅ **Responsive Design** - Tối ưu trên mobile, tablet, desktop
- ✅ **Filter & Pagination** - Lọc theo đích đến, giá, ngày khởi hành + phân trang
- ✅ **React Router** - Routing cơ sở cho TourList & TourDetail

### 🔧 Backend
- ✅ **Express API** - API endpoints để lấy danh sách tour
- ✅ **CORS Support** - Cho phép frontend communicate với backend
- ✅ **Pagination API** - Hỗ trợ phân trang dữ liệu
- ✅ **Sample Data** - Dữ liệu mẫu tour trong nước

---

## 🚀 Cách Chạy Dự Án

### Bước 1: Cài Đặt Dependencies

#### Frontend
```bash
cd c:\Tour_Booking\Front_end
npm install
```

#### Backend
```bash
cd c:\Tour_Booking\Back_end
npm install
```

### Bước 2: Chạy Backend Server

```bash
cd c:\Tour_Booking\Back_end
npm start
```

Output nên hiển thị:
```
Server is running on http://localhost:5000
```

### Bước 3: Chạy Frontend (Terminal mới)

```bash
cd c:\Tour_Booking\Front_end
npm run dev
```

Output nên hiển thị:
```
  VITE v8.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

### Bước 4: Mở Trình Duyệt
- Truy cập: **http://localhost:5173/**
- Bạn sẽ thấy trang danh sách tour trong nước

---

## 📁 Cấu Trúc Các File Vừa Tạo

```
Tour_Booking/
├── Back_end/
│   ├── index.js (✨ NEW - API server)
│   └── package.json (🔧 Modified - Thêm CORS, type: module)
│
├── Front_end/
│   ├── src/
│   │   ├── App.jsx (🔧 Modified - Thêm React Router)
│   │   └── pages/
│   │       ├── TourList.jsx (✨ NEW - Danh sách tour)
│   │       ├── TourList.css (✨ NEW - Styling)
│   │       ├── TourCard.jsx (✨ NEW - Thẻ tour đơn)
│   │       ├── TourCard.css (✨ NEW - Styling)
│   │       ├── TourDetail.jsx (Existing)
│   │       └── TourDetail.css (Existing)
│   └── package.json (🔧 Modified - Thêm axios, react-router-dom)
│
└── GIT_WORKFLOW.md (✨ NEW - Hướng dẫn Git cho team)
```

---

## 🎯 API Endpoints

### Lấy Danh Sách Tour Trong Nước

**URL:** `GET http://localhost:5000/api/tours/domestic`

**Query Parameters:**
- `page` - Trang hiện tại (mặc định: 1)
- `limit` - Số tour mỗi trang (mặc định: 6)

**Ví dụ:**
```
GET http://localhost:5000/api/tours/domestic?page=1&limit=6
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "da-nang-1",
      "title": "Combo Đà Nẵng 2024: ĐÀ NẴNG - HỘI AN - BÀ NÀ HILL",
      "price": 2590000,
      "originalPrice": 13650000,
      "discount": 30,
      "image": "...",
      "rating": 4.5,
      "reviews": 5,
      "startDate": "22/07/2024",
      "endDate": "Thứ Năm",
      "duration": "10 ngày 9 đêm",
      "available": 10,
      "description": "..."
    },
    ...
  ],
  "total": 6,
  "page": 1,
  "limit": 6,
  "totalPages": 1
}
```

### Lấy Chi Tiết Tour (Chuẩn Bị)

**URL:** `GET http://localhost:5000/api/tours/domestic/:id`

**Ví dụ:** `GET http://localhost:5000/api/tours/domestic/da-nang-1`

---

## 👥 Hướng Dẫn Làm Việc Team

### 📖 Chi Tiết Xem: [GIT_WORKFLOW.md](./GIT_WORKFLOW.md)

### Tóm Tắt Nhanh:

**Khi bạn hoàn tất feature:**

1. **Tạo nhánh:**
   ```bash
   git checkout -b feature/domestic-tour-list
   ```

2. **Commit thay đổi:**
   ```bash
   git add .
   git commit -m "feat: add domestic tour list feature"
   ```

3. **Push lên GitHub:**
   ```bash
   git push -u origin feature/domestic-tour-list
   ```

4. **Tạo Pull Request** trên GitHub.com

5. **Yêu cầu review** từ team members

6. **Merge vào main** sau khi approved

7. **Team member khác pull main mới nhất:**
   ```bash
   git checkout main
   git pull origin main
   ```

---

## 🔄 Workflow Cho Team

### Tình Huống: 3 Thành Viên Làm Feature Khác Nhau

```
Main Branch (Protected - không push trực tiếp)
      ↓
Người A: feature/tour-advanced-filter
Người B: feature/booking-payment
Người C: feature/user-reviews
      ↓
Mỗi người tạo PR riêng
      ↓
Team review & approve
      ↓
Merge vào Main
      ↓
Tất cả pull Main mới nhất
      ↓
Dự án hoàn chỉnh
```

---

## 🐛 Troubleshooting

### Frontend không kết nối Backend?

**Lỗi:** `Error: Could not fetch tours`

**Giải pháp:**
1. Kiểm tra backend đã chạy? (http://localhost:5000)
2. Kiểm tra URL API trong TourList.jsx
3. Kiểm tra CORS header trong backend

### Port 5000 đã được sử dụng?

```bash
# Kill process on port 5000 (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

### Port 5173 đã được sử dụng?

```bash
npm run dev -- --port 5174
```

### Lỗi npm install?

```bash
# Xóa node_modules và package-lock.json
rm -r node_modules package-lock.json

# Cài lại
npm install
```

---

## 📝 Tiếp Theo - Các Feature Để Thêm

- [ ] Trang chi tiết tour (TourDetail.jsx) - Khám phá thêm
- [ ] Hệ thống đặt tour & thanh toán
- [ ] Trang đăng nhập / quản lý tài khoản
- [ ] Review & rating từ khách hàng
- [ ] Admin dashboard để quản lý tour
- [ ] Tìm kiếm nâng cao (Search box)
- [ ] Wishlist / Yêu thích tour
- [ ] Email confirmation sau đặt tour

---

## 📚 Tài Liệu Tham Khảo

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Axios Documentation](https://axios-http.com)
- [Git Workflow Best Practices](./GIT_WORKFLOW.md)

---

## 🤝 Liên Hệ & Support

Nếu có vấn đề:
1. Xem [GIT_WORKFLOW.md](./GIT_WORKFLOW.md)
2. Chạy lại npm install
3. Kiểm tra logs từ backend/frontend
4. Hỏi team lead hoặc senior member

---

**🎉 Dự Án Đã Sẵn Sàng Cho Team Collaboration!**
