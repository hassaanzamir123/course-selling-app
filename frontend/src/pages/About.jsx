import React from 'react'
import Footer from '../components/Footer'

const About = () => {
  // Team array agar aap future mein expand karna chahein
  const team = [
    { name: "Hassaan Zamir", role: "Founder & Lead Developer", img: "https://via.placeholder.com/150" },
    { name: "Ali Ahmed", role: "Backend Architect", img: "https://via.placeholder.com/150" },
    { name: "Sara Khan", role: "UI/UX Specialist", img: "https://via.placeholder.com/150" }
  ]

  return (
    <div className='bg-white'>
      {/* 1. Hero Section */}
      <section className='py-24 bg-slate-900 text-white text-center px-4'>
        <h1 className='text-4xl md:text-6xl font-extrabold mb-6 tracking-tight'>
          Empowering Creators Through <br /> 
          <span className='text-emerald-400'>Modern Code</span>
        </h1>
        <p className='max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light leading-relaxed'>
          "Our mission is to bridge the gap between academic theory and industry reality by providing project-based learning."
        </p>
      </section>

      {/* 2. Stats Section */}
      <section className='py-16 bg-white border-b'>
        <div className='max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center'>
          <div className='space-y-2'>
            <h2 className='text-5xl font-bold text-emerald-600'>5K+</h2>
            <p className='text-slate-500 font-medium uppercase text-sm tracking-widest'>Active Students</p>
          </div>
          <div className='space-y-2'>
            <h2 className='text-5xl font-bold text-emerald-600'>120+</h2>
            <p className='text-slate-500 font-medium uppercase text-sm tracking-widest'>Courses</p>
          </div>
          <div className='space-y-2'>
            <h2 className='text-5xl font-bold text-emerald-600'>98%</h2>
            <p className='text-slate-500 font-medium uppercase text-sm tracking-widest'>Success Rate</p>
          </div>
          <div className='space-y-2'>
            <h2 className='text-5xl font-bold text-emerald-600'>24/7</h2>
            <p className='text-slate-500 font-medium uppercase text-sm tracking-widest'>Support</p>
          </div>
        </div>
      </section>

      {/* 3. Our Vision Section */}
      <section className='max-w-6xl mx-auto px-4 py-24 flex flex-col md:flex-row items-center gap-20'>
        <div className='md:w-1/2 space-y-6'>
          <h2 className='text-4xl font-bold text-slate-800'>Our Vision</h2>
          <div className='w-20 h-1.5 bg-emerald-500 rounded-full'></div>
          <p className='text-slate-600 text-lg leading-relaxed'>
            We believe that high-quality tech education should be accessible to everyone, regardless of their background. Our platform focuses on <strong>Logic Building</strong> and <strong>Practical Implementation</strong> rather than just rote memorization.
          </p>
          <p className='text-slate-600 text-lg leading-relaxed'>
            Every course we design is packed with real-world scenarios, ensuring that our students are job-ready from day one.
          </p>
        </div>
        <div className='md:w-1/2 bg-slate-50 p-12 rounded-[2rem] border-l-8 border-emerald-500 shadow-sm'>
          <p className='text-2xl text-slate-700 italic font-medium leading-snug'>
            "Stop watching tutorials. Start building products. We don't just teach code; we teach how to solve problems."
          </p>
        </div>
      </section>

      {/* 4. Founder Section */}
      <section className='bg-slate-50 py-24 px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold text-slate-800'>Behind the Platform</h2>
            <p className='text-slate-500 mt-4'>Meet the developer dedicated to your success.</p>
          </div>
          
          <div className='bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-12'>
            {/* Founder Image */}
            <div className='w-48 h-48 md:w-64 md:h-64 bg-slate-100 rounded-2xl overflow-hidden border-4 border-white ring-4 ring-emerald-100 shadow-xl flex-shrink-0'>
               <img 
                 src="https://via.placeholder.com/300" // 👈 Apni real image ka URL yahan dalein
                 alt="Hassaan Zamir" 
                 className='w-full h-full object-cover'
               />
            </div>

            {/* Founder Bio */}
            <div className='text-center md:text-left space-y-4'>
              <h3 className='text-3xl font-bold text-slate-800'>Hassaan Zamir</h3>
              <p className='text-emerald-600 font-semibold text-lg'>Lead Developer & Instructor</p>
              <p className='text-slate-600 leading-relaxed'>
                I am a full-stack developer with a passion for building scalable web applications and teaching others how to do the same. I started this platform to simplify complex coding concepts and provide a roadmap for aspiring developers in our community.
              </p>
              <div className='flex justify-center md:justify-start gap-6 pt-4'>
                {/* 👈 Apne real social links yahan dalein */}
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className='text-slate-400 hover:text-emerald-500 transition-colors font-medium'>LinkedIn</a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className='text-slate-400 hover:text-emerald-500 transition-colors font-medium'>GitHub</a>
                <a href="#" className='text-slate-400 hover:text-emerald-500 transition-colors font-medium'>Portfolio</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About