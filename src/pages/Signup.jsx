import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUsers, setUsers, setCurrentUser } from '../utils/db';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    const users = getUsers();
    
    if (users.find(u => u.email === email)) {
      setError('An account with this email already exists.');
      return;
    }
    
    const newUser = { id: Date.now().toString(), email, password, role: 'user' };
    setUsers([...users, newUser]);
    setCurrentUser({ email, role: 'user' });
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-transparent px-4 py-8">
      <div className="max-w-md w-full p-8 bg-gray-900 rounded-lg shadow-md border border-gray-700">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
          <p className="text-gray-400 mt-2">Join DaveKart to start shopping</p>
        </div>
        
        {error && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded text-sm font-medium">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-6">
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
              placeholder="Create a secure password"
              minLength="6"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-white text-black py-3 rounded font-bold hover:bg-gray-200 transition-colors uppercase tracking-wider"
          >
            Create Account
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
