import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="card flex flex-col">
      <img src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'} alt={product.name} className="rounded-xl h-48 object-cover" />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold">₹{product.price}</span>
        <div className="flex gap-2">
          <button className="btn bg-gray-100" onClick={() => addToCart(product)}>Add</button>
          <Link className="btn bg-blue-600 text-white" to={`/product/${product._id}`}>View</Link>
        </div>
      </div>
    </div>
  )
}
