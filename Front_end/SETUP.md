# 🚀 Order Management - Setup & Contributor Guide

## ✅ Setup Hướng Dẫn

### 1. Clone Repository
```bash
git clone <repo-url>
cd Tour_Booking/Front_end
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
# Copy .env.example → .env.local
cp .env.example .env.local

# Edit .env.local và đặt API URL (nếu cần)
# VITE_API_URL=http://localhost:3000
```

### 4. Run Development Server
```bash
npm run dev
```

Truy cập: http://localhost:5173

## 🌳 Git Workflow

### Trước khi code:
```bash
# 1. Cập nhật develop branch
git checkout develop
git pull origin develop

# 2. Tạo feature branch
git checkout -b feature/<feature-name>
```

### Khi code xong:
```bash
# 1. Stage changes
git add .

# 2. Commit với message rõ ràng
git commit -m "feat(order): <description>"

# 3. Pull latest changes
git pull origin develop

# 4. Push to remote
git push origin feature/<feature-name>

# 5. Tạo Pull Request & request review
```

### Commit Message Convention:
```
feat(order):  Thêm tính năng mới
fix(order):   Sửa bug
refactor(order):  Cải thiện code
style(order):  Format, styling
docs(order):   Documentation
test(order):   Tests
```

## 🏗️ Project Structure

```
Front_end/
├── src/
│   ├── pages/admin/
│   │   ├── OrderManagement.jsx       ← MAIN PAGE
│   │   └── ORDER_MANAGEMENT_README.md
│   ├── components/order/
│   │   ├── OrderTable.jsx
│   │   ├── OrderRow.jsx
│   │   ├── OrderFilter.jsx
│   │   ├── OrderSearch.jsx
│   │   └── OrderPagination.jsx
│   ├── services/
│   │   └── orderService.js           ← API CALLS
│   ├── hooks/
│   │   └── useOrders.js              ← STATE MANAGEMENT
│   ├── assets/
│   │   ├── order-management.css
│   │   ├── order-table.css
│   │   ├── order-row.css
│   │   ├── order-filter.css
│   │   ├── order-search.css
│   │   └── order-pagination.css
│   ├── App.jsx                       ← UPDATED WITH ROUTING
│   └── order-exports.js              ← BARREL EXPORT
├── .env.local                        ← ENVIRONMENT (LOCAL)
├── .env.example                      ← ENVIRONMENT TEMPLATE
├── package.json
└── README.md
```

## 🔌 Dùng Các Component & Hook

### Import Single Component:
```jsx
import { OrderManagement } from './pages/admin/OrderManagement'
import { OrderTable } from './components/order/OrderTable'
```

### Import từ Barrel Export:
```jsx
import { OrderManagement, useOrders, getOrders } from './order-exports'
```

## 🧪 Useful Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## 🚫 DO's & DON'Ts

### ✅ DO:
- ✅ Gọi API thông qua `services/orderService.js`
- ✅ Dùng `useOrders` hook để quản lý state
- ✅ Tách component thành file riêng
- ✅ Sử dụng CSS modules hoặc assets CSS files
- ✅ Commit messages phải rõ ràng
- ✅ Test trước khi push
- ✅ Pull request trước merge

### ❌ DON'T:
- ❌ KHÔNG hardcode API URL
- ❌ KHÔNG gọi API trực tiếp trong component
- ❌ KHÔNG sửa file của người khác (trừ review)
- ❌ KHÔNG commit .env.local
- ❌ KHÔNG merge vào develop mà không review
- ❌ KHÔNG viết tất cả code vào 1 file
- ❌ KHÔNG import từ Backend folder

## 🐳 Docker Commands

### Run containers:
```bash
docker-compose up --build
```

### Stop containers:
```bash
docker-compose down
```

### View logs:
```bash
docker-compose logs -f frontend_container
docker-compose logs -f backend_container
```

## 📡 Backend API Endpoints

### Order Management Endpoints:
```
GET    /api/orders              # Danh sách với filter
GET    /api/orders/:id          # Chi tiết
PUT    /api/orders/:id          # Cập nhật
DELETE /api/orders/:id          # Xóa
```

## 🎨 Styling Guidelines

### CSS Structure:
- Desktop-first approach
- Mobile responsive media queries
- BEM naming convention (optional)
- Use CSS variables for colors (optional)

### Breakpoints:
```
1024px - Tablet
768px  - Mobile
480px  - Small mobile
```

## 🐛 Troubleshooting

### Port 5173 already in use:
```bash
# Kill process on port 5173
# Mac/Linux:
lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows PowerShell:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module not found errors:
```bash
# Clear node_modules & reinstall
rm -rf node_modules
npm install
```

### VITE_API_URL not working:
```bash
# Ensure .env.local exists
# Restart dev server (Ctrl+C, npm run dev)
# Browser console should show correct URL
```

## 📚 Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 👥 Team Communication

- **Issues/Bugs**: Create GitHub issue
- **Questions**: Slack or team channel
- **Code Review**: Pull Request comments
- **Meetings**: Weekly sync on <day>

## 📞 Contact

- **Tech Lead**: @<name>
- **Backend Dev**: @<name>
- **Q&A**: Slack channel #tour-booking

---

**Last Updated**: 2024-03-19
**Version**: 1.0.0

Happy coding! 🚀
