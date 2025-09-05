import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API}/api/products/${id}`).then(r => r.json()).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={product.image || 'https://via.placeholder.com/600x400'} className="rounded-xl w-full object-cover" />
      <div className="card">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-700 my-2">{product.description}</p>
        <p className="text-xl font-bold">₹{product.price}</p>
        <button className="btn bg-blue-600 text-white mt-4" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  )
}
