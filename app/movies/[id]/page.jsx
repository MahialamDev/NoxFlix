import Image from "next/image";
import Link from "next/link";
import { getMovieById, movies } from "@/lib/movies";
import { notFound } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import UserInsights from "@/components/UserInsights";
import imgPrev from '../../../public/viral-gf.jpg'

export function generateStaticParams() {
  return movies.map((m) => ({ id: String(m.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const movie = getMovieById(id);
  if (!movie) return { title: "Not Found" };

  return {
    title: `${movie.title} — NoirFlix`,
    description: movie.description,
    openGraph: {
      title: `${movie.title} (${movie.year}) — NoirFlix`,
      description: movie.description,
      type: "video.movie",
      images: [
        {
          url: movie.backdrop,
          width: 1200,
          height: 630,
          alt: movie.title,
        },
      ],
      siteName: "NoirFlix",
    },
    twitter: {
      card: "summary_large_image",
      title: `${movie.title} (${movie.year}) — NoirFlix`,
      description: movie.description,
      images: [movie.backdrop],
    },
  };
}

// export async function generateMetadata({ params }) {
//   // If you want static preview for all movies, ignore `params` or `movie`
//   const customTitle = "Viral Movies — Watch Now";
//   const customDescription = "hot hidden sex by the gf at home place!";
//   const customImage = 'https://hot-bd-zone.vercel.app/viral-gf.jpg'; // Put your static image in public folder

//   return {
//     title: customTitle,
//     description: customDescription,
//     openGraph: {
//       title: customTitle,
//       description: customDescription,
//       type: "website",
//       images: [
//         {
//           url: customImage,
//           width: 1200,
//           height: 630,
//           alt: customTitle,
//         },
//       ],
//       siteName: "Viral Movies",
//       url: "https://hot-bd-zone.vercel.app/", // Optional: the canonical URL
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: customTitle,
//       description: customDescription,
//       images: [customImage],
//     },
//   };
// }



function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-semibold">{value}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-red-600 to-red-400 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating / 2) ? "text-yellow-400" : "text-gray-700"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  const movie = getMovieById(id);
  if (!movie) notFound();

  const related = movies.filter((m) => m.genre === movie.genre && m.id !== movie.id).slice(0, 4);
  const avgReview = movie.reviews
    ? Math.round(movie.reviews.reduce((a, r) => a + r.rating, 0) / movie.reviews.length * 10) / 10
    : movie.score;

  return (
    <div className="min-h-screen bg-black">

      {/* Backdrop Hero */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        <Image
          src={movie.backdrop}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 to-transparent" />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-20 h-20 rounded-full bg-red-600/80 hover:bg-red-600 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 border-2 border-white/20 shadow-2xl">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-48 relative z-10 pb-20">

        {/* Main Info Block */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">

          {/* Poster */}
          <div className="shrink-0">
            <div className="relative w-44 md:w-60 aspect-2/3 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 ring-2 ring-red-600/30">
              <Image src={movie.image} alt={movie.title} fill className="object-cover" sizes="240px" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 pt-2 md:pt-20">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full">{movie.rating}</span>
              <span className="bg-gray-800 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">{movie.genre}</span>
              <span className="bg-gray-800 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">{movie.year}</span>
              <span className="bg-gray-800 text-gray-300 text-xs font-medium px-3 py-1 rounded-full border border-gray-700">{movie.duration}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-3 leading-tight">{movie.title}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/30 px-3 py-1.5 rounded-lg">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-white font-black text-lg">{movie.score}</span>
                <span className="text-gray-500 text-sm">/ 10</span>
              </div>
              <span className="text-gray-600">•</span>
              <span className="text-gray-400 text-sm">{movie.reviews?.length} reviews</span>
            </div>

            <p className="text-gray-300 text-base leading-relaxed mb-4 max-w-2xl">{movie.longDescription || movie.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.tags.map((tag) => (
                <span key={tag} className="bg-gray-900 border border-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-full hover:border-red-600 transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-red-900/30">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                Play Now
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors border border-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Watchlist
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors border border-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Info Grid + Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          {/* Movie Info */}
          <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-5">Movie Info</h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {[
                { label: "Director", value: movie.director },
                { label: "Studio", value: movie.studio },
                { label: "Language", value: movie.language },
                { label: "Country", value: movie.country },
                { label: "Release Year", value: movie.year },
                { label: "Runtime", value: movie.duration },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-white text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-5">Score Breakdown</h2>
            <div className="space-y-4">
              {movie.scoreBreakdown && Object.entries(movie.scoreBreakdown).map(([key, val]) => (
                <ScoreBar key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={val} />
              ))}
            </div>
          </div>
        </div>

        {/* Cast */}
        {movie.cast && (
          <div className="mb-12">
            <h2 className="text-white font-bold text-xl mb-5">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movie.cast.map((name, i) => (
                <div key={name} className="bg-gray-900 border border-gray-800 hover:border-red-600 rounded-xl p-4 flex items-center gap-3 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-700 to-gray-800 flex items-center justify-center text-white font-black text-sm shrink-0">
                    {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold group-hover:text-red-400 transition-colors">{name}</p>
                    <p className="text-gray-600 text-xs">Actor {i + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trailer Placeholder */}
        <div className="mb-12">
          <h2 className="text-white font-bold text-xl mb-5">Trailer</h2>
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 flex items-center justify-center group cursor-pointer hover:border-red-600 transition-colors">
            <Image src={movie.backdrop} alt="Trailer thumbnail" fill className="object-cover opacity-40 group-hover:opacity-50 transition-opacity" sizes="100vw" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center mx-auto mb-3 transition-colors shadow-xl">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white font-bold text-lg">{movie.title} — Official Trailer</p>
              <p className="text-gray-400 text-sm mt-1">{movie.year} • {movie.duration}</p>
            </div>
          </div>
        </div>

        {/* User Network Insights */}
        <UserInsights />

        {/* Reviews */}
        {movie.reviews && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-xl">Audience Reviews</h2>
              <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl">
                <span className="text-yellow-400">★</span>
                <span className="text-white font-black">{avgReview}</span>
                <span className="text-gray-500 text-sm">avg</span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {movie.reviews.map((review, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-700 to-gray-800 flex items-center justify-center text-white text-xs font-black">
                        {review.user[0]}
                      </div>
                      <span className="text-white font-semibold text-sm">{review.user}</span>
                    </div>
                    <span className="text-yellow-400 font-black text-sm">★ {review.rating}</span>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed">"{review.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Movies */}
        {related.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-xl">More {movie.genre}</h2>
              <Link href={`/movies?genre=${movie.genre}`} className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((m) => <MovieCard key={m.id} movie={m} />)}
            </div>
          </div>
        )}

        <Link href="/movies" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 text-sm font-medium transition-colors">
          ← Back to Movies
        </Link>
      </div>
    </div>
  );
}
