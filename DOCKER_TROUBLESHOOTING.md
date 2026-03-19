# 🐛 Docker Troubleshooting Guide

## 🔴 Problem: Docker Desktop Not Starting

### Symptoms
- Docker icon missing from system tray
- `docker --version` gives error
- "Cannot connect to Docker daemon"

### Solutions

#### Windows

**Solution 1: Restart Docker**
1. Press `Win + R`
2. Type `services.msc`
3. Find "Docker Desktop Service"
4. Right-click → Restart
5. Open Docker Desktop app

**Solution 2: WSL2 Issue (Windows)**
```bash
# In PowerShell (Admin)
wsl --list --verbose
wsl --set-default-version 2

# Download WSL2 kernel update:
# https://aka.ms/wsl2kernel
```

**Solution 3: Reinstall**
1. Control Panel → Uninstall Program
2. Find "Docker Desktop"
3. Click Uninstall
4. Restart computer
5. Download fresh from docker.com

#### Mac

```bash
# Restart Docker daemon
ps aux | grep Docker
# Kill the process
kill -9 <PID>
# Restart Docker Desktop manually
```

#### Linux

```bash
sudo systemctl restart docker
sudo usermod -aG docker $USER
newgrp docker
```

---

## 🔴 Problem: "docker-compose: command not found"

### Symptoms
```
docker-compose: command not found
```

### Solutions

**Check Installation:**
```bash
docker-compose --version
```

**Windows + Mac:**
- Docker Desktop includes docker-compose
- Uninstall and reinstall Docker Desktop

**Linux:**
```bash
# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

---

## 🔴 Problem: "Port Already in Use"

### Symptoms
```
Error: bind: address already in use
Error starting userland proxy: Bind for 0.0.0.0:5173 failed
```

### Solutions

#### Windows
```bash
# Find what's using port 5173
netstat -ano | findstr :5173

# Output: TCP    127.0.0.1:5173    0.0.0.0:0    LISTENING    12345

# Kill the process
taskkill /PID 12345 /F

# Or change port in docker-compose.yml
# 5173:5173 → 5174:5173
```

#### Mac/Linux
```bash
# Find what's using port 5173
lsof -i :5173

# Kill the process
kill -9 <PID>

# Or use sudo
sudo lsof -i :5173
```

#### Alternative: Change Ports

**File:** `docker-compose.yml`

```yaml
services:
  frontend:
    ports:
      - "5174:5173"  # Changed from 5173:5173
  
  backend:
    ports:
      - "5001:5000"  # Changed from 5000:5000
```

---

## 🔴 Problem: Build Fails

### Symptoms
```
ERROR [backend internal] load metadata for docker.io/library/node:20-alpine
ERROR: failed to solve
```

### Solutions

**Check Internet Connection:**
```bash
# Test connectivity
ping google.com
```

**Try Building Without Cache:**
```bash
docker-compose build --no-cache
```

**Clear Everything & Retry:**
```bash
docker-compose down
docker system prune -a
docker-compose build
```

**Update Docker:**
- Check for Docker Desktop updates
- Fully restart Docker

---

## 🔴 Problem: Containers Won't Start

### Symptoms
```
Error response from daemon
Container exits immediately
```

### Solutions

**Check Logs:**
```bash
docker-compose logs backend
docker-compose logs frontend
```

**Full Reset:**
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

**Check Dockerfile:**
- Frontend: Should expose 5173
- Backend: Should expose 5000
- Both should have valid CMD

---

## 🔴 Problem: Frontend Can't Connect to Backend

### Symptoms
```
GET http://localhost:5000/api/tours 404 (Not Found)
Failed to fetch
```

### Solutions

**Option 1: Use Service Name (Recommended)**

**File:** `src/pages/HomePage.jsx`

```javascript
// Change this:
const API_URL = 'http://localhost:5000/api';

// To this:
const API_URL = 'http://backend:5000/api';
```

**Option 2: Use Environment Variable**

**File:** `docker-compose.yml`

```yaml
services:
  frontend:
    environment:
      - VITE_API_URL=http://backend:5000
```

**File:** Frontend code

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

**Option 3: Check Network**

```bash
# Enter frontend container
docker-compose exec frontend ping backend

# Should return: bytes from backend
```

**Option 4: Backend Not Running?**

```bash
# Check if backend is up
docker-compose ps

# Check backend logs
docker-compose logs backend
```

---

## 🔴 Problem: node_modules Issues

### Symptoms
```
npm ERR! Cannot find module
Missing package
node_modules mounting conflict
```

### Solutions

**Clear & Reinstall:**
```bash
docker-compose down
docker volume prune
docker-compose build --no-cache
docker-compose up
```

**Or Manually Clear:**
```bash
# In container
docker-compose exec frontend bash
rm -rf node_modules
npm install
exit
```

---

## 🔴 Problem: Changes Not Reflecting

### Symptoms
```
Edited code but browser still shows old version
```

### Solutions

**Check Hot-Reload is Working:**
```bash
# Verify docker-compose.yml has volumes:
docker-compose ps

