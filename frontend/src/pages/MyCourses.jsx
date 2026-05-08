import React, { useContext, useState } from 'react'; // useState add kiya
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Footer from '../components/Footer';
import ReactPlayer from 'react-player';
import { MdLibraryBooks, MdAddCircleOutline, MdPlayCircleOutline, MdDeleteOutline, MdClose } from "react-icons/md"; 
import toast from 'react-hot-toast';

const MyCourses = () => {
  const { myCourses, removeFromMyCourses } = useContext(CartContext);
  const [playingVideo, setPlayingVideo] = useState(null); // Video URL state

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      removeFromMyCourses(id);
      toast.success("Course removed from your learning path! 🗑️");
    }
  };

  return (
    <div className='min-h-screen flex flex-col bg-zinc-50'>
      
      {/* --- Mobile Header --- */}
      <div className='md:hidden bg-slate-900 p-4 flex justify-between items-center text-white sticky top-0 z-50 shadow-md'>
        <div className='flex items-center gap-2'>
          <div className='w-6 h-6 bg-emerald-500 rounded-md'></div>
          <h2 className='font-bold text-lg'>Admin Hub</h2>
        </div>
      </div>

      <div className='flex flex-1 flex-col md:flex-row'>
        
        {/* Sidebar */}
        <div className='w-64 bg-slate-900 hidden md:flex flex-col p-6 shadow-xl sticky top-0 h-screen'>
          <div className='flex items-center gap-2 mb-10'>
            <div className='w-8 h-8 bg-emerald-500 rounded-lg'></div>
            <h2 className='text-white font-bold text-xl'>Admin Hub</h2>
          </div>
          
          <ul className='space-y-2 flex-1'>
            <Link to='/adminPanel' className='flex items-center gap-3 text-zinc-400 hover:text-white p-3 rounded-xl transition-all hover:bg-slate-800'>
              <MdAddCircleOutline size={22}/> Add New Course
            </Link>
            <li className='flex items-center gap-3 bg-emerald-500/10 text-emerald-500 p-3 rounded-xl font-semibold cursor-pointer'>
              <MdLibraryBooks size={22}/> My Courses
            </li>
          </ul>
        </div>

        {/* Right Side Content Area */}
        <div className='flex-1 flex flex-col'>
          
          <div className='flex-1 p-4 md:p-12'>
            <div className='max-w-6xl mx-auto'>
              
              <header className='mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4'>
                <div>
                    <h1 className='text-2xl md:text-3xl font-bold text-zinc-800'>My Learning Path</h1>
                    <p className='text-zinc-500 mt-1 text-sm md:text-base'>Access all your enrolled courses and continue your progress.</p>
                </div>
                <div className='bg-white px-4 py-2 rounded-full border border-zinc-200 text-sm font-bold text-zinc-600 shadow-sm'>
                    Total: {myCourses.length} Courses
                </div>
              </header>

              {/* Course Grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {myCourses.length === 0 ? (
                  <div className='col-span-full py-16 md:py-20 text-center bg-white rounded-[1.5rem] md:rounded-[2rem] border border-dashed border-zinc-300 mx-2'>
                    <p className='text-zinc-500 text-base md:text-lg px-4'>No courses yet. Start your learning journey today!</p>
                    <Link to="/courses" className='inline-block mt-4 text-emerald-600 font-bold hover:underline'>Browse Courses</Link>
                  </div>
                ) : (
                  myCourses.map((item, index) => (
                    <div key={index} className='bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-sm border border-zinc-100 hover:shadow-xl transition-all duration-300 group mx-auto w-full max-w-sm md:max-w-none relative'>
                      
                      {/* Delete Action Overlay Button */}
                      <button 
                        onClick={() => handleDelete(item._id, item.title)}
                        className='absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md opacity-0 group-hover:opacity-100 cursor-pointer'
                        title="Remove Course"
                      >
                        <MdDeleteOutline size={20} />
                      </button>

                      <div className='relative cursor-pointer' onClick={() => setPlayingVideo(item.videoUrl)}>
                        <img src={item.image} className='w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500' alt="course" />
                        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                            <MdPlayCircleOutline size={50} className='text-white drop-shadow-lg' />
                        </div>
                      </div>
                      
                      <div className='p-5 md:p-6'>
                        <h3 className='font-bold text-zinc-800 text-base md:text-lg mb-4 line-clamp-1'>{item.title}</h3>
                        
                        {/* Progress Bar */}
                        <div className='space-y-3'>
                          <div className='flex justify-between text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-wider'>
                            <span>Course Progress</span>
                            <span className='text-emerald-600'>45%</span>
                          </div>
                          <div className='w-full bg-zinc-100 h-1.5 md:h-2 rounded-full overflow-hidden'>
                            <div className='bg-emerald-500 h-full w-[45%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]'></div>
                          </div>
                        </div>

                        <button 
                          onClick={() => setPlayingVideo(item.videoUrl)}
                          className='w-full mt-5 md:mt-6 bg-slate-900 text-white font-bold py-2.5 md:py-3 rounded-xl hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg text-sm md:text-base cursor-pointer flex items-center justify-center gap-2'
                        >
                          <MdPlayCircleOutline size={20}/> Continue Learning
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      {/* --- Video Modal (React Player) --- */}
      {playingVideo && (
        <div className='fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm'>
            <div className='relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10'>
                {/* Close Button */}
                <button 
                    onClick={() => setPlayingVideo(null)}
                    className='absolute -top-12 right-0 md:top-4 md:right-4 z-[70] bg-white/10 hover:bg-red-500 text-white p-2 rounded-full transition-all cursor-pointer'
                >
                    <MdClose size={24} />
                </button>

                {/* Player */}
                <ReactPlayer 
                    url={playingVideo} 
                    controls={true} 
                    playing={true}
                    width='100%' 
                    height='100%'
                />
            </div>
        </div>
      )}

      {/* --- Mobile Bottom Navigation --- */}
      <div className='md:hidden bg-white border-t border-zinc-200 p-2 flex justify-around items-center sticky bottom-0 z-50'>
          <Link to='/adminPanel' className='flex flex-col items-center text-zinc-400'>
            <MdAddCircleOutline size={24}/>
            <span className='text-[10px]'>Add Course</span>
          </Link>
          <div className='flex flex-col items-center text-emerald-500 font-bold'>
            <MdLibraryBooks size={24}/>
            <span className='text-[10px]'>My Courses</span>
          </div>
      </div>

    </div>
  );
};

export default MyCourses;