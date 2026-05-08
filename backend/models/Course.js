import mongoose, { model, Schema } from "mongoose";
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    videoUrl: { type: String, required: true }, // Ye line lazmi add karein
    price: { type: Number, required: true },
    description: { type: String }
},{timestamps:true});
const Course = mongoose.model("Course", courseSchema);
export default Course;
