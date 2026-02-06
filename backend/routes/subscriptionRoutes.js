const express = require('express');
const router = express.Router();
const { subscribe, getMyCourses } = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, subscribe);
router.get('/my-courses', authMiddleware, getMyCourses);

module.exports = router;
