const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Course = require('../models/Course');
const User = require('../models/User');

const courses = [
    {
        title: "React for Beginners",
        description: "Learn the basics of React.js, components, state, and props.",
        price: 0,
        type: "free",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80" // React Image
    },
    {
        title: "Advanced Node.js Backend",
        description: "Deep dive into Node.js streams, buffers, and performance.",
        price: 49.99,
        type: "paid",
        thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80" // Nodejs/Code Image
    },
    {
        title: "Full Stack MERN Bootcamp",
        description: "Build production-ready applications with MongoDB, Express, React, Node.",
        price: 99.99,
        type: "paid",
        thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80" // Code Image
    },
    {
        title: "Python Masterclass",
        description: "Complete Python programming from zero to hero. Similar to PrepInsta style.",
        price: 39.99,
        type: "paid",
        thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&q=80" // Python
    },
    {
        title: "Java Full Stack Development",
        description: "Master Java, Spring Boot, and Microservices architecture.",
        price: 89.99,
        type: "paid",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80" // Coding/Laptop
    },
    {
        title: "CSS Mastery & Tailwind",
        description: "Master modern CSS layouts, Grid, Flexbox, and TailwindCSS.",
        price: 0,
        type: "free",
        thumbnail: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80" // CSS/Design
    },
    {
        title: "Docker & Kubernetes",
        description: "Containerization and orchestration for scalable apps.",
        price: 79.99,
        type: "paid",
        thumbnail: "https://images.unsplash.com/photo-1605745341117-9575522cd999?w=800&q=80" // Docker
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blackfriday_courses');
        console.log('Connected to MongoDB');

        // Clear existing data
        await Course.deleteMany({});
        await User.deleteMany({}); // Optional: clear users if you want a clean slate
        console.log('Cleared existing data');

        // Insert Courses
        await Course.insertMany(courses);
        console.log('Seeded courses');

        // Create Default User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const adminUser = new User({
            name: "Test User",
            email: "user@test.com",
            password: hashedPassword
        });

        await adminUser.save();
        console.log('Seeded default user: user@test.com / password123');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
