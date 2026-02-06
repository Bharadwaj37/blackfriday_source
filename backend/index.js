require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/subscribe', subscriptionRoutes); // Note: /subscribe maps to router with / and /my-courses. 
// Wait, prompt says: POST /subscribe and GET /my-courses. 
// If I map /subscribe router to /subscribe, then POST /subscribe/ becomes endpoint.
// But GET /my-courses acts on subscriptions.
// The prompt has slightly different URL structure:
// POST /subscribe
// GET /my-courses
// I should adjust the main file to route these correctly.

app.use('/my-courses', subscriptionRoutes); // This is tricky if I reuse the router. 
// Let's refactor the router usage in the code block.

// Corrected setup below:
app.use('/api/auth', authRoutes); // Conventionally I use /api
// But prompt specific: /auth/signup. So I will use /auth.

// Re-mapping based on prompt exact requirements:
// POST /auth
// GET /courses
// POST /subscribe
// GET /my-courses

// I need to be careful with the router paths.
// In index.js:
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);

// For subscriptions, it's a bit mixed.
// POST /subscribe
// GET /my-courses

// I will import the controllers directly or use specific routers.
// Easiest is to keep them separate.

const subController = require('./controllers/subscriptionController');
const authMiddleware = require('./middleware/authMiddleware');

app.post('/subscribe', authMiddleware, subController.subscribe);
app.get('/my-courses', authMiddleware, subController.getMyCourses);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
