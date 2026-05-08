import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
const Footer = () => {
  
  return (
    <footer className='bg-slate-900 text-slate-300 py-12 px-9 mt-20'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10'>
        
        {/* Column 1: Brand */}
        <div className='space-y-4'>
          <h2 className='text-white text-2xl font-bold'>Courser<span className='text-emerald-500'>.</span></h2>
          <p className='text-sm leading-relaxed'>
            Empowering learners worldwide with practical, project-based courses. Build your career with us.
          </p>
        </div>

        {/* Column 2: Pages */}
        <div>
          <h3 className='text-white font-semibold mb-4'>Company</h3>
          <ul className='space-y-2 text-sm'>
            <li Link to='/' className='hover:text-emerald-500 cursor-pointer'>Home</li>
            <li Link to='/about' className='hover:text-emerald-500 cursor-pointer'>About Us</li>
            <li Link to='/contact ' className='hover:text-emerald-500 cursor-pointer'>Contact</li>
            <li className='hover:text-emerald-500 cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Column 3: Categories */}
        <div>
          <h3 className='text-white font-semibold mb-4'>Categories</h3>
          <ul className='space-y-2 text-sm'>
            <li className='hover:text-emerald-500 cursor-pointer'>Web Development</li>
            <li className='hover:text-emerald-500 cursor-pointer'>Data Science</li>
            <li className='hover:text-emerald-500 cursor-pointer'>UI/UX Design</li>
            <li className='hover:text-emerald-500 cursor-pointer'>Marketing</li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className='text-white font-semibold mb-4'>Subscribe</h3>
          <p className='text-sm mb-4'>Get the latest course updates.</p>
          <div className='flex gap-2'>
            <input 
              type="email" 
              placeholder="Email address" 
              className='bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:border-emerald-500'
            />
            <button className='bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600 transition-all'>
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className='border-t border-slate-800 mt-12 pt-8 text-center text-sm'>
        <p>© 2026 Courser. Developed by <span className='text-emerald-500 font-medium'>Hassaan Zamir</span>. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer