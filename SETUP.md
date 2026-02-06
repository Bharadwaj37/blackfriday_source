# Complete Setup Guide - Black Friday Course Platform

This guide provides detailed instructions for setting up the Black Friday Course Subscription Platform on your local machine.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Deployment](#deployment)

---

## Prerequisites

### Required Software

1. **Node.js** (v16.0.0 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **MongoDB**
   - **Option A**: Local Installation
     - Download from: https://www.mongodb.com/try/download/community
     - Install and start MongoDB service
   - **Option B**: MongoDB Atlas (Cloud)
     - Create free account at: https://www.mongodb.com/cloud/atlas
     - Create a cluster and get connection string

4. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

---

## Installation

### Step 1: Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd blackfriday-project

# Or download and extract the ZIP file
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

**Expected packages:**
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- nodemon (dev dependency)

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

**Expected packages:**
- react
- react-dom
- react-router-dom
- axios
- tailwindcss
- framer-motion
- lucide-react
- react-toastify
- vite

---

## Configuration

### Backend Configuration

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Create `.env` file** (copy from `.env.example`):
   ```bash
   # Windows
   copy .env.example .env
   
   # macOS/Linux
   cp .env.example .env
   ```

3. **Edit `.env` file** with your settings:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/blackfriday?appName=Cluster0
   JWT_SECRET=your_super_secret_jwt_key_here_change_this
   ```

   **Configuration Details:**
   - `PORT`: Server port (default: 5000)
   - `MONGO_URI`: Your MongoDB connection string
     - For local MongoDB: `mongodb://localhost:27017/blackfriday`
     - For MongoDB Atlas: Use the connection string from Atlas dashboard
   - `JWT_SECRET`: Secret key for JWT tokens (use a strong random string)

### Frontend Configuration

The frontend `.env` is already configured with:
```env
VITE_API_URL=http://localhost:5000/api
```

**For production**, update this to your deployed backend URL.

---

## Database Setup

### Step 1: Ensure MongoDB is Running

**For Local MongoDB:**
```bash
# Windows (if MongoDB is installed as service)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

**For MongoDB Atlas:**
- Ensure your cluster is running
- Whitelist your IP address in Atlas dashboard
- Get the connection string

### Step 2: Seed the Database

Navigate to backend folder and run:

```bash
cd backend
npm run seed
```

This will create:
- Sample courses (free and paid)
- Test user account

**Expected Output:**
```
Connected to MongoDB
Database seeded successfully!
- Created 6 courses
- Created test user
```

---

## Running the Application

### Method 1: Run Both Servers Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server will start on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Client will start on: http://localhost:5173

### Method 2: Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

---

## Testing the Application

1. **Open browser** and navigate to: http://localhost:5173

2. **Test Login:**
   - Email: `user@test.com`
   - Password: `password123`

3. **Test Registration:**
   - Create a new account with any email/password

4. **Test Course Subscription:**
   - Browse courses
   - Subscribe to free courses (instant)
   - Subscribe to paid courses using promo code: `BFSALE25`

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Windows - Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

Or change the port in `backend/.env`:
```env
PORT=5001
```

#### 2. MongoDB Connection Failed

**Error:** `MongooseServerSelectionError`

**Solutions:**
- Verify MongoDB is running
- Check MONGO_URI in `.env`
- For Atlas: Verify IP whitelist and credentials
- Check network/firewall settings

#### 3. CORS Errors

**Error:** `Access-Control-Allow-Origin`

**Solution:**
Verify backend `index.js` has CORS enabled:
```javascript
app.use(cors());
```

#### 4. Module Not Found

**Error:** `Cannot find module 'xyz'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 5. Vite Build Errors

**Error:** Build fails with dependency issues

**Solution:**
```bash
cd frontend
npm run build -- --force
```

---

## Deployment

### Backend Deployment (Render/Railway)

1. **Create account** on Render.com or Railway.app

2. **Create new Web Service**

3. **Configure:**
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Root Directory: `backend`

4. **Set Environment Variables:**
   ```
   MONGO_URI=<your-atlas-uri>
   JWT_SECRET=<your-secret>
   PORT=5000
   ```

5. **Deploy** and note the URL

### Frontend Deployment (Vercel/Netlify)

1. **Create account** on Vercel.com or Netlify.com

2. **Import repository**

3. **Configure:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `frontend`

4. **Set Environment Variable:**
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

5. **Deploy**

### Post-Deployment

1. **Update CORS** in backend to allow your frontend domain
2. **Test all features** on production
3. **Monitor logs** for any errors

---

## Additional Resources

- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

---

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review application logs
3. Check MongoDB connection
4. Verify all environment variables

---

**Last Updated:** February 2026
