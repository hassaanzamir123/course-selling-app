import React from 'react'
import {assets} from '../assets/assets.js'
import {Link} from 'react-router-dom'

const CourseCard = ({data}) => {
  return (
    <>
      <div className='border shadow-lg hover:scale-102 transition-all rounded-xl overflow-hidden bg-white'>
        
        <div className='flex flex-col'>
          {/* Image Container */}
          <div className='w-full overflow-hidden flex justify-center items-center bg-gray-100'>
            <img 
              src={data?.image || assets.hero} 
              className='h-48 w-full object-cover p-1 rounded-xl' 
              alt={data?.title} 
            />
          </div>

          <div className='px-4 space-y-2 py-3'>
            <h1 className='font-bold text-lg text-zinc-800 line-clamp-1'>
              {data?.title}
            </h1>
            <div className='text-sm text-zinc-600 space-y-1'>
              <p><span className='font-medium'>Category:</span> {data?.category}</p>
              <p><span className='font-medium'>Instructor:</span> {data?.instructor}</p>
            </div>

            <div className='flex items-center justify-between gap-2 pt-2'>
              <h1 className='font-bold text-emerald-600 text-xl'>
                ${data?.price}
              </h1>
              <Link 
                to={`/CourseDetail/${data?._id}`} 
                className='bg-emerald-500 active:scale-95 hover:bg-emerald-600 transition-all cursor-pointer px-4 py-2 rounded-lg text-white font-medium text-sm'
              >
                Buy now
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default CourseCard