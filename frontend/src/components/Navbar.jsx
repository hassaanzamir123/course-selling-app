import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdManageAccounts, MdClose, MdMenu } from "react-icons/md"; // MdMenu add kiya
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false) // Profile dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Mobile links menu
  
  const { cart } = useContext(CartContext);
  const navigate = useNavigate()

  const savedUser = localStorage.getItem('user')
  const user = (savedUser && savedUser !== "undefined") ? JSON.parse(savedUser) : null;

  const handleProfile = () => {
    if (user) {
      navigate('/adminPanel')
    } else {
      navigate('/Signup')
    }
    setIsOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsOpen(false)
    navigate('/')
  }

  return (
    <>
      <div className='relative top-0 z-[100] w-full'>
        <div className='flex p-3 bg-slate-900 justify-between items-center shadow-md px-4 md:px-8'>
          
          {/* 1. Left Side: Hamburger (Mobile Only) & Logo */}
          <div className='flex items-center gap-4'>
            <div className='md:hidden text-white text-3xl cursor-pointer' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
            </div>
            <Link to='/' className='text-xl md:text-2xl font-bold text-white'>
              Cou<span className='text-emerald-500'>rser</span>
            </Link>
          </div>

          {/* 2. Middle: Desktop Links (Hidden on Mobile) */}
          <div className='hidden md:flex'>
            <ul className='flex space-x-8 text-white font-medium'>
              <Link to='/' className='hover:text-emerald-400 transition-colors'>Home</Link>
              <Link to='/About' className='hover:text-emerald-400 transition-colors'>About</Link>
              <Link to='/courses' className='hover:text-emerald-400 transition-colors'>Courses</Link>
              <Link to='/Contact' className='hover:text-emerald-400 transition-colors'>Contact</Link>
            </ul>
          </div>

          {/* 3. Right Side: Icons */}
          <div className='flex items-center gap-4 md:gap-6 text-white text-2xl md:text-3xl relative'>
            
            {/* Cart Icon */}
            <Link to='/cart' className='relative active:scale-90 transition-transform'>
              <HiMiniShoppingCart className='hover:text-gray-300' />
              {cart.length > 0 && (
                <span className='absolute -right-2 -top-2 rounded-full text-[10px] bg-green-500 px-1.5 py-0.5 font-bold'>
                  {cart.length}
                </span>
              )}
            </Link>
            
            {/* Profile Dropdown Toggle */}
            <div className='relative'>
              <MdManageAccounts 
                className='hover:text-gray-300 cursor-pointer active:scale-90 transition-transform' 
                onClick={() => setIsOpen(!isOpen)} 
              />

              {/* Profile Dropdown Menu */}
              {isOpen && (
                <div className="absolute top-10 right-0 z-50 w-44 bg-slate-800 shadow-2xl rounded-2xl border border-slate-700 p-2">
                  <div className='flex justify-end p-1'>
                    <MdClose onClick={() => setIsOpen(false)} className='text-xl text-slate-400 hover:text-white cursor-pointer' />
                  </div>
                  <ul className="space-y-1">
                    <li onClick={handleProfile} className="px-4 py-2 text-base hover:bg-slate-700 cursor-pointer text-white rounded-xl">
                      Profile
                    </li>
                    {user ? (
                      <li onClick={handleLogout} className="px-4 py-2 text-base hover:bg-red-500/10 cursor-pointer text-red-500 rounded-xl">
                        LogOut
                      </li>
                    ) : (
                      <Link to='/Signup' onClick={() => setIsOpen(false)}>
                        <li className="px-4 py-2 text-base hover:bg-slate-700 cursor-pointer text-white rounded-xl">Sign Up</li>
                      </Link>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. Mobile Sidebar Menu (Overlay) */}
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className={`w-64 bg-slate-900 h-full p-6 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={(e) => e.stopPropagation()} // Sidebar par click karne se band na ho
          >
            <div className='flex justify-between items-center mb-10'>
              <div className='text-2xl font-bold text-white'>Cou<span className='text-emerald-500'>rser</span></div>
              <MdClose className='text-white text-3xl cursor-pointer' onClick={() => setIsMobileMenuOpen(false)} />
            </div>
            
            <ul className='flex flex-col space-y-6 text-white text-lg font-medium'>
              <Link to='/' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-emerald-400'>Home</Link>
              <Link to='/About' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-emerald-400'>About</Link>
              <Link to='/courses' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-emerald-400'>Courses</Link>
              <Link to='/Contact' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-emerald-400'>Contact</Link>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar