import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectedDB from './config/db.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Course from './models/Course.js';

const app = express();

// 1. Sabse Pehle CORS (Must be at the top)
app.use(cors({
  origin: ["https://courserapp.netlify.app", "http://localhost:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// 2. Phir JSON Parser
app.use(express.json());

// 3. Configuration aur DB
dotenv.config();
connectedDB();

const PORT = process.env.PORT || 7860 ; 

// --- ROUTES ---

app.get('/', (req, res) => {
    res.send("API hitted Succesfully");
});

// Get Single Course
app.get('/course/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course doesnot exist" });
        }
        res.json(course);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching course" });
    }
});

// Get All Courses
app.get('/all-courses', async (req, res) => {
    try {
        const allCourses = await Course.find({});
        res.status(200).json(allCourses);
    } catch (err) {
        console.log("Backend Error:", err);
        res.status(500).json({ message: err.message });
    }
});

// Add New Course
app.post('/add-course', async (req, res) => {
    try {
        const { title, description, price, image, category, videoUrl } = req.body;
        const newCourse = new Course({
            title,
            description,
            price,
            image,
            category,
            videoUrl
        });

        await newCourse.save();
        return res.status(200).json({
            status: "Success",
            message: "Course Added Successfully"
        });
    } catch (err) {
        console.log("Error occurs while adding Course", err);
        return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
        });
    }
});

// Register User
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ status: "success", message: "User Registered Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration Failed" });
    }
});

// Login User
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ message: "Please SignUp First!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Oops your password is wrong!' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "Mera_Secret_123",
            { expiresIn: '1d' }
        );

        res.json({
            status: "success",
            message: "welcome back",
            token,
            user: { name: user.name, email: user.email }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Login Error" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Congratulations app is running at port ${PORT}`);
});