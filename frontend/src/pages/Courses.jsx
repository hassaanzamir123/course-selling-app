import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';

const Courses = () => {
    const [allcourses, setAllCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    // Categories list
    const categories = ["All", "Web Development", "App Development", "Graphic Designing", "Machine Learning", "Digital Marketing", "Data Science"];

    useEffect(() => {
        const getData = async () => {
            try {
                // ✅ Fixed: Manual URL replaced with environment variable
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-courses`);
                setAllCourses(res.data);
            } catch (err) {
                console.log("Error fetching courses", err);
            }
        };
        getData();
    }, []);

    // Filter logic constant takay code saaf rahay
    const filteredCourses = allcourses.filter((course) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
            course.title.toLowerCase().includes(lowerSearch) ||
            course.category.toLowerCase().includes(lowerSearch)
        );
    });

    return (
        <div className='min-h-screen bg-zinc-50'>
            <div className='max-w-[1400px] mx-auto px-4'>
                
                {/* Header Section */}
                <header className='pt-12 pb-8 text-center'>
                    <h1 className='text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight'>
                        Explore Our Courses
                    </h1>
                    <p className='text-zinc-500 mt-3 text-lg'>
                        Upgrade your skills with the best industry experts.
                    </p>
                </header>

                {/* ----------------------------- Modern Search Bar ------------------------------------------- */}
                <div className='max-w-2xl mx-auto mb-12'>
                    <div className='relative group'>
                        {/* Search Icon */}
                        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
                            <svg className="w-5 h-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        
                        {/* The Modern Input */}
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            type="text"
                            placeholder='Search by course name or category...'
                            className='w-full pl-12 pr-4 py-4 bg-white border border-zinc-200 rounded-2xl shadow-sm 
                                       outline-none transition-all duration-300
                                       hover:border-zinc-300
                                       focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:shadow-md'
                        />

                        {/* Clear Button */}
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm("")}
                                className='absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-red-500 transition-colors cursor-pointer'
                            >
                                <span className='text-[10px] font-bold bg-zinc-100 px-2 py-1 rounded-md uppercase'>Clear</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* ----------------------------- Main Content Layout ------------------------------------------- */}
                <div className='flex flex-col md:flex-row gap-8 pb-24'>

                    {/* --- Sidebar (Categories) --- */}
                    <aside className='w-full md:w-72 shrink-0'>
                        <div className='sticky top-24 bg-white border border-zinc-200 rounded-3xl p-5 shadow-sm'>
                            <h2 className='font-bold text-zinc-800 mb-4 px-2'>Categories</h2>
                            
                            <div className='flex flex-row md:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0'>
                                {categories.map((cat, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSearchTerm(cat === "All" ? "" : cat)}
                                        className={`whitespace-nowrap text-left px-4 py-3 rounded-xl transition-all text-sm font-semibold cursor-pointer ${
                                            (searchTerm === cat || (cat === "All" && searchTerm === ""))
                                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                                                : 'hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* --- Courses Grid --- */}
                    <main className='flex-1'>
                        {filteredCourses.length > 0 ? (
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {filteredCourses.map((course) => (
                                    <CourseCard key={course._id} data={course} />
                                ))}
                            </div>
                        ) : (
                            /* No Results State */
                            <div className='flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-zinc-100 shadow-sm'>
                                <div className='text-6xl mb-4'>🔭</div>
                                <h3 className='text-xl font-bold text-zinc-800'>No matches found</h3>
                                <p className='text-zinc-500 mt-2 text-center px-6'>
                                    Try adjusting your search or category to find what you're looking for.
                                </p>
                                <button 
                                    onClick={() => setSearchTerm("")}
                                    className='mt-6 text-emerald-600 font-bold hover:underline cursor-pointer'
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </main>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Courses;