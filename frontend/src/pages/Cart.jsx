import React from 'react'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);

  const payNow = async () => {
  const res = await fetch(`${API}/api/payment/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: JSON.stringify({ amount: total })
  });
  const order = await res.json();
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    order_id: order.id,
    name: "ShopLite",
    description: "Order Payment",
    handler: function (response) {
      alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
    },
    theme: { color: "#3399cc" }
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};


  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      <ul className="space-y-3">
        {cart.map(item => (
          <li key={item._id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">Qty: {item.qty} • ₹{item.price}</p>
            </div>
            <button className="btn bg-gray-100" onClick={() => removeFromCart(item._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center">
        <span className="text-lg font-bold">Total: ₹{total}</span>
        <div className="flex gap-2">
          <button className="btn bg-gray-200" onClick={clearCart}>Clear</button>
          <button className="btn bg-green-600 text-white" onClick={payNow}>Pay with Razorpay</button>
        </div>
      </div>
    </div>
  )
}
