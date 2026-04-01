import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ movie }) {
  return (
    <Link href={`/movies/${movie.id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-red-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-900/20">
        <div className="relative aspect-2/3 w-full overflow-hidden">
          <Image
            src={movie.image}
            alt={movie.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {movie.rating}
          </div>
          <div className="absolute top-2 left-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            ★ {movie.score}
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-gray-400 text-xs">{movie.genre}</span>
            <span className="text-gray-500 text-xs">{movie.year}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
