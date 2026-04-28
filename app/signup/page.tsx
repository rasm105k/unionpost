'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const res = await fetch('/api/clubs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, bannerImage })
    });
    
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Signup failed');
      return;
    }
    
    router.push(`/dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <nav className="bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">UnionPost</Link>
        </div>
      </nav>

      <div className="max-w-md mx-auto mt-16 p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Register Your Club</h1>
          <p className="text-gray-500 mb-8">Create your club's homepage</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Club Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner Image URL (optional)</label>
              <input
                type="url"
                value={bannerImage}
                onChange={e => setBannerImage(e.target.value)}
                placeholder="https://example.com/banner.jpg"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-400 mt-1">Paste a URL to an image for your club's banner</p>
            </div>
            
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition">
              Create Club
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-600">
            Already have a club? <Link href="/login" className="text-green-600 font-medium hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}