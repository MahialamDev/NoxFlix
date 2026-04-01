"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import { movies, genres } from "@/lib/movies";
import { Suspense } from "react";

function MoviesContent() {
  const searchParams = useSearchParams();
  const initialGenre = searchParams.get("genre") || "All";
  const [activeGenre, setActiveGenre] = useState(initialGenre);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setActiveGenre(searchParams.get("genre") || "All");
  }, [searchParams]);

  const filtered = movies.filter((m) => {
    const matchGenre = activeGenre === "All" || m.genre === activeGenre;
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    return matchGenre && matchSearch;
  });

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">All Movies</h1>
          <p className="text-gray-400">18+ content — viewer discretion advised</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 bg-gray-900 border border-gray-700 focus:border-red-600 text-white placeholder-gray-500 rounded-lg px-4 py-2.5 outline-none transition-colors"
          />
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeGenre === genre
                  ? "bg-red-600 text-white"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-700"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-5xl mb-4">🎬</p>
            <p className="text-xl">No movies found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black pt-24 flex items-center justify-center text-white">Loading...</div>}>
      <MoviesContent />
    </Suspense>
  );
}
