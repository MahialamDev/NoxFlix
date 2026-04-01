import HeroBanner from "@/components/HeroBanner";
import MovieCard from "@/components/MovieCard";
import { movies, getFeaturedMovies } from "@/lib/movies";
import Link from "next/link";
import Image from "next/image";
import UserInsights from "@/components/UserInsights";

const genreConfig = [
  { name: "Thriller", emoji: "🔪", color: "from-purple-900/60 to-black", border: "border-purple-800" },
  { name: "Sci-Fi", emoji: "🚀", color: "from-blue-900/60 to-black", border: "border-blue-800" },
  { name: "Horror", emoji: "💀", color: "from-red-900/60 to-black", border: "border-red-800" },
  { name: "Action", emoji: "💥", color: "from-orange-900/60 to-black", border: "border-orange-800" },
  { name: "Crime", emoji: "🕵️", color: "from-yellow-900/60 to-black", border: "border-yellow-800" },
  { name: "Western", emoji: "🤠", color: "from-amber-900/60 to-black", border: "border-amber-800" },
];

const stats = [
  { label: "Movies", value: "500+", icon: "🎬" },
  { label: "HD Quality", value: "4K", icon: "📺" },
  { label: "New Monthly", value: "50+", icon: "🆕" },
  { label: "Members", value: "2M+", icon: "👥" },
];

export default function Home() {
  const featured = getFeaturedMovies();
  const hero = featured[0];
  const trending = movies.slice(0, 4);
  const newReleases = movies.slice(4);
  const topRated = [...movies].sort((a, b) => b.score - a.score).slice(0, 3);

  return (
    <div className="min-h-screen bg-black">
      <HeroBanner movie={hero} />

      {/* Stats Bar */}
      <div className="bg-gray-950 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-3xl">{s.icon}</span>
              <div>
                <p className="text-white font-black text-xl leading-none">{s.value}</p>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <UserInsights />

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">

        {/* Trending */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-500">🔥</span> Trending Now
              </h2>
              <p className="text-gray-500 text-sm mt-1">Most watched this week</p>
            </div>
            <Link href="/movies" className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trending.map((movie, i) => (
              <div key={movie.id} className="relative">
                <span className="absolute -top-3 -left-2 z-10 text-5xl font-black text-gray-800 select-none leading-none">
                  {i + 1}
                </span>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </section>

        {/* Featured Spotlight */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-yellow-400">⭐</span> Editor's Spotlight
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((movie) => (
              <Link key={movie.id} href={`/movies/${movie.id}`} className="group relative overflow-hidden rounded-2xl border border-gray-800 hover:border-red-600 transition-all">
                <div className="relative h-56 w-full">
                  <Image
                    src={movie.backdrop}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">{movie.rating}</span>
                    <span className="text-yellow-400 text-sm font-bold">★ {movie.score}</span>
                    <span className="text-gray-400 text-xs">{movie.duration}</span>
                  </div>
                  <h3 className="text-white font-black text-xl">{movie.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">{movie.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-yellow-400">🏆</span> Top Rated
          </h2>
          <div className="space-y-3">
            {topRated.map((movie, i) => (
              <Link key={movie.id} href={`/movies/${movie.id}`} className="flex items-center gap-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-red-600 rounded-xl p-4 transition-all group">
                <span className="text-3xl font-black text-gray-700 w-8 text-center shrink-0">#{i + 1}</span>
                <div className="relative w-14 h-20 rounded-lg overflow-hidden shrink-0">
                  <Image src={movie.image} alt={movie.title} fill className="object-cover" sizes="56px" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold truncate">{movie.title}</h3>
                  <p className="text-gray-500 text-sm">{movie.genre} • {movie.year}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {movie.tags.slice(0, 2).map((t) => (
                      <span key={t} className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-yellow-400 font-black text-xl">★ {movie.score}</div>
                  <div className="text-gray-500 text-xs">{movie.duration}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* New Releases */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-red-500">🆕</span> New Releases
              </h2>
              <p className="text-gray-500 text-sm mt-1">Just dropped this month</p>
            </div>
            <Link href="/movies" className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newReleases.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Genre Cards */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Browse by Genre</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {genreConfig.map((genre) => (
              <Link
                key={genre.name}
                href={`/movies?genre=${genre.name}`}
                className={`relative overflow-hidden bg-linear-to-br ${genre.color} border ${genre.border} hover:scale-105 rounded-2xl p-6 transition-all group`}
              >
                <div className="text-4xl mb-3">{genre.emoji}</div>
                <h3 className="text-white font-black text-xl group-hover:text-red-400 transition-colors">{genre.name}</h3>
                <p className="text-gray-500 text-sm mt-1">
                  {movies.filter((m) => m.genre === genre.name).length} titles
                </p>
                <div className="absolute bottom-3 right-4 text-gray-700 text-4xl font-black opacity-30 group-hover:opacity-60 transition-opacity">
                  →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-red-900 via-red-800 to-black border border-red-800 p-8 md:p-12 text-center">
          <div className="absolute inset-0 opacity-10 text-9xl flex items-center justify-center select-none pointer-events-none">🎬</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Unlimited 18+ Cinema</h2>
          <p className="text-gray-300 text-lg mb-6 max-w-xl mx-auto">
            Stream the darkest thrillers, boldest sci-fi, and most intense dramas — all in one place.
          </p>
          <Link
            href="/movies"
            className="inline-block bg-white text-black font-black px-10 py-3 rounded-xl hover:bg-gray-200 transition-colors text-lg"
          >
            Start Watching
          </Link>
        </section>

      




      </div>
    </div>
  );
}
