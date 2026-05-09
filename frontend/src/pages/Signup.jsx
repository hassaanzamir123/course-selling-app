import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Basic Front-end Validation
    if (!user.name || !user.email || !user.password) {
      return toast.error("Fill all Fields Please!");
    }

    setLoading(true);
    const toastId = toast.loading('Creating account...'); 

    try {
      
      const res = await axios.post('https://courserbackend-n6250f72.b4a.run/register', user);
      
      toast.success(`Welcome , ${user.name}! 🚀`, { id: toastId });
      localStorage.setItem('user', JSON.stringify(res.data));
      
      setLoading(false);
      setTimeout(() => navigate('/'), 1500);

    } catch (err) {
      setLoading(false); 
      
      const errorMessage = err.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage, { id: toastId });
      
      console.log("Error Details:", err.response?.data);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-zinc-100'>

        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-zinc-900'>Create Account</h2>
          <p className='text-zinc-500 mt-2'>Start your learning journey today</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-zinc-700 mb-1'>Full Name</label>
            <input 
              onChange={handleChange}
              name='name'
              type="text" 
              placeholder="John Doe" 
              className='w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-zinc-700 mb-1'>Email Address</label>
            <input 
              onChange={handleChange}
              name='email'
              type="email" 
              placeholder="name@company.com" 
              className='w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-zinc-700 mb-1'>Password</label>
            <input 
              onChange={handleChange}
              name='password'
              type="password" 
              placeholder="••••••••" 
              className='w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-emerald-500 transition-all'
            />
          </div>

          <button 
            disabled={loading}
            type="submit"
            className={`w-full font-bold py-3 rounded-xl transition duration-300 shadow-md ${loading ? 'bg-zinc-400 cursor-not-allowed' : 'bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-white active:scale-95'}`}
          >
            {loading ? "Please wait..." : "Sign Up"}
          </button>
        </form>

        <div className='mt-6 text-center text-sm text-zinc-600'>
          Already have an account?{' '}
          <Link to="/login" className='text-emerald-600 font-semibold hover:underline'>
            Log in
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Signup