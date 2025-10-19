// src/app/search/[term]/page.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { getSearchedMovies } from '@/lib/getMovies';
import { Movie } from '@/types';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';

// Kartu film sederhana khusus untuk halaman hasil pencarian
const SearchMovieCard: React.FC<{ movie: Movie }> = ({ movie }) => (
  <Link href={`/movie/${movie.id}`} className='w-full cursor-pointer group'>
    {/* Poster Film */}
    {movie.poster_path ? (
      <Image
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={450}
        className='rounded-lg object-cover w-full h-auto shadow-xl transition-transform duration-300 group-hover:scale-[1.03]'
      />
    ) : (
      <div className='w-full h-60 bg-gray-700 flex items-center justify-center rounded-lg'>
        <p className='text-xs text-white text-center p-2'>No Poster</p>
      </div>
    )}

    {/* Detail Film */}
    <div className='mt-2'>
      <p className='text-white text-xs md:text-sm font-medium truncate'>
        {movie.title}
      </p>
      <div className='flex items-center space-x-1 mt-1'>
        <Star className='w-3 h-3 fill-yellow-400 text-yellow-400' />
        <p className='text-gray-400 text-xs'>
          {movie.vote_average.toFixed(1)}/10
        </p>
      </div>
    </div>
  </Link>
);

// Komponen utama halaman pencarian
interface SearchPageProps {
  params: { term: string };
}

export default async function SearchPage({ params }: SearchPageProps) {
  const searchTerm = decodeURIComponent(params.term);
  const movies = await getSearchedMovies(searchTerm);

  // Tampilkan pesan jika tidak ada hasil
  if (movies.length === 0) {
    return (
      <main className='min-h-screen pt-24 max-w-7xl mx-auto px-6'>
        <h1 className='text-3xl font-bold text-white mb-8'>
          Results for “{searchTerm}”
        </h1>
        <p className='text-lg text-gray-400'>
          Sorry, no movies were found matching “{searchTerm}”.
        </p>
      </main>
    );
  }

  // Jika ada hasil pencarian
  return (
    <main className='min-h-screen pt-24 max-w-7xl mx-auto px-6 pb-12'>
      <h1 className='text-3xl font-bold text-white mb-8'>
        Results for “{searchTerm}” ({movies.length} found)
      </h1>

      {/* Grid layout hasil pencarian */}
      <div className='grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8'>
        {movies.map((movie) => (
          <SearchMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
