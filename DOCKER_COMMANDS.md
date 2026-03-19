# 🚀 Docker Commands Quick Reference

## 🎯 MOST USED COMMANDS

### Start Project
```bash
docker-compose up
```
✓ Builds images if needed  
✓ Starts all containers  
✓ Shows logs in terminal  
✓ Stop with: `Ctrl+C`

### Start Silently (Background)
```bash
docker-compose up -d
```
✓ No logs in terminal  
✓ Continues running  
✓ Stop with: `docker-compose down`

---

## 📊 Container Management

### View Status
```bash
docker-compose ps
```
Shows all running containers

### View Logs
```bash
docker-compose logs
docker-compose logs -f                    # Follow (real-time)
docker-compose logs frontend              # Only frontend
docker-compose logs backend               # Only backend  
docker-compose logs --tail 50 frontend    # Last 50 lines
```

### Stop All Containers
```bash
docker-compose down
```
Stops & removes containers (images stay)

### Stop & Remove Everything
```bash
docker-compose down -v
```
Also removes volumes

---

## 🔧 Building & Rebuilding

### Build Images (First Time)
```bash
docker-compose build
```

### Build Without Cache
```bash
docker-compose build --no-cache
```
Use when dependencies change or build fails

### Build & Start
```bash
docker-compose up --build
```
Rebuilds images before starting

---

## 🖥️ Access Container Shell

### Frontend Shell
```bash
docker-compose exec frontend bash
```
Then you can: `npm run build`, `npm install`, etc.

### Backend Shell
```bash
docker-compose exec backend bash
```

### Exit Shell
```bash
exit
```

---

## 🧪 Running Commands in Containers

### Run NPM Commands
```bash
docker-compose exec frontend npm install
docker-compose exec frontend npm run build
docker-compose exec backend npm start
```

### Run Test
```bash
docker-compose exec frontend npm run lint
```

### View Real-time Logs
```bash
docker-compose logs -f frontend
```

---

## 🔍 Debugging

### Check If Containers Running
```bash
docker ps
docker ps -a          # Include stopped
```

### Check Container Stats (CPU, Memory)
```bash
docker stats
docker stats frontend_container
```

### View Container Logs
```bash
docker logs frontend_container
docker logs -f backend_container
```

### Inspect Container Details
```bash
docker inspect frontend_container
```

---

## 🗑️ Clean Up

### Remove Stopped Containers
```bash
docker container prune
```

### Remove Unused Images
```bash
docker image prune
```

### Remove Unused Volumes
```bash
docker volume prune
```

### Remove Everything (Nuclear Option)
```bash
docker system prune -a
```

---

## 📈 Useful Docker Commands

### List All Images
```bash
docker images
docker images | grep tour
```

### Remove Specific Image
```bash
docker rmi image_name
```

### View Image Layers
```bash
docker history frontend_container
```

### Build Specific Service
```bash
docker-compose build frontend
docker-compose build backend
```

---

## 🔗 Network & Ports

### Check Port Usage (Windows)
```bash
netstat -ano | findstr :5173
netstat -ano | findstr :5000
```

### Check Port Usage (Mac/Linux)
```bash
lsof -i :5173
lsof -i :5000
```

### Kill Process on Port (Windows)
```bash
taskkill /PID <PID> /F
```

---

## ⚡ Docker Compose Quick Syntax

```bash
# Up
docker-compose up                 # Start all
docker-compose up frontend        # Start only frontend
docker-compose up -d              # Start detached

# Down
docker-compose down               # Stop & remove
docker-compose down -v            # Also remove volumes
docker-compose stop               # Stop only

# Build
docker-compose build              # Build all
docker-compose build --no-cache   # Force rebuild
docker-compose build frontend     # Build specific

# Restart
docker-compose restart            # Restart all
docker-compose restart frontend   # Restart specific

# Logs
docker-compose logs               # Show all logs
docker-compose logs -f            # Follow
docker-compose logs frontend      # Specific service

# Execute
docker-compose exec frontend bash # SSH into container
docker-compose exec backend npm start

# Remove
docker-compose rm                 # Remove containers
docker-compose rm -f              # Force remove
```

---

## 🎯 Common Workflows

### Fresh Start (Nuclear)
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Just Restart Services
```bash
docker-compose restart
```

### Update Code & Rebuild
```bash
docker-compose down
docker-compose build
docker-compose up
```

### View Everything
```bash
docker-compose ps
docker-compose logs -f
```

---

## 🚨 Troubleshooting Commands

### Port Already Used?
```bash
netstat -ano | findstr :5173
```

### Container Won't Start?
```bash
docker-compose logs backend      # View error logs
docker-compose build --no-cache  # Rebuild
```

### Need to Enter Container?
```bash
docker-compose exec frontend bash
cd /app
ls -la
npm list
exit
```

### Check Network Connection?
```bash
docker exec frontend_container ping backend
```

---

## 📋 Quick Cheat Sheet

| Task | Command |
|------|---------|
| Start All | `docker-compose up` |
| Start Detached | `docker-compose up -d` |
| Stop All | `docker-compose down` |
| View Status | `docker-compose ps` |
| View Logs | `docker-compose logs -f` |
| Into Frontend | `docker-compose exec frontend bash` |
| Rebuild All | `docker-compose build --no-cache` |
| Full Reset | `docker-compose down -v && docker-compose up --build` |

---

## 🌐 Accessing Services

```
Frontend:  http://localhost:5173
Backend:   http://localhost:5000
```

If containers can't find each other, use:
```
Frontend → Backend:  http://backend:5000
Backend → Frontend:  http://frontend:5173
```

---

**Bookmark this file for quick reference!** 🔖

