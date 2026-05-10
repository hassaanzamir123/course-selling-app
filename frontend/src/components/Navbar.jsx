import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdManageAccounts, MdClose, MdMenu } from "react-icons/md"
import { HiMiniShoppingCart } from "react-icons/hi2"
import { CartContext } from '../context/CartContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false) // Profile dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Mobile sidebar
  
  const { cart } = useContext(CartContext)
  const navigate = useNavigate()

  // User parsing logic
  const savedUser = localStorage.getItem('user')
  let user = null
  try {
    user = (savedUser && savedUser !== "undefined") ? JSON.parse(savedUser) : null
  } catch (error) {
    user = null
  }

  const handleProfileClick = () => {
    setIsOpen(false)
    if (user) {
      navigate('/adminPanel') // Agar logged in hai toh adminPanel
    } else {
      navigate('/Login') // Agar logged in nahi hai toh Login/SignIn page
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setIsOpen(false)
    navigate('/')
    window.location.reload() 
  }

  return (
    <>
      <div className='sticky top-0 z-[100] w-full shadow-md'>
        <div className='flex p-4 bg-slate-900 justify-between items-center px-4 md:px-8'>
          
          {/* Left Side: Hamburger & Logo */}
          <div className='flex items-center gap-4'>
            <button 
              className='md:hidden text-white text-3xl cursor-pointer focus:outline-none' 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MdMenu />
            </button>
            <Link to='/' className='text-xl md:text-2xl font-bold text-white tracking-tight'>
              Cou<span className='text-emerald-500'>rser</span>
            </Link>
          </div>

          {/* Middle: Desktop Links */}
          <nav className='hidden md:flex'>
            <ul className='flex space-x-8 text-white font-medium'>
              <li><Link to='/' className='hover:text-emerald-400 transition-colors'>Home</Link></li>
              <li><Link to='/About' className='hover:text-emerald-400 transition-colors'>About</Link></li>
              <li><Link to='/courses' className='hover:text-emerald-400 transition-colors'>Courses</Link></li>
              <li><Link to='/Contact' className='hover:text-emerald-400 transition-colors'>Contact</Link></li>
            </ul>
          </nav>

          {/* Right Side: Cart & Profile */}
          <div className='flex items-center gap-4 md:gap-6 text-white text-2xl md:text-3xl'>
            
            <Link to='/cart' className='relative active:scale-90 transition-transform'>
              <HiMiniShoppingCart className='hover:text-emerald-400 transition-colors' />
              {cart.length > 0 && (
                <span className='absolute -right-2 -top-1 rounded-full text-[10px] bg-emerald-500 px-1.5 py-0.5 font-bold animate-pulse'>
                  {cart.length}
                </span>
              )}
            </Link>
            
            <div className='relative'>
              {/* Dynamic Icon: Open hone par Cross (MdClose) dikhayega */}
              {isOpen ? (
                <MdClose 
                  className='text-emerald-500 cursor-pointer active:scale-90 transition-transform' 
                  onClick={() => setIsOpen(false)} 
                />
              ) : (
                <MdManageAccounts 
                  className='hover:text-emerald-400 cursor-pointer active:scale-90 transition-transform' 
                  onClick={() => setIsOpen(true)} 
                />
              )}

              {isOpen && (
                <div className="absolute top-12 right-0 z-50 w-48 bg-slate-800 shadow-2xl rounded-2xl border border-slate-700 p-2 overflow-hidden transform origin-top-right transition-all animate-in fade-in zoom-in duration-200">
                  <ul className="flex flex-col text-sm">
                    {/* Vertical Option 1: Profile/Admin */}
                    <li 
                      onClick={handleProfileClick} 
                      className="px-4 py-3 hover:bg-slate-700 cursor-pointer text-white rounded-xl transition-colors font-medium"
                    >
                      My Profile
                    </li>

                    {/* Vertical Option 2: Signup or Logout */}
                    {!user ? (
                      <li 
                        onClick={() => {navigate('/Signup'); setIsOpen(false)}} 
                        className="px-4 py-3 hover:bg-slate-700 cursor-pointer text-white rounded-xl transition-colors font-medium border-t border-slate-700"
                      >
                        Sign Up
                      </li>
                    ) : (
                      <li 
                        onClick={handleLogout} 
                        className="px-4 py-3 hover:bg-red-500/20 cursor-pointer text-red-500 rounded-xl transition-colors border-t border-slate-700 font-bold"
                      >
                        Log Out
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Menu (Same as before) */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className={`w-72 bg-slate-900 h-full p-6 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-12'>
              <div className='text-2xl font-bold text-white'>Cou<span className='text-emerald-500'>rser</span></div>
              <MdClose className='text-white text-3xl cursor-pointer hover:text-red-400' onClick={() => setIsMobileMenuOpen(false)} />
            </div>
            
            <nav>
              <ul className='flex flex-col space-y-6 text-white text-lg font-medium'>
                <Link to='/' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-emerald-400 border-b border-slate-800 pb-2'>Home</Link>
                <Link to='/About' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-emerald-400 border-b border-slate-800 pb-2'>About</Link>
                <Link to='/courses' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-emerald-400 border-b border-slate-800 pb-2'>Courses</Link>
                <Link to='/Contact' onClick={() => setIsMobileMenuOpen(false)} className='hover:text-emerald-400 border-b border-slate-800 pb-2'>Contact</Link>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar