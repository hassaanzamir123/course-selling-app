import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    // 1. Cart State
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    // 2. Purchased Courses State
    const [myCourses, setMyCourses] = useState(() => {
        const savedPurchased = localStorage.getItem('purchasedCourses')
        return savedPurchased ? JSON.parse(savedPurchased) : []
    })

    // Update LocalStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        localStorage.setItem('purchasedCourses', JSON.stringify(myCourses))
    }, [myCourses])

    // --- Actions ---

    const AddToCart = (item) => {
        setCart((prev) => {
            const isExist = prev.find(i => i._id === item._id) 
            if (isExist) return prev; // Toast MyCourses page se handle ho jayega
            return [...prev, item]
        })
    }

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter(item => item._id !== id))
    }

    const purchaseCart = () => {
        if (cart.length === 0) return;
        setMyCourses((prev) => [...prev, ...cart]);
        setCart([]);
    }

    // ⭐ YE WALA FUNCTION MISSING THA
    const removeFromMyCourses = (id) => {
        setMyCourses((prev) => prev.filter(course => course._id !== id));
    }

    return (
        // Value mein 'removeFromMyCourses' add kar diya hai
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