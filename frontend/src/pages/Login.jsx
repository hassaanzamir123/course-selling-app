import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // useNavigate add kiya
import axios from 'axios'
import toast from 'react-hot-toast' // 1. Toast import kiya

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    // Basic validation
    if (!user.email || !user.password) {
      return toast.error("Please enter both email and password! 🔑");
    }

    // 2. Toast Promise setup
    const loginPromise = axios.post('http://localhost:9000/login', user);

    toast.promise(loginPromise, {
      loading: 'Logging you in... 🚀',
      success: (res) => {
        if (res.data.status === "success") {
          localStorage.setItem("token", res.data.token);
          
          // Agar aap user ka data bhi save karna chahte hain
          if(res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }

          setTimeout(() => navigate('/'), 1500); // Redirect after short delay
          return "Login Successful! Welcome back. 🎉";
        } else {
          throw new Error("Login failed"); // Success block mein agar status success na ho
        }
      },
      error: (err) => {
        // Backend ka error message dikhane ke liye
        return err.response?.data?.message || "Invalid credentials! ❌";
      }
    });
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-zinc-100'>
        
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-zinc-900'>Welcome Back</h2>
          <p className='text-zinc-500 mt-2'>Login to access your courses</p>
        </div>

        <div className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-zinc-700 mb-1'>Email Address</label>
            <input 
              onChange={handleChange}
              name='email'
              type="email" 
              placeholder="name@example.com" 
              className='w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-zinc-700 mb-1'>Password</label>
            <input 
              name='password'
              onChange={handleChange}
              type="password" 
              placeholder="••••••••" 
              className='w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all'
            />
          </div>

          <button 
            onClick={handleSubmit}
            className='w-full bg-zinc-900 focus:scale-95 cursor-pointer text-white font-bold py-3 rounded-xl hover:bg-zinc-800 transition duration-300 shadow-md active:scale-95'
          >
            Log In
          </button>

        </div>

        <div className='mt-8 text-center text-sm text-zinc-600'>
          Don't have an account?{' '}
          <Link to="/signup" className='text-emerald-600 font-semibold hover:underline'>
            Sign up
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Login