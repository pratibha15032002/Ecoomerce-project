import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { cart } = useCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">ShopLite</Link>
        <div className="flex gap-4 items-center">
          <Link to="/login">Login</Link>
          <Link to="/cart" className="relative">
            Cart
            <span className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded-full">{total}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
