import Link from 'next/link';
import Image from 'next/image';
import { getClubs } from '@/lib/club';

export const dynamic = 'force-dynamic';

export default function Home() {
  const clubs = getClubs();

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">UnionPost</Link>
          <div className="flex gap-6">
            <Link href="/login" className="text-gray-700 hover:text-green-600 font-medium">Login</Link>
            <Link href="/signup" className="bg-green-600 text-white px-5 py-2 rounded-full font-medium hover:bg-green-700 transition">Register Club</Link>
          </div>
        </div>
      </nav>

      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Connect with Your Club</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto">The community platform for football clubs to share stats, results, and engage with fans</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 -mt-16 relative z-20">
        <div className="grid gap-6 md:grid-cols-3 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-green-500">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Track Stats</h3>
            <p className="text-gray-600">Keep your standings, match results, and performance metrics in one place.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-green-500">
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Share News</h3>
            <p className="text-gray-600">Post updates, results, and engage with your community directly.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-green-500">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Build Community</h3>
            <p className="text-gray-600">Create a home for your club's digital presence and fan engagement.</p>
          </div>
        </div>

        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Featured Clubs</h2>
        </div>
        
        {clubs.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-gray-500 mb-4">No clubs yet. Be the first to join!</p>
            <Link href="/signup" className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition">Register Your Club</Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {clubs.map(club => (
              <Link 
                key={club.id} 
                href={`/${club.slug}`}
                className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-40 bg-gradient-to-r from-green-400 to-green-600 overflow-hidden">
                  {club.banner_image ? (
                    <img src={club.banner_image} alt={club.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-white/30">{club.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition">{club.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">Click to view stats →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-2xl font-bold text-green-500 mb-2">UnionPost</p>
          <p className="text-gray-400">The platform for football clubs</p>
        </div>
      </footer>
    </div>
  );
}