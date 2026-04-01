import Link from "next/link";
import Image from "next/image";

export default function HeroBanner({ movie }) {
  return (
    <div className="relative w-full h-[85vh] min-h-[500px] overflow-hidden">
      <Image
        src={movie.backdrop}
        alt={movie.title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                {movie.rating}
              </span>
              <span className="text-gray-300 text-sm">{movie.genre}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-300 text-sm">{movie.year}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-300 text-sm">{movie.duration}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              {movie.title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-white font-bold text-lg">{movie.score}</span>
              <span className="text-gray-400 text-sm">/ 10</span>
            </div>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {movie.description}
            </p>

            <div className="flex gap-4">
              <Link
                href={`/movies/${movie.id}`}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Now
              </Link>
              <Link
                href={`/movies/${movie.id}`}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-lg backdrop-blur-sm transition-colors border border-white/20"
              >
                More Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
