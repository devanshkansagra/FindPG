import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [role, setRole] = useState('tenant');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    const data = { role, name, email, phone, password };
    const res = await fetch(import.meta.env.VITE_SERVER_ORIGIN + '/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (res.ok && res.status === 201) {
      navigate('/');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Logo / Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600 text-white text-2xl font-bold">
            FP
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-sm text-gray-500">Sign up to get started with FindPG</p>
        </div>

        {/* Role Toggle Chips */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setRole('tenant')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              role === 'tenant'
                ? 'bg-red-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tenant
          </button>
          <button
            onClick={() => setRole('agent')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              role === 'agent'
                ? 'bg-red-600 text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Agent
          </button>
        </div>

        {/* Signup Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              placeholder="98765 43210"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2.5 rounded-md font-medium hover:bg-red-700 transition"
            onClick={handleSignup}
          >
            Sign up as {role === 'tenant' ? 'Tenant' : 'Agent'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-red-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
