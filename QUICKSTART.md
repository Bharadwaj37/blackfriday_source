# Quick Start Guide (Windows) - Black Friday Platform

Get up and running in 5 minutes! This guide is optimized for Windows users.

## ⚡ Prerequisites Check

Open PowerShell or Command Prompt and verify:

```powershell
node --version    # Should show v16.0.0 or higher
npm --version     # Should show 7.0.0 or higher
```

❌ **Don't have Node.js?** Download from: https://nodejs.org/

## 🚀 Quick Setup (5 Steps)

### Step 1: Open the Project

```powershell
cd C:\Users\RELIANCE\OneDrive\Desktop\blackfriday_source
```

### Step 2: Setup Backend

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Copy environment template
copy .env.example .env

# Edit .env file with your MongoDB URI
notepad .env
```

**In the .env file, update:**
```env
MONGO_URI=mongodb+srv://bharadwajkundurthi9_db_user:Bharadwaj%40123456@cluster0.e7kwhc5.mongodb.net/blackfriday?appName=Cluster0
```

**Seed the database:**
```powershell
npm run seed
```

### Step 3: Setup Frontend

```powershell
# Go back to root and enter frontend
cd ..
cd frontend

# Install dependencies
npm install
```

### Step 4: Start Backend Server

**Open a NEW PowerShell window:**
```powershell
cd C:\Users\RELIANCE\OneDrive\Desktop\blackfriday_source\backend
npm run dev
```

✅ You should see: `Server running on port 5000`

### Step 5: Start Frontend

**Open ANOTHER PowerShell window:**
```powershell
cd C:\Users\RELIANCE\OneDrive\Desktop\blackfriday_source\frontend
npm run dev
```

✅ You should see: `Local: http://localhost:5173/`

## 🎉 You're Done!

Open your browser and go to: **http://localhost:5173**

## 🧪 Test Login

- **Email:** user@test.com
- **Password:** password123
- **Promo Code:** BFSALE25

## 🔧 Common Windows Issues

### Issue 1: "Scripts Disabled" Error

**Error:** `cannot be loaded because running scripts is disabled`

**Fix:**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue 2: Port Already in Use

**Error:** `Port 5000 is already in use`

**Fix:**
```powershell
# Find what's using the port
netstat -ano | findstr :5000

# Kill the process (replace <PID> with actual number)
taskkill /PID <PID> /F
```

### Issue 3: MongoDB Connection Failed

**Fix:**
- Double-check your `MONGO_URI` in `backend/.env`
- Ensure your MongoDB Atlas IP whitelist includes your current IP
- Try using `0.0.0.0/0` to allow all IPs (for testing only)

### Issue 4: npm install fails

**Fix:**
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rmdir /s node_modules
del package-lock.json
npm install
```

## 📁 Project Structure

```
blackfriday_source/
├── backend/              ← Backend API (Port 5000)
│   ├── .env             ← Your MongoDB config HERE
│   ├── index.js         ← Server entry
│   └── ...
│
├── frontend/            ← React App (Port 5173)
│   ├── src/
│   └── ...
│
└── README.md
```

## 🎯 Next Steps

1. ✅ Login with test credentials
2. ✅ Browse courses
3. ✅ Subscribe to a free course
4. ✅ Try subscribing to a paid course with promo code `BFSALE25`
5. ✅ Check "My Courses" page

## 📞 Need Help?

- Check the full [SETUP.md](./SETUP.md) for detailed instructions
- Review [README.md](./README.md) for project overview

---

**Happy Coding! 🚀**
