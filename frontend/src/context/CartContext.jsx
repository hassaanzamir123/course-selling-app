import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    // 1. Cart State (LocalStorage se initial data uthana)
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    // 2. Purchased Courses State
    const [myCourses, setMyCourses] = useState(() => {
        const savedPurchased = localStorage.getItem('purchasedCourses')
        return savedPurchased ? JSON.parse(savedPurchased) : []
    })

    // --- Auto-Update LocalStorage jab bhi state change ho ---
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        localStorage.setItem('purchasedCourses', JSON.stringify(myCourses))
    }, [myCourses])

    // --- Actions ---

    // 1. Add to Cart Logic
    const AddToCart = (item) => {
        setCart((prev) => {
            // Check if item already in cart OR already purchased
            const inCart = prev.find(i => i._id === item._id);
            const isPurchased = myCourses.find(i => i._id === item._id);
            
            if (inCart || isPurchased) return prev; 
            return [...prev, item]
        })
    }

    // 2. Remove from Cart
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter(item => item._id !== id))
    }

    // 3. Purchase Logic (Cart -> MyCourses)
    const purchaseCart = () => {
        if (cart.length === 0) return;

        setMyCourses((prev) => {
            // Sirf wo items add karein jo pehle se purchased nahi hain (Safety check)
            const newCourses = cart.filter(cartItem => 
                !prev.some(purchasedItem => purchasedItem._id === cartItem._id)
            );
            return [...prev, ...newCourses];
        });
        
        setCart([]); // Cart khali kar do
    }

    // 4. Remove from MyCourses (Admin ya User cleanup ke liye)
    const removeFromMyCourses = (id) => {
        setMyCourses((prev) => prev.filter(course => course._id !== id));
    }

    return (
        <CartContext.Provider value={{ 
            cart, 
            myCourses, 
            AddToCart, 
            removeFromCart, 
            purchaseCart, 
            removeFromMyCourses 
        }}>
            {children}
        </CartContext.Provider>
    )
}