import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // 1. Toast Import

const Cart = () => {
  const { cart, removeFromCart, purchaseCart } = useContext(CartContext);
  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);
  const navigate = useNavigate();

  // --- Handlers with Toasts ---

  const handleRemove = (id, title) => {
    removeFromCart(id);
    toast.success(`${title} removed from cart`, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      return toast.error("Your cart is empty! 🛒");
    }

    // Checkout process
    purchaseCart(); 
    
    // Success Toast
    toast.success("Purchase Successful! Redirecting to your courses... 🎓", {
      duration: 3000,
      icon: '✅',
    });

    // Redirect after a short delay
    setTimeout(() => {
      navigate('/MyCourses');
    }, 2000);
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div id='cart' className='max-w-6xl mx-auto px-6'>
        
        <h1 className='text-3xl font-bold text-zinc-900 mb-8'>Shopping Cart</h1>

        <div className='flex flex-col lg:flex-row gap-10'>
          
          {/* Left Side: Items List */}
          <div className='flex-1 space-y-4'>
            {cart.length === 0 ? (
              <div className='bg-white p-10 rounded-3xl text-center shadow-sm border border-zinc-100'>
                <h1 className='text-zinc-400 text-xl italic'>Your cart is empty 🛒</h1>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className='flex items-center gap-6 bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-shadow'>
                  
                  <img 
                    className='h-20 w-20 rounded-full object-cover border-2 border-emerald-50 shadow-sm shrink-0' 
                    src={item.image} 
                    alt={item.title} 
                  />
                  
                  <div className='flex-1'>
                    <h3 className='font-bold text-zinc-800 text-lg leading-tight'>{item.title}</h3>
                    <p className='text-sm text-emerald-600 font-medium'>{item.category}</p>
                  </div>

                  <div className='text-right'>
                    <p className='font-bold text-zinc-900 text-lg'>${item.price}</p>
                    <button 
                      onClick={() => handleRemove(item._id, item.title)} // Custom handler use kiya
                      className='text-red-400 cursor-pointer text-xs font-semibold hover:text-red-600 transition-colors mt-1 uppercase tracking-wider'
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side: Summary */}
          <div className='lg:w-80'>
            <div className='bg-white p-6 rounded-3xl border border-zinc-100 shadow-xl sticky top-24'>
              <h2 className='text-xl font-bold text-zinc-800 mb-6'>Order Summary</h2>
              
              <div className='space-y-4 pb-6 border-b border-zinc-50'>
                <div className='flex justify-between text-zinc-500 font-medium'>
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-zinc-500 font-medium'>
                  <span>Discounts</span>
                  <span className='text-emerald-600'>-$0.00</span>
                </div>
              </div>

              <div className='flex font-semibold justify-between py-6 text-2xl text-zinc-900'>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button 
                onClick={handleCheckout} // Custom handler use kiya
                disabled={cart.length === 0}
                className='w-full cursor-pointer active:scale-95 bg-emerald-600 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200'
              >
                Checkout Now
              </button>
              
              <div className='flex items-center justify-center gap-2 mt-6'>
                <span className='h-2 w-2 bg-emerald-500 rounded-full animate-pulse'></span>
                <p className='text-[10px] text-zinc-400 font-bold uppercase tracking-widest'>
                  Secure SSL Encryption
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;