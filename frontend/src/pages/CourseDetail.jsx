import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import Footer from '../components/Footer'
import { useParams, useNavigate } from 'react-router-dom' 
import axios from 'axios'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import toast from 'react-hot-toast' 

const CourseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  const { AddToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // ✅ LOCALHOST KI JAGAH AB LIVE BACK4APP URL USE HO RAHA HAI
        const res = await axios.get(`https://courserbackend-n6250f72.b4a.run/course/${id}`)
        setCourse(res.data)
        setLoading(false)
      } catch (err) {
        console.log("Error fetching detail:", err)
        setLoading(false)
        toast.error("Failed to load course details!")
      }
    };
    if (id) fetchCourse()
  }, [id])

  // --- Protected Handle Enroll Function ---
  const handleEnroll = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token && !user) {
      // Agar user login nahi hai
      toast.error("Please Login First!");
      setTimeout(() => {
        navigate('/Signup'); // Login page par bhej do
      }, 1500);
      return; 
    }

    // 2. Agar login hai, toh Cart mein add karo
    AddToCart(course);
    toast.success(`${course.title} added to your cart! 🛒`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
  }

  if (loading) return <div className='h-screen flex items-center justify-center text-xl font-bold text-zinc-800'>Loading Course...</div>
  if (!course) return <div className='h-screen flex items-center justify-center text-xl font-bold text-red-500'>Course not found!</div>

  return (
    <div className='min-h-screen bg-white font-sans'>
      {/* Hero Section */}
      <div className='bg-zinc-900 text-white py-16 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row justify-between items-start gap-10'>
            <div className='md:w-[60%]'>
              <span className='bg-emerald-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider'>
                {course.category}
              </span>
              <h1 className='text-3xl md:text-5xl font-bold mt-4 leading-tight'>
                {course.title}
              </h1>
              <p className='text-zinc-400 mt-4 text-lg md:text-xl max-w-2xl'>
                Master {course.title} from scratch. This comprehensive course is designed for both beginners and professionals.
              </p>
              <div className='flex items-center gap-4 mt-6 text-sm'>
                <p>⭐ <span className='text-yellow-400 font-bold'>4.8</span> (250+ Ratings)</p>
                <p>👤 Created by <span className='text-emerald-400 font-semibold'>Admin</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='flex flex-col lg:flex-row gap-12'>
          
          {/* Left Side: Description */}
          <div className='lg:w-[65%]'>
            <div className='space-y-8'>
              <section>
                <h2 className='text-2xl font-bold text-zinc-800 mb-4'>About this course</h2>
                <p className='text-zinc-600 text-lg leading-relaxed whitespace-pre-line'>
                  {course.description}
                </p>
              </section>

              <section className='bg-zinc-50 p-6 rounded-2xl border border-zinc-100'>
                <h3 className='text-xl font-bold text-zinc-800 mb-4'>Why take this course?</h3>
                <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {['Lifetime access', 'Hands-on projects', 'Certification of completion', 'Expert mentorship'].map((item, index) => (
                    <li key={index} className='flex items-center gap-3 text-zinc-600'>
                      <span className='bg-emerald-100 text-emerald-600 p-1 rounded-full text-xs'>✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {/* Right Side: Floating Card */}
          <div className='lg:w-[35%]'>
            <div className='lg:-mt-48 sticky top-10 bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-200'>
              <img 
                src={course.image || assets.hero}
                className='w-full h-56 object-cover' 
                alt="Course Thumbnail" 
              />
              <div className='p-8'>
                <div className='flex items-baseline gap-2 mb-6'>
                  <span className='text-4xl font-bold text-zinc-900'>${course.price}</span>
                  <span className='text-zinc-400 line-through'>${(course.price * 1.5).toFixed(2)}</span>
                </div>

                <button 
                  onClick={handleEnroll} 
                  className='w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 transition duration-300 transform active:scale-95 shadow-lg shadow-emerald-200 mb-4 cursor-pointer'
                >
                  Enroll in Course
                </button>
                
                <div className='space-y-3 text-sm text-zinc-600'>
                  <p className='flex items-center gap-2'>📅 Updated {new Date().toLocaleDateString()}</p>
                  <p className='flex items-center gap-2'>🌎 Language: English</p>
                  <p className='flex items-center gap-2'>🔒 Secure payment</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default CourseDetail