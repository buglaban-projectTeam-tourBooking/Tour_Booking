# 🚀 Hướng Dẫn Quy Trình Git - Làm việc với Team

## 📋 Nội Dung
1. [Setup Repo](#setup-repo)
2. [Tạo nhánh và commit](#tạo-nhánh-và-commit)
3. [Push lên GitHub](#push-lên-github)
4. [Tạo Pull Request (PR)](#tạo-pull-request)
5. [Merge PR](#merge-pr)
6. [Xử lý xung đột](#xử-lý-xung-đột)

---

## Setup Repo

### 1️⃣ Khởi tạo Git Repository (Lần đầu)

Nếu chưa có repo trên GitHub, tạo một repo mới:
- Truy cập [GitHub.com](https://github.com)
- Nhấp "New Repository"
- Đặt tên: `Tour_Booking`
- Chọn "Public" hoặc "Private"
- Nhấp "Create repository"

### 2️⃣ Clone Repo (Nếu bạn là thành viên mới)

```bash
cd c:\
git clone https://github.com/YOUR_TEAM/Tour_Booking.git
cd Tour_Booking
```

### 3️⃣ Khởi tạo Git Repo (Nếu repo chưa có Git)

```bash
cd c:\Tour_Booking
git init
git remote add origin https://github.com/YOUR_TEAM/Tour_Booking.git
git branch -M main
```

---

## Tạo nhánh và commit

### Quy Tắc Đặt Tên Nhánh
- **Feature mới**: `feature/tour-list` hoặc `feature/domestic-tours`
- **Sửa lỗi**: `bugfix/tour-price-calculation`
- **Cải thiện**: `improvement/ui-responsive`
- **Công việc cá nhân**: `chore/update-dependencies`

### 📝 Các bước tạo nhánh:

#### Bước 1: Cập nhật main (từ team)
```bash
git checkout main
git pull origin main
```

#### Bước 2: Tạo nhánh mới
```bash
git checkout -b feature/domestic-tour-list
```

Hoặc sử dụng một lệnh:
```bash
git switch -c feature/domestic-tour-list
```

#### Bước 3: Kiểm tra bạn đang ở nhánh nào
```bash
git branch
```

Output sẽ hiển thị nhánh hiện tại (có `*`):
```
main
* feature/domestic-tour-list
```

---

## Push lên GitHub

### 📤 Push Nhánh Lần Đầu

```bash
git add .
git commit -m "feat: add domestic tour list feature

- Create TourList component with filters
- Create TourCard component for tour display
- Add backend API endpoints for tours
- Add pagination support"

git push -u origin feature/domestic-tour-list
```

**Giải thích:**
- `git add .` - Thêm tất cả thay đổi vào staging area
- `git commit -m "..."` - Tạo commit với tin nhắn mô tả
- `git push -u origin feature/domestic-tour-list` - Đẩy nhánh lên GitHub lần đầu

### 📌 Format Commit Message (Best Practice)

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type:**
- `feat` - Feature mới
- `fix` - Sửa lỗi
- `style` - Format code (không thay đổi logic)
- `refactor` - Cấu trúc lại code
- `perf` - Cải thiện hiệu năng
- `test` - Thêm/sửa test
- `docs` - Thay đổi documentation
- `chore` - Thay đổi dependencies, config

**Ví dụ tốt:**
```
feat(tour-list): add filter by destination and price

- Implement price range filter component
- Add destination dropdown filter
- Update TourList component to handle filters
- Test filter functionality on various tour data

Closes #123 (nếu này là PR cho issue #123)
```

---

## Tạo Pull Request

### 🔄 Các Bước Tạo PR:

#### Bước 1: Push nhánh (nếu chưa push)
```bash
git push origin feature/domestic-tour-list
```

#### Bước 2: Truy cập GitHub
- Mở [github.com/YOUR_TEAM/Tour_Booking](https://github.com/YOUR_TEAM/Tour_Booking)
- Bạn sẽ thấy thông báo "Compare & pull request"
- Nhấp "Compare & pull request"

#### Bước 3: Điền thông tin PR

**Title (Tiêu đề):**
```
feat: implement domestic tour list feature
```

**Description (Mô tả):**
```
## Thay Đổi
- Tạo component TourList để hiển thị danh sách tour trong nước
- Tạo component TourCard để hiển thị từng tour
- Thiết lập API backend với Express
- Thêm tính năng lọc tour theo điểm đi, giá, ngày khởi hành
- Thêm phân trang cho danh sách tour

## Type Thay Đổi
- [x] Bug fix (non-breaking change which fixes an issue)
- [x] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)

## Liên Quan
Closes #123 (nếu có issue)

## Kiểm Tra
- [x] Code đã được review cá nhân
- [x] Không có console.log debug
- [x] Responsive trên mobile
- [x] Test trên Chrome, Firefox

## Screenshot (Nếu có UI thay đổi)
[Thêm ảnh của trang tour list]
```

#### Bước 4: Chọn Reviewer
- Nhấp "Reviewers" (bên phải)
- Chọn các thành viên team
- Nhấp "Request review"

#### Bước 5: Tạo PR
- Nhấp nút "Create pull request"

---

## Merge PR

### ✅ Quy Trình Merge (Dành cho Team Lead hoặc Reviewer)

#### Cách 1: Merge qua GitHub UI

1. Truy cập PR
2. Tab "Files changed" - Review code
3. Tab "Conversation" - Xem comments
4. Nếu tất cả ổn, nhấp "Merge pull request"
5. Chọn cách merge:
   - **Create a merge commit** - Giữ lịch sử chi tiết
   - **Squash and merge** - Gop tất cả commit thành 1
   - **Rebase and merge** - Tuyến tính lịch sử

6. Nhấp "Confirm merge"
7. Nhấp "Delete branch" (tùy chọn)

#### Cách 2: Merge qua Terminal

```bash
# Bước 1: Cập nhật main
git checkout main
git pull origin main

# Bước 2: Merge nhánh feature
git merge feature/domestic-tour-list --no-ff

# Bước 3: Xóa nhánh cũ (tùy chọn)
git branch -d feature/domestic-tour-list

# Bước 4: Push lên GitHub
git push origin main
git push origin --delete feature/domestic-tour-list
```

---

## Xử Lý Xung Đột (Conflict)

### 🔥 Khi nào xảy ra conflict?
- Khi main có thay đổi mà nhánh của bạn không có
- 2 người sửa cùng file cùng vị trí

### ⚙️ Giải quyết Conflict:

#### Bước 1: Update nhánh với main mới nhất
```bash
git fetch origin
git rebase origin/main
```

hoặc

```bash
git merge origin/main
```

#### Bước 2: GitHub sẽ hiển thị "Conflicts"
- Nhấp "Resolve conflicts"
- Sửa trực tiếp trong editor

#### Bước 3: Chấp nhận thay đổi
Trong file conflict, bạn sẽ thấy:
```javascript
<<<<<<< HEAD
// Code của bạn
=======
// Code từ main
>>>>>>> main
```

Chọn phần code bạn muốn giữ, xóa những phần khác và các dấu hiệu `<<<<`, `====`, `>>>>`

#### Bước 4: Commit và push
```bash
git add .
git commit -m "resolve merge conflicts"
git push origin feature/domestic-tour-list
```

---

## 📊 Workflow Tổng Quát

```
1. git checkout -b feature/new-feature
          ↓
2. Làm việc & commit: git add . && git commit -m "..."
          ↓
3. git push -u origin feature/new-feature
          ↓
4. Tạo PR trên GitHub
          ↓
5. Team review & comment
          ↓
6. Áp dụng feedback (nếu có)
   git add . && git commit -m "..." && git push
          ↓
7. Merge PR (Approved)
          ↓
8. Delete nhánh cũ
          ↓
9. git checkout main && git pull origin main
```

---

## 🤝 Team Collaboration Tips

### ✅ Tốt nhất
```bash
# Luôn cập nhật main trước khi tạo nhánh mới
git checkout main
git pull origin main

# Commit thường xuyên với message rõ ràng
git commit -m "feat: add filter functionality"

# Push thường xuyên (không giữ code cục bộ lâu)
git push origin feature/your-feature

# Trước khi merge, update main mới nhất
git pull origin main
```

### ❌ Tránh
```bash
# Không commit lớn chứa nhiều thay đổi không liên quan
git add . && git commit -m "update"

# Không push trực tiếp vào main (Bảo vệ main branch!)
git push origin main

# Không để PR mở quá lâu mà không update

# Không sửa nhánh của người khác mà không hỏi
```

---

## 📱 Lệnh Hữu Ích Khác

```bash
# Xem lịch sử commit
git log --oneline

# Xem nhánh cộc, cả remote
git branch -a

# Xem trạng thái hiện tại
git status

# Hủy commit cuối cùng (cẩn thận!)
git reset --soft HEAD~1

# Stash (lưu tạm thay đổi)
git stash

# Lấy lại stash
git stash pop

# Tạo tag cho release
git tag v1.0.0
git push origin v1.0.0
```

---

## 🎯 Quy Trình Hoàn Chỉnh Cho Dự Án Của Bạn

**Bạn đã hoàn thành:**
✅ Backend API (Express + CORS)
✅ Frontend TourList component
✅ TourCard component
✅ Routing

**Các Team Member không cần làm lại, chỉ cần:**

1. **Team Member A** - Làm feature tour filter nâng cao
   ```bash
   git checkout -b feature/advanced-tour-filters
   # [Làm việc và commit]
   git push -u origin feature/advanced-tour-filters
   # Tạo PR → Merge với main
   ```

2. **Team Member B** - Làm feature booking system
   ```bash
   git checkout -b feature/booking-system
   # [Làm việc và commit]
   git push -u origin feature/booking-system
   # Tạo PR → Merge với main
   ```

3. **Sau đó tất cả merge vào main:**
   ```bash
   git checkout main
   git pull origin main  # Có tất cả feature từ các team member
   ```

---

## 💡 Ghi Chú Quan Trọng

- **Luôn bảo vệ main branch** - Không ai được push trực tiếp vào main
- **Yêu cầu review** - PR cần ít nhất 1 approval trước merge
- **Rebase vs Merge** - Sử dụng `--no-ff` để giữ lịch sử
- **CI/CD automatic** - Nếu có GitHub Actions, nó sẽ chạy test tự động trước merge
- **Delete branch sau merge** - Giữ repo sạch sẽ

---

**Happy Coding! 🚀**
