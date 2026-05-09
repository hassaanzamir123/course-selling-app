import React from 'react'
import {assets} from '../assets/assets.js'

const Review = () => {
  const reviews = [
    {
      name: 'Hassaan', 
      course: "Web Development", 
      rating: 5, 
      text: "The logic-building exercises in React were game-changers for me!"
    },
    {
      name: 'Ali', 
      course: "App Development", 
      rating: 4, 
      text: "Practical projects helped me land my first internship. Highly recommended."
    },
    {
      name: 'Ahmad', 
      course: "UI/UX Design", 
      rating: 5, 
      text: "Simplified complex concepts into easy-to-understand modules."
    },
    {
      name: 'Sajid', 
      course: "MERN Stack", 
      rating: 4, 
      text: "Supporting community and the instructor is always ready to help."
    }
  ]

  return (
    <div className='bg-slate-50 py-16 px-6 md:px-12'>
      <div className='max-w-7xl mx-auto'>
        <header className='text-center mb-16'>
          <h1 className='font-extrabold text-3xl md:text-4xl text-slate-800'>What Our Students Say</h1>
          <p className='text-slate-500 mt-3'>Real stories from our successful graduates</p>
        </header>
        
        <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8'>
          {reviews.map((item, index) => (
            <div 
              key={index} 
              className='bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300'
            >
              <div className='flex flex-col items-center text-center'>
                {/* Profile Image / Avatar */}
                <div className='w-20 h-20 mb-5 relative'>
                  <img 
                    src={assets.hero} 
                    className='w-full h-full object-cover rounded-2xl border-2 border-emerald-500 p-1 shadow-lg shadow-emerald-100' 
                    alt={item.name} 
                  />
                  <span className='absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] px-2 py-1 rounded-lg font-bold'>Verified</span>
                </div>

                {/* Review Content */}
                <div className='space-y-2'>
                  <h2 className='font-bold text-lg text-slate-900'>{item.name}</h2>
                  <p className='text-emerald-600 text-xs font-bold uppercase tracking-wider'>{item.course}</p>
                  
                  {/* Rating Stars */}
                  <div className='flex justify-center text-yellow-400 text-lg py-1'>
                    {"★".repeat(item.rating)}{"☆".repeat(5-item.rating)}
                  </div>

                  <p className='text-slate-600 text-sm italic leading-relaxed'>
                    "{item.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Review