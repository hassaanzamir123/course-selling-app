import React from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'

const CourseCard = ({ data }) => {
  return (
    <div className='group border border-zinc-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-2xl overflow-hidden bg-white flex flex-col h-full'>
      
      {/* 1. Image Container with Aspect Ratio */}
      <div className='relative aspect-video w-full overflow-hidden bg-zinc-100'>
        <img 
          src={data?.image || assets.hero} 
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-110' 
          alt={data?.title || "Course Thumbnail"} 
        />
        {/* Category Badge on Image */}
        <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-[10px] font-bold text-emerald-600 uppercase tracking-wider'>
          {data?.category || "General"}
        </div>
      </div>

      {/* 2. Content Section */}
      <div className='p-5 flex flex-col flex-grow justify-between'>
        <div className='space-y-2'>
          <h1 className='font-bold text-lg text-zinc-800 line-clamp-2 leading-snug min-h-[3.5rem]'>
            {data?.title}
          </h1>
          
          <div className='text-sm text-zinc-500 flex items-center gap-2'>
            <div className='w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-[10px] font-bold text-zinc-600'>
              {data?.instructor ? data.instructor.charAt(0) : 'I'}
            </div>
            <p className='truncate'><span className='font-medium text-zinc-700'>{data?.instructor || "Expert Instructor"}</span></p>
          </div>
        </div>

        {/* 3. Footer Section (Price & Action) */}
        <div className='flex items-center justify-between gap-2 pt-5 mt-auto border-t border-zinc-50'>
          <div className='flex flex-col'>
            <span className='text-[10px] text-zinc-400 font-bold uppercase tracking-tighter'>Price</span>
            <h1 className='font-extrabold text-emerald-600 text-xl leading-none'>
              ${data?.price || "0.00"}
            </h1>
          </div>
          
          <Link 
            to={`/CourseDetail/${data?._id}`} 
            className='bg-emerald-500 active:scale-95 hover:bg-emerald-600 transition-all px-5 py-2.5 rounded-xl text-white font-bold text-sm shadow-lg shadow-emerald-100'
          >
            Details
          </Link>
        </div>
      </div>
      
    </div>
  )
}

export default CourseCard