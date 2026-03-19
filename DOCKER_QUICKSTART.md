# 🐳 Docker - Getting Started (5 Minutes)

## ⚡ Quick Start (TL;DR)

```bash
# Step 1: Navigate to project
cd D:\Tour_Booking

# Step 2: Start everything
docker-compose up

# Step 3: Open in browser
# Frontend: http://localhost:5173
# Backend: http://localhost:5000

# Step 4: Stop (when done)
# Press Ctrl+C in terminal
```

**That's it!** 🎉

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] Docker Desktop installed
- [ ] Docker running (the Docker whale icon visible in system tray)
- [ ] Command line/Terminal open
- [ ] Working internet connection (first run will download images)

### Install Docker

1. Go to https://www.docker.com/products/docker-desktop
2. Download for your OS (Windows/Mac/Linux)
3. Install it
4. Open terminal and run:
```bash
docker --version
docker-compose --version
```

If both show version numbers, you're ready! ✅

---

## 🚀 First Time Setup

### Step 1: Navigate to Project

**Windows (PowerShell):**
```bash
cd D:\Tour_Booking
```

**Mac/Linux:**
```bash
cd /path/to/Tour_Booking
```

### Step 2: Build Images (First Time Only)

Takes 3-5 minutes:
```bash
docker-compose build
```

You should see:
```
[+] Building 45.3s (18/18) FINISHED
 => backend
 => frontend
```

### Step 3: Start Project

```bash
docker-compose up
```

Wait for this output:
```
backend_container   | Server running on port 5000
frontend_container  | VITE v5.x.x  ready in 324 ms
frontend_container  | ➜  Local:   http://localhost:5173/
```

### Step 4: Done!

Open browser and go to:
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

### Step 5: Stop When Done

In the terminal, press:
```
Ctrl + C
```

Or in another terminal:
```bash
docker-compose down
```

---

## 📱 Using the Application

### Frontend (Port 5173)

```
http://localhost:5173
```

You should see:
- Home page with hero banner
- Header & Footer
- Tour listings
- Search functionality

### Backend (Port 5000)

```
http://localhost:5000/api/tours/domestic
```

If working, you'll see JSON data with tours

---

## 🔄 Common Scenarios

### Scenario 1: I Made Code Changes

**Good news:** Changes automatically apply! ✨

```
1. Edit your code
2. Save file
3. Check browser - it auto-refreshes
4. No restart needed!
```

### Scenario 2: I Want to Stop for Now

```bash
# Press Ctrl+C in terminal

or in another terminal:

docker-compose stop
```

Containers pause but data remains

### Scenario 3: I Want to Clean Up & Start Fresh

```bash
docker-compose down

# Then start again
docker-compose up
```

### Scenario 4: I Added New Dependencies

```bash
# Stop current
docker-compose down

# Rebuild to include new deps
docker-compose build --no-cache

# Start again
docker-compose up
```

### Scenario 5: Something Broke

```bash
# View the error
docker-compose logs

# See specific service
docker-compose logs backend
docker-compose logs frontend

# Nuclear reset
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

---

## 🖥️ Advanced: SSH Into Container

Want to run commands inside the container?

### Enter Frontend Container

```bash
docker-compose exec frontend bash
```

Then you can:
```bash
npm run build
npm install
ls -la
exit                  # Come back out
```

### Enter Backend Container

```bash
docker-compose exec backend bash
```

---

## ✅ Verification Checklist

After running, verify everything works:

- [ ] No error messages in terminal
- [ ] Frontend loads at http://localhost:5173
- [ ] Backend responds at http://localhost:5000/api/tours/domestic
- [ ] Page shows tour data (if backend is ready)
- [ ] Can edit code and see changes
- [ ] Can stop with Ctrl+C
- [ ] Can start again with docker-compose up

All checked? You're all set! 🎉

---

## 📊 What's Running?

When you run `docker-compose up`, these containers start:

| Service | Port | Purpose |
|---------|------|---------|
| **Frontend** | 5173 | ReactJS Vite app |
| **Backend** | 5000 | Node.js Express API |

They can communicate with each other = fully functional app!

---

## 🌐 Network Magic Explained

**Your Machine:**
```
http://localhost:5173 → Frontend Container
http://localhost:5000 → Backend Container
```

**Inside Docker Network:**
```
frontend container can reach → http://backend:5000
backend container can reach  → http://frontend:5173
```

This is why we create a "network" in Docker Compose!

---

## 🆘 Quick Troubleshooting

### "Port 5173 already in use"
```bash
# Find what's using it
netstat -ano | findstr :5173

# Kill it (Windows)
taskkill /PID <number> /F

# Or change port in docker-compose.yml
# 5173:5173 → 5174:5173
```

### "Docker daemon not running"
```
→ Open Docker Desktop app
→ Wait for whale icon to appear
→ Try again
```

### "Build failed"
```bash
docker-compose build --no-cache
```

### "Can't connect to backend"
Check logs:
```bash
docker-compose logs backend
```

---

## 📚 Need More Info?

- **Full Docker Guide:** See `DOCKER_GUIDE.md`
- **Command Reference:** See `DOCKER_COMMANDS.md`
- **Project Docs:** See `FRONTEND_GUIDE.md`

---

## 🎯 Success Criteria

✅ You know you're successful when:

1. ✓ `docker-compose up` starts without errors
2. ✓ Frontend loads at http://localhost:5173
3. ✓ Backend API responds at http://localhost:5000
4. ✓ You can see tour data in the frontend
5. ✓ Editing code auto-refreshes the browser
6. ✓ You can stop with Ctrl+C without errors

---

## 🚀 You're Ready!

You now know how to:
- ✅ Install Docker
- ✅ Build the project
- ✅ Start all services
- ✅ Access the app
- ✅ Make changes
- ✅ Stop when done
- ✅ Debug problems

**Have fun coding!** 🎉

---

## 📞 Quick Command Reference

```bash
docker-compose up              # Start
docker-compose down            # Stop
docker-compose logs -f         # Watch logs
docker-compose exec frontend bash    # SSH to frontend
docker compose ps              # Status
```

Print this for your desk! 📋

---

**Last Updated:** March 20, 2026
