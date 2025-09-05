import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then(r => r.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(p => <ProductCard key={p._id} product={p} />)}
    </div>
  )
}
