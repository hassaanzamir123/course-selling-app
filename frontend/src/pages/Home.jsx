import React, { useState, useEffect } from 'react' 
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets.js'
import CourseCard from '../components/CourseCard.jsx';
import Review from '../components/Review.jsx';
import Footer from '../components/Footer.jsx';
import axios from 'axios'; 

const Home = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const categories = ["Web Development", "Data Science", "UI/UX Design", "Marketing", "Business"];

  useEffect(() => {
    const fetchHomeCourses = async () => {
      try {
        // ✅ API Call using environment variable
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-courses`);
        
        // 🔥 SAFETY FIX: Direct res.data.slice crash kar sakta hai agar data na mile
        // Pehle check karo ke data array hai ya nahi
        const fetchedData = res.data?.results || res.data?.data || res.data;
        
        if (Array.isArray(fetchedData)) {
          setPopularCourses(fetchedData.slice(0, 3)); 
        } else {
          setPopularCourses([]);
        }
      } catch (err) {
        console.log("Home page data error:", err);
        setPopularCourses([]); // Error ki surat mein empty array taake .map crash na ho
      }
    };
    fetchHomeCourses();
  }, []);

  return (
    <>
      <div className='overflow-x-hidden'>
        <div className="relative w-full h-130 flex items-center justify-center text-center">
          <img src={assets.hero} className="absolute inset-0 w-full h-full object-cover brightness-50" alt="hero" />
          <div className="relative z-10 text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Elevate Your Skills with Cou<span className='text-emerald-500'>rser</span> </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">Master tech skills with hands-on projects.</p>
            <button className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 px-6 py-3 rounded-full font-semibold transition-all">
              Get Started
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <h1 className='text-2xl text-center font-semibold mt-10'>Famous Categories</h1>
        <div className='flex flex-wrap my-6 justify-center gap-4 px-4'>
          {categories.map((cat, index) => (
            <div key={index} className='bg-emerald-500 shadow-md hover:bg-emerald-600 transition-all cursor-pointer rounded-full px-6 py-2 text-white font-semibold'>
              {cat}
            </div>
          ))}
        </div>

        {/* Popular Courses Section */}
        <h1 className='text-3xl text-center font-bold mt-16 mb-8'>Most Popular Courses</h1>
        
        <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
          {
            // 🔥 SAFETY FIX: (popularCourses || []) ensures it never tries to map over null
            (popularCourses && popularCourses.length > 0) ? (
              popularCourses.map((course) => (
                <CourseCard key={course._id} data={course} />
              ))
            ) : (
              <div className='col-span-3 text-center py-10'>
                 <p className='text-zinc-500 animate-pulse'>Loading amazing courses...</p>
              </div>
            )
          }
        </div>

        <div className='mt-20'>
          <Review />
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Home