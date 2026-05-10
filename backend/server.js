import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import connectedDB from './config/db.js'
import User from './models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Course from './models/Course.js'

const app = express()
app.use(express.json())
dotenv.config()
connectedDB()

app.use(cors({
  origin: ["https://courserapp.netlify.app", "http://localhost:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
const PORT = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send("API hitted Succesfully")
}) 

app.get('/course/:id',async(req,res)=>{
    try{
        const course = await Course.findById(req.params.id)
        if(!course){
          return  res.status(404).json({message:"Course doesnot exist"})
        }
        res.json(course)
    }
    catch(err){
        console.log(err)
    }
})

app.get('/all-courses',async(req,res)=>{
    try{
        const allCourses = await Course.find({})
        res.status(200).json(allCourses)
    }
    catch(err){
       console.log("Backend Error:", err)
        res.status(500).json({ message: err.message });
    }
})

app.post('/add-course', async (req, res) => {
    try {
        // 1. videoUrl ko yahan destructure kiya (Jo pehle missing tha)
        const { title, description, price, image, category, videoUrl } = req.body;

        const newCourse = new Course({
            title,
            description,
            price,
            image,
            category,
            videoUrl // 2. Isay yahan object mein pass kiya
        });

        // 3. Database mein save kiya
        await newCourse.save();

        // 4. Success response bheja
        return res.status(200).json({
            status: "Success",
            message: "Course Added Successfully"
        });

    } catch (err) {
        console.log("Error occurs while adding Course", err);
        
        // 5. Error response bhejna zaroori hai taake frontend 'Publishing' par na atka rahe
        return res.status(500).json({
            status: "Error",
            message: "Internal Server Error"
        });
    }
});
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        await newUser.save();

        // Ye line zaroori hai taake signup ke baad user login ho sake
        res.status(201).json({ status: "success", message: "User Registered Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration Failed" });
    }
});

app.post('/login',async (req,res)=>{
    try{
        const{email,password} = req.body
             console.log(email,password)
            // ager user signIN hi nhi hua to ye karo 
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Please SignUp First!"})
        }

        // ager signIn hai to 


        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:'Oops your password is wrong!'})
        }
        // jwt  
        const token = jwt.sign(
            {id:user._id , role:user.role},
            "Mera_Secret_123",
            {expiresIn:'1d'}
        )

        res.json({
            status:"success",
            message:"welcome back",
            token:token,
            user:{name:user.name , email:user.email}
        })
}
    catch(err){
        console.log(err)
    }
   

})



app.listen(PORT,()=>{
    console.log(`✅ Congratulations app is running at port ${PORT}`)
})