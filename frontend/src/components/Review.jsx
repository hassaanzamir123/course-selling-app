import React from 'react'
import {assets} from '../assets/assets.js'

const Review = () => {
  const reviews = [
    {name:'Hassaan', course:"Web Development", rating: 5},
    {name:'Ali', course:"App Development", rating: 4},
    {name:'Ahmad', course:"Web Development", rating: 5},
    {name:'Sajid', course:"App Development", rating: 4}
  ]

  return (
    <div className='bg-slate-50 py-16 px-9'> {/* Halka sa background change kiya taake section alag dikhe */}
      <h1 className='text-center mb-12 font-bold text-3xl text-slate-800'>What Our Students Say</h1>
      
      <div className='grid md:grid-cols-4 gap-8 grid-cols-1'>
        {reviews.map((item, index) => (
          <div key={index} className='bg-white border hover:scale-102 cursor-pointer border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all'>
            <div className='flex flex-col  items-center text-center'>
              {/* Profile Image / Avatar */}
              <div className='w-20 h-20 mb-4'>
                <img 
                  src={assets.hero} // Yahan baad mein koi student ki photo laga dena
                  className='w-full h-full object-cover rounded-full border-2 border-emerald-500 p-1' 
                  alt={item.name} 
                />
              </div>

              {/* Review Content */}
              <div className='space-y-1'>
                <h2 className='font-bold text-lg text-slate-900'>{item.name}</h2>
                <p className='text-emerald-600 text-sm font-medium'>{item.course}</p>
                
                {/* Dummy Stars */}
                <div className='flex justify-center text-yellow-400 py-2'>
                  {"★".repeat(item.rating)}{"☆".repeat(5-item.rating)}
                </div>

                <p className='text-slate-600 text-sm italic leading-relaxed'>
                  "This platform changed my life! The projects are hands-on and the community is very supportive."
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Review