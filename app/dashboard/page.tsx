import { cookies } from 'next/headers';
import { getClubById } from '@/lib/club';
import { getMatches, getStandings } from '@/lib/match';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('club_session')?.value;
  
  if (!sessionId) {
    redirect('/login');
  }
  
  const club = await getClubById(parseInt(sessionId));
  if (!club) {
    redirect('/login');
  }
  
  const matches = await getMatches(club.id);
  const standings = await getStandings(club.id);
  const points = standings ? (standings.won * 3) + standings.drawn : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href={`/${club.slug}`} className="text-2xl font-bold text-green-600">UnionPost</Link>
          <div className="flex items-center gap-4">
            <Link href={`/${club.slug}`} className="text-gray-600 hover:text-green-600 font-medium">View Club Page</Link>
            <form action="/api/logout" method="POST">
              <button type="submit" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition">Logout</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="relative h-[200px] bg-gradient-to-r from-green-500 via-green-600 to-green-700 overflow-hidden">
        {club.banner_image ? (
          <img src={club.banner_image} alt={club.name} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20">
          <h1 className="text-4xl font-bold text-white">{club.name}</h1>
          <p className="text-green-200">Dashboard</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 -mt-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">📝</span> Add Match Result
              </h2>
              <form action="/api/matches" method="POST" className="space-y-4">
                <input type="hidden" name="clubId" value={club.id} />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opponent</label>
                    <input 
                      name="opponent" 
                      required 
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Match Date</label>
                    <input 
                      name="playedAt" 
                      type="date" 
                      required 
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{club.name} Score</label>
                    <input 
                      name="clubScore" 
                      type="number" 
                      required 
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opponent Score</label>
                    <input 
                      name="opponentScore" 
                      type="number" 
                      required 
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                    />
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition">
                  Add Match Result
                </button>
              </form>
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">📋</span> Recent Matches
              </h2>
              {matches.length === 0 ? (
                <p className="text-gray-500">No matches yet. Add your first match above!</p>
              ) : (
                <div className="space-y-3">
                  {matches.map(match => (
                    <div key={match.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className={`text-xl font-bold ${match.club_score > match.opponent_score ? 'text-green-600' : match.club_score < match.opponent_score ? 'text-red-500' : 'text-gray-500'}`}>
                          {match.club_score}
                        </span>
                        <span className="text-gray-400">vs</span>
                        <span className="font-semibold text-gray-700">{match.opponent}</span>
                        <span className="text-xl font-bold text-gray-700">{match.opponent_score}</span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        {new Date(match.played_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Season Stats</h3>
              {standings && (
                <div className="space-y-3">
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-4xl font-bold">{points}</div>
                    <div className="text-green-100 text-sm">Points</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold">{standings.won}</div>
                      <div className="text-green-100 text-xs">W</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold">{standings.drawn}</div>
                      <div className="text-green-100 text-xs">D</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold">{standings.lost}</div>
                      <div className="text-green-100 text-xs">L</div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Club Settings</h3>
              <div className="space-y-3">
                <Link 
                  href={`/${club.slug}`} 
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition text-gray-700"
                >
                  → View Public Page
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}