# Show volumes
docker inspect frontend_container | grep Mounts -A 10
```

**If Not Working:**
```bash
# Restart container
docker-compose restart frontend

# Or full restart
docker-compose down
docker-compose up
```

**Clear Browser Cache:**
- Press `Ctrl+Shift+Delete`
- Clear all data
- Try again

---

## 🔴 Problem: Permission Denied (Linux)

### Symptoms
```
permission denied while trying to connect to Docker daemon
Got permission denied while trying to connect to the Docker daemon socket
```

### Solutions

```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Activate changes
newgrp docker

# Verify
docker ps

# If still not working, restart:
sudo systemctl restart docker
```

---

## 🔴 Problem: Out of Disk Space

### Symptoms
```
no space left on device
Error building: write /path failed
```

### Solutions

**Check Disk Space:**
```bash
# Windows
diskpart
list disk

# Mac/Linux
df -h
```

**Clean Up Docker:**
```bash
# Remove stopped containers
docker container prune -f

# Remove unused images
docker image prune -af

# Remove unused volumes
docker volume prune -f

# Nuclear option
docker system prune -a --volumes
```

**Check Container Size:**
```bash
docker ps -s
docker images --format "table {{.Repository}}\t{{.Size}}"
```

---

## 🔴 Problem: Memory/CPU Issues

### Symptoms
```
Container keeps crashing
System getting slow
Out of memory
```

### Solutions

**Check ResourceUsage:**
```bash
docker stats
docker stats frontend_container
```

**Limit Resources**

**File:** `docker-compose.yml`

```yaml
services:
  frontend:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

**Increase Docker Resources (Windows/Mac):**
1. Open Docker Desktop
2. Settings → Resources
3. Increase CPU & Memory
4. Apply & Restart

---

## 🔴 Problem: Slow Performance

### Symptoms
```
Page loads slowly
Commands take forever
```

### Solutions

**Check What's Running:**
```bash
docker ps
docker stats
```

**Rebuild Images:**
```bash
docker-compose build --no-cache --progress=plain
```

**Use Alpine Images:**
```dockerfile
# Instead of:
FROM node:20

# Use:
FROM node:20-alpine  # Much smaller!
```

---

## 🟡 Problem: Weird Errors

### When All Else Fails

**Step 1: Collect Info**
```bash
docker --version
docker-compose --version
docker-compose ps
docker-compose logs
```

**Step 2: Nuclear Restart**
```bash
docker-compose down -v
docker system prune -a
docker-compose build --no-cache
docker-compose up
```

**Step 3: Other Attempts**
```bash
# Restart Docker daemon
# Windows: Restart Docker Desktop
# Mac: Restart Docker Desktop
# Linux: sudo systemctl restart docker

# Reboot computer
# This fixes 80% of weird issues!
```

---

## 📋 Debugging Checklist

When something goes wrong:

- [ ] Check logs: `docker-compose logs`
- [ ] Check status: `docker-compose ps`
- [ ] Check ports: `netstat -ano | findstr :5173`
- [ ] Try restart: `docker-compose restart`
- [ ] Try rebuild: `docker-compose build --no-cache`
- [ ] Try full reset: `docker-compose down -v && docker-compose up --build`
- [ ] Check container: `docker-compose exec frontend bash`
- [ ] Check volume mounts: `docker inspect frontend_container`

---

## 🆘 Getting Help

### Collect This Info

```bash
# System info
docker --version
docker-compose --version
docker-compose ps
docker-compose logs > logs.txt

# Copy logs.txt and share the output
```

### Check These Resources

1. Docker Official Docs: https://docs.docker.com
2. Stack Overflow: Search your error message
3. GitHub Issues: Check project issues
4. Docker Hub: Check image documentation

---

## ✅ Health Checks

Run these to verify everything is OK:

```bash
# All services running?
docker-compose ps

# Can connect to backend from frontend?
docker-compose exec frontend ping backend

# Backend API responding?
docker-compose exec backend curl http://localhost:5000/api/tours/domestic

# Frontend running?
curl http://localhost:5173

# Can write to volumes?
docker-compose exec frontend touch /app/test.txt
```

---

## 🆘 Emergency Commands

When you need to start completely fresh:

```bash
# Option 1: Soft Reset (recommended first)
docker-compose down
docker-compose up --build

# Option 2: Medium Reset
docker-compose down -v
docker volume prune -f
docker-compose build --no-cache
docker-compose up

# Option 3: NUCLEAR OPTION (last resort)
docker system prune -a --volumes
docker-compose build --no-cache
docker-compose up
```

---

**Remember:** Most Docker issues are fixed by:
1. Restarting Docker Desktop
2. `docker-compose build --no-cache`
3. `docker-compose down && docker-compose up`
4. Restarting computer (last resort)

In that order! 🚀

