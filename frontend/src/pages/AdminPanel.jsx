import React, { useState } from 'react';
import axios from 'axios';
import { MdAddCircleOutline, MdLibraryBooks, MdCloudUpload } from "react-icons/md";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminPanel = () => {
    // 1. Initial State mein sari fields ko empty string "" dena zaroori hai
    const [courseData, setCourseData] = useState({
        title: "",
        category: "",
        image: "",
        videoUrl: "", // Naya field add kiya
        price: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // value || "" ensure karta hai ke input kabhi uncontrolled na ho
        setCourseData({ ...courseData, [name]: value || "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation: Check karein sab fields bhari hain
        if(!courseData.title || !courseData.videoUrl || !courseData.image) {
            return toast.error("Please fill all important fields!");
        }

        setLoading(true);
        try {
            const res = await axios.post('http://localhost:9000/add-course', courseData);
            if (res.status === 200 || res.status === 201) {
                toast.success("Course Published Successfully! 🚀");
                // Form reset after success
                setCourseData({
                    title: "",
                    category: "",
                    image: "",
                    videoUrl: "",
                    price: "",
                    description: ""
                });
            }
        } catch (err) {
            console.error(err);
            toast.error("Error publishing course. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex flex-col md:flex-row bg-zinc-50'>
            {/* Sidebar */}
            <div className='w-full md:w-64 bg-slate-900 p-6 flex flex-col shadow-xl'>
                <div className='flex items-center gap-2 mb-10'>
                    <div className='w-8 h-8 bg-emerald-500 rounded-lg'></div>
                    <h2 className='text-white font-bold text-xl'>Admin Hub</h2>
                </div>
                <ul className='space-y-2'>
                    <li className='flex items-center gap-3 bg-emerald-500/10 text-emerald-500 p-3 rounded-xl font-semibold cursor-pointer'>
                        <MdAddCircleOutline size={22}/> Add New Course
                    </li>
                    <Link to='/my-courses' className='flex items-center gap-3 text-zinc-400 hover:text-white p-3 rounded-xl transition-all hover:bg-slate-800'>
                        <MdLibraryBooks size={22}/> My Courses
                    </Link>
                </ul>
            </div>

            {/* Main Content */}
            <div className='flex-1 p-6 md:p-12'>
                <div className='max-w-3xl mx-auto bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100'>
                    <header className='mb-8'>
                        <h1 className='text-3xl font-bold text-zinc-800'>Create New Course</h1>
                        <p className='text-zinc-500'>Fill in the details to publish your course to the library.</p>
                    </header>

                    <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Course Title */}
                        <div className='flex flex-col gap-2 md:col-span-2'>
                            <label className='font-bold text-sm text-zinc-600'>Course Title</label>
                            <input 
                                name="title" value={courseData.title} onChange={handleChange}
                                type="text" placeholder="e.g. Master React in 30 Days"
                                className='p-3 border border-zinc-200 rounded-xl outline-none focus:border-emerald-500 transition-all'
                            />
                        </div>

                        {/* Category */}
                        <div className='flex flex-col gap-2'>
                            <label className='font-bold text-sm text-zinc-600'>Category</label>
                            <input 
                                name="category" value={courseData.category} onChange={handleChange}
                                type="text" placeholder="Web Development"
                                className='p-3 border border-zinc-200 rounded-xl outline-none focus:border-emerald-500 transition-all'
                            />
                        </div>

                        {/* Price */}
                        <div className='flex flex-col gap-2'>
                            <label className='font-bold text-sm text-zinc-600'>Price (USD)</label>
                            <input 
                                name="price" value={courseData.price} onChange={handleChange}
                                type="number" placeholder="49.99"
                                className='p-3 border border-zinc-200 rounded-xl outline-none focus:border-emerald-500 transition-all'
                            />
                        </div>

                        {/* Video URL (The New Field) */}
                        <div className='flex flex-col gap-2 md:col-span-2'>
                            <label className='font-bold text-sm text-emerald-600 flex items-center gap-1'>
                                <MdCloudUpload /> Course Video URL (YouTube/Vimeo)
                            </label>
                            <input 
                                name="videoUrl" value={courseData.videoUrl} onChange={handleChange}
                                type="text" placeholder="https://www.youtube.com/watch?v=..."
                                className='p-3 border border-emerald-100 bg-emerald-50/30 rounded-xl outline-none focus:border-emerald-500 transition-all'
                            />
                        </div>

                        {/* Image URL */}
                        <div className='flex flex-col gap-2 md:col-span-2'>
                            <label className='font-bold text-sm text-zinc-600'>Thumbnail Image URL</label>
                            <input 
                                name="image" value={courseData.image} onChange={handleChange}
                                type="text" placeholder="https://images.unsplash.com/..."
                                className='p-3 border border-zinc-200 rounded-xl outline-none focus:border-emerald-500 transition-all'
                            />
                        </div>

                        {/* Description */}
                        <div className='flex flex-col gap-2 md:col-span-2'>
                            <label className='font-bold text-sm text-zinc-600'>Description</label>
                            <textarea 
                                name="description" value={courseData.description} onChange={handleChange}
                                rows="4" placeholder="What will students learn?"
                                className='p-3 border border-zinc-200 rounded-xl outline-none focus:border-emerald-500 transition-all'
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button 
                            disabled={loading}
                            type="submit"
                            className='md:col-span-2 bg-emerald-500 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 active:scale-[0.98] transition-all shadow-lg shadow-emerald-200 disabled:bg-zinc-300 disabled:shadow-none cursor-pointer'
                        >
                            {loading ? "Publishing Course..." : "Publish Course Now"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;