import React, { useState, useEffect } from 'react' // useEffect aur useState add kiya
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets.js'
import CourseCard from '../components/CourseCard.jsx';
import Review from '../components/Review.jsx';
import Footer from '../components/Footer.jsx';
import axios from 'axios'; // axios import karo

const Home = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const categories = ["Web Development", "Data Science", "UI/UX Design", "Marketing", "Business"];

  // Backend se data mangwane ke liye
  useEffect(() => {
    const fetchHomeCourses = async () => {
      try {
        const res = await axios.get('http://localhost:9000/all-courses');
        // Hum sirf pehle 3 courses dikhayenge Home page par
        setPopularCourses(res.data.slice(0, 3)); 
      } catch (err) {
        console.log("Home page data error:", err);
      }
    };
    fetchHomeCourses();
  }, []);

  return (
    <>
      <div>
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

        {/*----------------------------------- Pills --------------------------------------- */}
        <h1 className='text-2xl text-center font-semibold mt-10'>Famous Categories</h1>
        <div className='flex flex-wrap my-6 justify-center gap-4'>
          {categories.map((cat, index) => (
            <div key={index} className='bg-emerald-500 shadow-md hover:bg-emerald-600 transition-all cursor-pointer rounded-full px-6 py-2 text-white font-semibold'>
              {cat}
            </div>
          ))}
        </div>

        {/* --------------------------------- Famous Courses ------------------------------ */}
        <h1 className='text-3xl text-center font-bold mt-16 mb-8'>Most Popular Courses</h1>
        
        {/* Grid container for cards */}
        <div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
          {
            popularCourses.length > 0 ? (
              popularCourses.map((course) => (
                <CourseCard key={course._id} data={course} />
              ))
            ) : (
              <p className='text-center col-span-3'>Loading amazing courses...</p>
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