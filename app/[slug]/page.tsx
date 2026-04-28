import Link from 'next/link';
import { getClubBySlug } from '@/lib/club';
import { getMatches, getStandings } from '@/lib/match';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function ClubPage({ params }: PageProps) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);
  
  if (!club) {
    notFound();
  }
  
  const matches = await getMatches(club.id);
  const standings = await getStandings(club.id);
  const points = standings ? (standings.won * 3) + standings.drawn : 0;

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

      <div className="relative h-[350px] bg-gradient-to-r from-green-500 via-green-600 to-green-700 overflow-hidden">
        {club.banner_image ? (
          <img src={club.banner_image} alt={club.name} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32">
          <h1 className="text-5xl md:text-6xl font-bold text-white">{club.name}</h1>
          <p className="text-green-200 text-lg mt-2">Official Club Page</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="text-2xl">⚽</span> Match Results
              </h2>
              {matches.length === 0 ? (
                <p className="text-gray-500">No matches played yet.</p>
              ) : (
                <div className="space-y-4">
                  {matches.map(match => (
                    <div key={match.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition">
                      <div className="flex items-center gap-4">
                        <div className={`text-2xl font-bold ${match.club_score > match.opponent_score ? 'text-green-600' : match.club_score < match.opponent_score ? 'text-red-500' : 'text-gray-500'}`}>
                          {match.club_score}
                        </div>
                        <div className="text-gray-400">vs</div>
                        <div className="text-xl font-semibold text-gray-700">{match.opponent}</div>
                        <div className="text-2xl font-bold text-gray-700">{match.opponent_score}</div>
                      </div>
                      <div className="text-gray-500 text-sm">
                        {new Date(match.played_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-8 text-white">
              <h2 className="text-xl font-bold mb-4">Standings</h2>
              {standings && (
                <div className="space-y-4">
                  <div className="bg-white/20 rounded-xl p-4">
                    <div className="text-4xl font-bold">{points}</div>
                    <div className="text-green-100 text-sm">Points</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{standings.won}</div>
                      <div className="text-green-100 text-xs">W</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{standings.drawn}</div>
                      <div className="text-green-100 text-xs">D</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold">{standings.lost}</div>
                      <div className="text-green-100 text-xs">L</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold">{standings.goals_for}</div>
                      <div className="text-green-100 text-xs">GF</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold">{standings.goals_against}</div>
                      <div className="text-green-100 text-xs">GA</div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white rounded-2xl shadow-lg p-8 border">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Matches Played</span>
                  <span className="font-semibold text-gray-800">{standings?.played || 0}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Goal Difference</span>
                  <span className={`font-semibold ${((standings?.goals_for || 0) - (standings?.goals_against || 0)) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {((standings?.goals_for || 0) - (standings?.goals_against || 0))}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400">UnionPost - The platform for football clubs</p>
        </div>
      </footer>
    </div>
  );
}