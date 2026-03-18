# 📋 Order Management Module - Documentation

## 📁 Cấu Trúc Project

```
Front_end/src/
├── pages/
│   └── admin/
│       └── OrderManagement.jsx       # Page chính
├── components/
│   └── order/
│       ├── OrderTable.jsx            # Bảng danh sách
│       ├── OrderRow.jsx              # Từng hàng (expandable)
│       ├── OrderFilter.jsx           # Bộ lọc
│       ├── OrderSearch.jsx           # Tìm kiếm
│       └── OrderPagination.jsx       # Phân trang
├── services/
│   └── orderService.js               # API calls
├── hooks/
│   └── useOrders.js                  # Custom hook quản lý state
└── assets/
    ├── order-management.css
    ├── order-table.css
    ├── order-row.css
    ├── order-filter.css
    ├── order-search.css
    └── order-pagination.css
```

## 🎯 Tính Năng

✅ **Danh sách đơn hàng** - Hiển thị tất cả đơn hàng trong bảng
✅ **Tìm kiếm** - Tìm kiếm theo mã đơn, email, tên khách
✅ **Bộ lọc** - Lọc theo:
  - Trạng thái đơn (Khởi tạo, Xác nhận, Hoàn thành, Hủy)
  - Phương thức thanh toán (Thẻ, Chuyển khoản, Ví, Tại quầy)
  - Trạng thái thanh toán (Chưa thanh toán, Đã thanh toán, Hoàn tiền)
  - Khoảng ngày

✅ **Phân trang** - Điều hướng qua các trang
✅ **Chi tiết đơn** - Mở rộng hàng để xem thêm thông tin
✅ **Hành động** - Chỉnh sửa, xóa đơn
✅ **Badge colors** - Nhận biết trạng thái một cách trực quan
✅ **Responsive** - Tương thích mobile, tablet, desktop

## 🔌 Cách Sử Dụng

### 1. Nhập OrderManagement vào App.jsx

```jsx
import { OrderManagement } from './pages/admin/OrderManagement'
```

### 2. Thiết lập biến môi trường

File `.env.local`:
```
VITE_API_URL=http://localhost:3000
```

### 3. Chạy ứng dụng

```bash
npm run dev
```

Truy cập: http://localhost:5173

## 📡 API Requirements

Backend cần cung cấp endpoint: `GET /api/orders`

### Query Parameters:
- `page` (number): Trang, default 1
- `limit` (number): Giới hạn items/trang, default 10
- `status` (string): pending, confirmed, completed, cancelled
- `paymentMethod` (string): credit_card, bank_transfer, e_wallet, pay_on_site
- `paymentStatus` (string): unpaid, paid, refunded
- `search` (string): Tìm kiếm text
- `dateFrom` (string): Định dạng ISO date
- `dateTo` (string): Định dạng ISO date

### Response Format:
```json
{
  "data": [
    {
      "_id": "order-id",
      "customerName": "Nguyễn Văn A",
      "customerEmail": "email@example.com",
      "customerPhone": "0123456789",
      "tours": [
        {
          "name": "Tour Name",
          "price": 1000000,
          "image": "image-url"
        }
      ],
      "paymentMethod": "credit_card",
      "paymentStatus": "paid",
      "status": "confirmed",
      "totalAmount": 1000000,
      "createdAt": "2024-03-19T00:00:00Z",
      "notes": "Optional notes"
    }
  ],
  "total": 100,
  "totalPages": 10
}
```

## 🪝 Custom Hook - useOrders

```jsx
const {
  orders,              // Mảng các đơn hàng
  loading,             // Loading state
  error,               // Error message
  pagination,          // { page, limit, total, totalPages }
  filters,             // { search, status, ... }
  updateFilters,       // Function(newFilters)
  updatePagination,    // Function(page, limit)
  resetFilters,        // Function()
} = useOrders();
```

## 📦 Service Layer - orderService.js

```jsx
import { getOrders, getOrderById, updateOrder, deleteOrder } from './services/orderService'

// Lấy danh sách
const data = await getOrders({ page: 1, limit: 10, status: 'pending' })

// Lấy chi tiết
const order = await getOrderById(orderId)

// Cập nhật
const updated = await updateOrder(orderId, { status: 'completed' })

// Xóa
const result = await deleteOrder(orderId)
```

## 🎨 Styling

Tất cả CSS files đã được setup và import tự động thông qua component imports.

### Color Scheme:
- Primary: #1976d2 (Xanh)
- Success: #2e7d32 (Xanh lá)
- Warning: #e65100 (Cam)
- Danger: #d32f2f (Đỏ)
- Background: #f5f5f5
- Border: #ddd

## 🛠️ Mở Rộng Chức Năng

### Thêm Edit Modal

BEdit các file:
1. `OrderManagement.jsx` - Thêm state cho modal
2. `OrderTable.jsx` - Thêm modal component
3. `orderService.js` - `updateOrder` API call

### Thêm Export Excel

Thêm button trong toolbar và function để export

### Thêm Bulk Actions

Thêm checkbox cho từng hàng

## 🐳 Docker

Container để access:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📝 Git Workflow

```bash
# 1. Tạo branch
git checkout -b feature/order-management

# 2. Commit
git add .
git commit -m "feat(order): add order management module"

# 3. Push
git push origin feature/order-management

# 4. Tạo Pull Request
# Merge vào develop branch
```

## ⚠️ Important Notes

1. **KHÔNG** gọi API trực tiếp trong component - dùng `orderService.js`
2. **KHÔNG** hardcode API URL - dùng `import.meta.env.VITE_API_URL`
3. **KHÔNG** sửa file của người khác
4. Mỗi component là 1 file riêng để tránh conflict
5. Sử dụng `useOrders` hook để quản lý state

## 📧 Support

Liên hệ team lead nếu có vấn đề hoặc câu hỏi.

---

**Happy Coding! 🚀**
