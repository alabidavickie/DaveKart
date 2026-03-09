import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUsers, setCurrentUser } from '../utils/db';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (email === 'admin@davekart.com' && password === 'admin') {
      setCurrentUser({ email, role: 'admin' });
      navigate('/admin');
      return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser({ email, role: 'user' });
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-transparent px-4 py-8">
      <div className="max-w-md w-full p-8 bg-gray-900 rounded-lg shadow-md border border-gray-700">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Sign in to your DaveKart account</p>
        </div>
        
        {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded text-sm font-medium">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              className="w-full px-4 py-3 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-gray-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              className="w-full px-4 py-3 rounded border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-gray-500 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition-colors uppercase tracking-wider"
          >
            Sign In
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-white font-bold hover:underline">Create one now</Link>
        </p>
        <p className="mt-4 text-center text-xs text-gray-600">
          Admin Login:<br/> admin@davekart.com / admin
        </p>
      </div>
    </div>
  );
};

export default Login;
