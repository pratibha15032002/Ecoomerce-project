import React, { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const res = await fetch(`${API}${url}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await res.json();
    setResult(data);
    if (data.token) localStorage.setItem('token', data.token);
  };

  return (
    <div className="card max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">{isLogin ? 'Login' : 'Create Account'}</h2>
      <form className="space-y-3" onSubmit={submit}>
        {!isLogin && (
          <input className="w-full border p-2 rounded" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        )}
        <input className="w-full border p-2 rounded" placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="btn bg-blue-600 text-white w-full">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <button className="mt-3 text-sm" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "New here? Create an account" : "Have an account? Login"}
      </button>
      {result && <pre className="mt-3 text-xs bg-gray-100 p-2 rounded overflow-auto">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
