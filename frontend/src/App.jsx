import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import Contact from './pages/Contact'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyCourses from './pages/MyCourses'
import Cart from './pages/Cart'
import AdminPanel from './pages/AdminPanel'
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
    <Toaster position='top-center' reverseOrder={false} />
    <Navbar />
    {/* <Home /> */}
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/About' element={<About/>} />
      <Route path='/courses' element={<Courses/>} />
      <Route path='/CourseDetail/:id' element={<CourseDetail/>} />
      <Route path='/Contact' element={<Contact/>} />
      <Route path='/Login' element={<Login/>} />
      <Route path='/Signup' element={<Signup/>} />
      <Route path='/MyCourses' element={<MyCourses/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/adminPanel' element={<AdminPanel/>} />
    </Routes>
    </>
  )
}

export default App