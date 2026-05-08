import React, { useState, useRef } from 'react';
import Footer from '../components/Footer.jsx';
import { IoMdMail } from "react-icons/io";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "How long is the access?", a: "Lifetime access! Learn at your own pace." },
    { q: "Is there a certificate?", a: "Yes, you'll get a certificate upon completion." },
    { q: "Are the projects included in the courses real-world based?", a: "Yes, every course features hands-on projects that simulate real-world industry scenarios." },
    { q: "Do I need any prior experience before starting a course?", a: "We have courses ranging from absolute beginner to advanced levels." },
    { q: "Is there a discount for purchasing multiple courses?", a: 'We frequently offer bundle discounts.' },
    { q: "Will I get help with job placements or resumes?", a: "Our Premium Pro courses include resume reviews and mock interview sessions." }
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    // Using your provided IDs
    emailjs.sendForm(
      'service_6wrrtir',   
      'template_5mo5vla',  
      form.current, 
      'J-9vxueD-ZNrA3tCg'    
    )
    .then(() => {
      toast.success('Email sent ✅');
      form.current.reset();
    })
    .catch((err) => {
      toast.error('Something went wrong. ❌');
      console.log(err);
    })
    .finally(() => setLoading(false));
  };

  return (
    <>
      <div className='min-h-screen bg-white'>
        <div className='max-w-7xl mx-auto px-4 md:px-10 lg:px-20'>
          
          <h1 className='text-center text-3xl md:text-4xl font-bold my-10 text-zinc-800'>Get In Touch</h1>
          
          <div className='flex flex-col lg:flex-row justify-between items-start gap-10 mt-10'>
            
            {/* ----------------- LEFT: Info ----------------- */}
            <div className='w-full lg:w-1/2 italic shadow-lg p-6 md:p-8 rounded-2xl text-zinc-700 border border-zinc-50'>
              <h1 className='text-xl font-semibold'>Our info :</h1>
              <ul className='space-y-4'>
                <li className='hover:scale-105 mt-4 cursor-pointer flex items-center space-x-3 transition-transform'>
                  <IoMdMail className='text-emerald-500' /> 
                  <h1 className='text-sm md:text-base'>Email us: abcd@gmail.com</h1>
                </li>
                <li className='hover:scale-105 flex cursor-pointer items-center space-x-3 transition-transform'>
                  <FaPhoneSquareAlt className='text-emerald-500' />
                  <h1 className='text-sm md:text-base'>Our Phone Number : 0321 3942433253</h1>
                </li>
                <li className='hover:scale-105 cursor-pointer flex items-center space-x-3 transition-transform'>
                  <FaLocationDot className='text-emerald-500 flex-shrink-0' />
                  <h1 className='text-sm md:text-base'>Headquarters: Fully Remote (Rawalpindi, Pakistan)</h1>
                </li> 
              </ul>
            </div>

            {/* ----------------- RIGHT: Form (FIXED) ----------------- */}
            <div className='w-full lg:w-[450px] bg-zinc-100 p-6 md:p-8 rounded-2xl flex flex-col'>
              <h1 className='text-center font-semibold text-xl mb-4'>Contact Us</h1>
              
              <form ref={form} onSubmit={sendEmail} className='flex flex-col space-y-4'>
                <input 
                  name="from_name" 
                  required 
                  className='outline-none border border-zinc-200 focus:border-emerald-500 p-3 w-full rounded-xl bg-white' 
                  type="text" 
                  placeholder='Enter your Name' 
                />
                
                <input 
                  name="reply_to" 
                  required  
                  className='outline-none border border-zinc-200 focus:border-emerald-500 p-3 w-full rounded-xl bg-white' 
                  type="email" 
                  placeholder='Enter your Email' 
                />
                
                <textarea 
                  name="message" 
                  required 
                  className='outline-none border border-zinc-200 focus:border-emerald-500 p-3 w-full rounded-xl bg-white min-h-[100px]' 
                  placeholder='Message'
                ></textarea>

                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full p-3 rounded-xl text-white font-semibold transition-all shadow-md 
                    ${loading 
                      ? 'bg-zinc-400 cursor-not-allowed' 
                      : 'bg-emerald-500 hover:bg-emerald-600 active:scale-95 cursor-pointer'
                    }`}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </form>
            </div>
          </div>

          {/* ----------------- BOTTOM: FAQ ----------------- */}
          <div className='italic shadow-lg p-6 md:p-8 rounded-2xl mt-20 mb-20 text-zinc-700 border border-zinc-50'>
            <h1 className='text-xl md:text-2xl font-bold mb-6'>Frequently Asked Questions</h1>
            <div className='divide-y divide-zinc-100'>
              {faqs.map((question, index) => (
                <div className='py-4' key={index}>
                  <h1 
                    onClick={() => { setOpenIndex(index === openIndex ? null : index) }} 
                    className='font-semibold cursor-pointer flex items-center hover:text-emerald-600 transition-colors'
                  >
                    <span className='mr-2'>{openIndex === index ? '🔼' : '🔽'}</span> 
                    Question : {question.q}
                  </h1>
                  
                  {openIndex === index && (
                    <div className='mt-3 pl-8 text-zinc-600 animate-in fade-in slide-in-from-top-1 duration-300'>
                      <span className='font-bold text-emerald-600'>Answer : </span> {question.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;