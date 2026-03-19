# Lỗi Đã Sửa (Errors Fixed)

## 1. ✅ Backend - package.json thiếu dependencies
**Vấn đề:** Backend chỉ cài express, thiếu các dependencies quan trọng
**Sửa:** Thêm:
- `cors` - Cho phép cross-origin requests từ frontend
- `dotenv` - Quản lý environment variables
- `morgan` - HTTP request logger
- `nodemon` - Dev dependency để tự động restart khi code thay đổi
- Thêm scripts: `start` và `dev`

## 2. ✅ Backend - index.js thiếu API endpoints
**Vấn đề:** Frontend gọi `/api/orders` và `/api/users` nhưng backend không có endpoints này
**Sửa:** Thêm đầy đủ API endpoints:
- GET /api/orders - Lấy danh sách đơn hàng (hỗ trợ filter, search, pagination)
- GET /api/orders/:id - Lấy chi tiết đơn hàng
- POST /api/orders - Tạo đơn hàng mới
- PUT /api/orders/:id - Cập nhật đơn hàng
- DELETE /api/orders/:id - Xóa đơn hàng
- Tương tự cho /api/users
- Thêm CORS middleware để cho phép frontend kết nối

## 3. ✅ Frontend - index.html title không phù hợp
**Vấn đề:** Title là "front_end" thay vì "Tour Booking"
**Sửa:** Đổi title thành "Tour Booking"

## 4. ✅ Frontend - App.jsx có unused state
**Vấn đề:** Biến `count` và button counter không cần thiết
**Sửa:** Xóa `count` state và counter button

## 5. ✅ docker-compose.yml thiếu network
**Vấn đề:** Frontend và Backend không có network connection
**Sửa:** 
- Thêm network `tour-booking-network`
- Thêm `depends_on` để Backend khởi động trước Frontend
- Thêm `VITE_API_URL=http://backend:3000` environment variable

## 6. ✅ Backend - Dockerfile không tối ưu
**Vấn đề:** Hardcode `node index.js` thay vì dùng npm scripts
**Sửa:** Thay đổi CMD thành `npm start`

## Hướng dẫn chạy ứng dụng

### Với Docker:
```bash
docker-compose up --build
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Không dùng Docker:

#### Backend:
```bash
cd Back_end
npm install
npm run dev  # hoặc npm start
```

#### Frontend:
```bash
cd Front_end
npm install
npm run dev
```
