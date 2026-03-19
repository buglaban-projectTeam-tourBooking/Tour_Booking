# 🐳 Docker Setup Guide - Tour Booking Project

## ✅ Prerequisites

Trước khi bắt đầu, hãy cài đặt:

1. **Docker Desktop** (Bao gồm Docker + Docker Compose)
   - Windows/Mac: [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Linux: `sudo apt-get install docker.io docker-compose`

2. **Verify Installation:**
```bash
docker --version
docker-compose --version
```

Expected output:
```
Docker version 24.x.x
Docker Compose version 2.x.x
```

---

## 📁 Project Structure for Docker

```
Tour_Booking/
├── docker-compose.yml          # Multi-service orchestration
├── Backend/
│   ├── Dockerfile              # Backend container setup
│   ├── package.json
│   ├── index.js
│   └── ...
├── Frontend/
│   ├── Dockerfile              # Frontend container setup
│   ├── package.json
│   ├── vite.config.js
│   └── ...
└── .dockerignore               # (Optional) Files to ignore
```

---

## 🚀 Cách Chạy Project Với Docker

### **Method 1: Using Docker Compose (Recommended) ⭐**

#### Step 1: Mở Terminal tại thư mục Tour_Booking

```bash
cd D:\Tour_Booking
```

#### Step 2: Build các images

```bash
docker-compose build
```

Lệnh này sẽ:
- ✓ Download Node.js 20 Alpine image
- ✓ Cài đặt dependencies từ package.json
- ✓ Tạo 2 images: frontend & backend

**Thời gian:** 3-5 phút lần đầu

#### Step 3: Chạy các containers

```bash
docker-compose up
```

Hoặc chạy ở background:
```bash
docker-compose up -d
```

**Kết quả:**
```
frontend_container created
backend_container created
frontend_container started
backend_container started
```

#### Step 4: Truy cập Ứng Dụng

```
Frontend:  http://localhost:5173
Backend:   http://localhost:5000 (hoặc 3000)
```

#### Step 5: Dừng Containers

```bash
docker-compose down
```

Quick stop:
```bash
docker-compose stop
```

---

## 📋 Docker Compose File Explanation

**File:** `docker-compose.yml`

```yaml
services:
  # Frontend Service
  frontend:
    build: ./Front_end              # Đường dẫn Dockerfile
    container_name: frontend_container
    ports:
      - "5173:5173"                 # Port 5173 trên máy → 5173 trong container
    volumes:
      - ./Front_end:/app            # Hot-reload: thay đổi code → update trong container
      - /app/node_modules           # Keep node_modules in container
    networks:
      - tour_network                # Connect để communicate với backend

  # Backend Service
  backend:
    build: ./Back_end
    container_name: backend_container
    ports:
      - "5000:5000"                 # Port 5000
    volumes:
      - ./Back_end:/app
      - /app/node_modules
    environment:
      - PORT=5000
      - NODE_ENV=development
    networks:
      - tour_network

networks:
  tour_network:
    driver: bridge                  # Cho phép backend & frontend communicate
```

---

## 🎯 Các Lệnh Docker Compose Thường Dùng

### Khởi động & Quản lý

```bash
# Build & start
docker-compose up

# Start with rebuild
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs

# View logs từ service cụ thể
docker-compose logs frontend
docker-compose logs -f backend    # Follow mode (real-time)

# Stop containers
docker-compose stop

# Stop & remove containers
docker-compose down

# Remove images quá
docker-compose down --rmi all

# Restart services
docker-compose restart
```

### Debugging

```bash
# SSH vào container
docker-compose exec frontend bash
docker-compose exec backend bash

# Run command trong container
docker-compose exec frontend npm run build
docker-compose exec backend npm start

# View process list
docker-compose ps
```

---

## 📊 Port Mapping Reference

```
┌──────────────────┬─────────────────┬──────────────────┐
│   Service        │   Local Port    │   Container Port │
├──────────────────┼─────────────────┼──────────────────┤
│   Frontend       │   5173          │   5173           │
│   Backend        │   5000          │   5000           │
└──────────────────┴─────────────────┴──────────────────┘
```

Truy cập từ máy:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 🔧 Dockerfile Explanation

### Frontend Dockerfile

```dockerfile
FROM node:20-alpine                    # Base image: Node.js 20 Alpine (small)

WORKDIR /app                           # Set working directory

COPY package*.json ./                  # Copy package.json & package-lock.json
RUN npm install                        # Install dependencies

COPY . .                               # Copy all project files

EXPOSE 5173                            # Expose port 5173

CMD ["npm", "run", "dev", "--", "--host"]  # Run dev server
```

### Backend Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000                            # Expose port 5000

CMD ["node", "index.js"]               # Start backend server
```

---

## 📝 Step-by-Step Guide

### Full Setup (From Zero)

```bash
# 1. Navigate to project
cd D:\Tour_Booking

# 2. Build images (first time only, or after deps change)
docker-compose build

# 3. Start containers
docker-compose up

# 4. View output
# Frontend running at http://localhost:5173
# Backend running at http://localhost:5000
```

### Make Changes to Code

```bash
# 1. Edit your files (e.g., src/components/Header.jsx)
# 2. Changes automatically update in container (hot-reload)
# 3. Frontend rebuild automatically
# 4. No need to restart!
```

### When Dependencies Change

```bash
# 1. If you add new npm packages
npm install

# 2. Rebuild Docker images
docker-compose build

# 3. Restart containers
docker-compose up --build
```

---

## 🐛 Troubleshooting

### Issue 1: Port Already in Use

```
Error: bind: address already in use
```

**Solution:**
```bash
# Find what's using the port
netstat -ano | findstr :5173      # Windows
lsof -i :5173                      # Mac/Linux

# Kill the process (Windows)
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
# 5173:5173 → 5174:5173
```

### Issue 2: Permission Denied

```
Error: permission denied while trying to connect to Docker daemon
```

**Solution (Linux):**
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Issue 3: Containers Won't Start

```bash
# Check logs
docker-compose logs

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Issue 4: node_modules Issues

```bash
# Clear and reinstall
docker-compose down
docker volume prune
docker-compose up --build
```

### Issue 5: Frontend Not Connecting to Backend

**File:** `src/pages/HomePage.jsx` (or any API call)

```javascript
// Change this:
const API_URL = 'http://localhost:5000/api';

// To this (when using Docker):
const API_URL = 'http://backend:5000/api';  // Use service name
```

Or use environment variables in docker-compose.

---

## 🌐 Network Communication

### Containers Talk to Each Other

Khi dùng Docker Compose, các containers có thể communicate qua:

```javascript
// Frontend calling Backend (inside Docker)
const response = await axios.get('http://backend:5000/api/tours');

// NOT http://localhost:5000 (localhost = container itself)
```

### From Host Machine

```bash
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

---

## 📦 Docker Best Practices

### 1. Use .dockerignore File

**File:** `.dockerignore` (in project root)

```
node_modules
npm-debug.log
.git
.gitignore
README.md
dist
.env.local
```

**Why:** Reduce image size, faster builds

### 2. Environment Variables

**File:** `docker-compose.yml`

```yaml
services:
  backend:
    environment:
      - PORT=5000
      - NODE_ENV=production
      - DB_HOST=database
      - API_KEY=${API_KEY}  # From .env file
    env_file:
      - .env                # Load from .env file
```

### 3. Health Checks

```yaml
services:
  backend:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

---

## 📊 Monitoring Containers

### View Running Containers

```bash
docker ps
docker ps -a                    # Include stopped containers
```

### View Container Logs

```bash
docker logs frontend_container
docker logs -f backend_container    # Follow (real-time)
docker logs --tail 50 backend_container  # Last 50 lines
```

### Container Stats

```bash
docker stats                    # CPU, Memory usage
docker stats frontend_container
```

### Enter Container

```bash
docker exec -it frontend_container bash
cd /app
npm run build
exit
```

---

## 🔄 Development Workflow

### Hot Reload Setup

Your current `docker-compose.yml` already has it:

```yaml
volumes:
  - ./Front_end:/app              # Sync code changes
  - /app/node_modules             # Keep dependencies separate
```

**Flow:**
1. Edit file locally
2. Docker detects change
3. Vite/Dev server recompiles
4. Browser auto-refreshes

### No restart needed!

---

## 🚀 Production vs Development

### Development (Current)

```bash
docker-compose up          # All logs visible, hot-reload enabled
```

### Production

1. Build optimized image:
```bash
docker-compose -f docker-compose.prod.yml up
```

2. Use smaller base image:
```dockerfile
FROM node:20-alpine AS builder
...
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

---

## ✅ Verification Checklist

- [x] Docker Desktop installed
- [x] docker-compose.yml configured
- [x] Dockerfile exists in Backend & Frontend
- [x] Can run `docker-compose build`
- [x] Can run `docker-compose up`
- [x] Frontend accessible at http://localhost:5173
- [x] Backend accessible at http://localhost:5000
- [x] Code changes auto-reload
- [x] Containers communicate via network

---

## 🎯 Quick Reference

```bash
# START PROJECT
docker-compose up -d

# VIEW LOGS
docker-compose logs -f

# INTO FRONTEND
docker-compose exec frontend bash

# INTO BACKEND
docker-compose exec backend bash

# STOP PROJECT
docker-compose down

# REBUILD FROM SCRATCH
docker-compose down --volumes
docker-compose build --no-cache
docker-compose up -d
```

---

## 📚 Additional Resources

- [Docker Official Docs](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

---

**Last Updated:** March 20, 2026  
**Status:** ✅ Complete  
**Docker Version:** 24.0+  
**Compose Version:** 2.0+
