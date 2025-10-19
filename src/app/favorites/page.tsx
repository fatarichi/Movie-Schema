'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from '@/providers/FavoritesProvider';
import { Star, Play, Heart, Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { favorites, removeFavorite, isFavorite } = useFavorites();

  return (
    <main className='min-h-screen pt-16 md:pt-24 max-w-7xl mx-auto px-4 pb-12 text-white'>
      {/* Halaman Daftar Favorite */}
      <h1 className='text-3xl font-bold mb-6 md:mb-8'>Favorites</h1>

      {favorites.length === 0 ? (
        <div className='flex flex-col items-center p-8 text-center'>
          <div className='w-[140px] h-[170px] flex items-center justify-center mb-6'>
            <Clapperboard className='w-28 h-28 text-gray-500/70' />
          </div>

          <h2 className='text-2xl font-semibold mb-2'>Data Empty</h2>

          <p className='text-base text-gray-400 mb-8'>
            You don't have a favorite movie yet
          </p>

          <Link href='/'>
            <Button
              className='
        px-12 py-3 h-auto text-base font-semibold rounded-full 
        bg-[#961200] hover:bg-red-600 text-white 
        transition-colors
        w-full max-w-xs'
            >
              Explore Movie
            </Button>
          </Link>
        </div>
      ) : (
        <section className='space-y-8' aria-label='Favorite movies list'>
          {favorites.map((movie) => (
            <article
              key={movie.id}
              className='flex flex-col md:flex-row gap-4 md:gap-6 border-b border-gray-700 pb-6'
            >
              {/* === MOBILE LAYOUT === */}
              <div className='md:hidden flex flex-col w-full'>
                <div className='flex w-full gap-4'>
                  {/* Poster */}
                  <div className='flex-shrink-0 w-28 h-40'>
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        width={112}
                        height={160}
                        className='rounded-lg object-cover w-full h-full shadow-lg'
                      />
                    ) : (
                      <div className='w-full h-full bg-gray-700 flex items-center justify-center rounded-lg'>
                        <p className='text-xs text-gray-400'>No Poster</p>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className='flex flex-col justify-start flex-1 mt-1'>
                    <h2 className='text-base font-bold mb-2 leading-snug tracking-wide'>
                      {movie.title}
                    </h2>

                    <div className='flex items-center space-x-1 mb-2'>
                      <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                      <p className='text-sm text-gray-300'>
                        {movie.vote_average.toFixed(1)}/10
                      </p>
                    </div>

                    <p className='text-gray-400 text-xs leading-relaxed line-clamp-2'>
                      {movie.overview}
                    </p>
                  </div>
                </div>

                {/* Tombol */}
                <div className='flex items-center justify-between mt-4'>
                  <Link
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      movie.title + ' trailer'
                    )}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-center bg-[#A52A2A] hover:bg-[#8B1A1A] text-white font-semibold py-2 rounded-full transition-all duration-300 w-[85%]'
                  >
                    Watch Trailer
                    <Play className='ml-2 w-4 h-4' />
                  </Link>

                  <button
                    onClick={() => removeFavorite(movie.id)}
                    className={`p-3 rounded-full border border-gray-600 transition-all duration-300 ${
                      isFavorite(movie.id)
                        ? 'bg-[#1a1a1a] text-red-500'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                    aria-label='Remove from favorites'
                  >
                    <Heart className='w-5 h-5 fill-current' />
                  </button>
                </div>
              </div>

              {/* === DESKTOP LAYOUT === */}
              <div className='hidden md:flex flex-row gap-6 w-full'>
                {/* Poster */}
                <div className='w-40 flex-shrink-0'>
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      width={300}
                      height={450}
                      className='rounded-lg object-cover w-full h-auto shadow-lg'
                    />
                  ) : (
                    <div className='w-full h-60 bg-gray-700 flex items-center justify-center rounded-lg'>
                      <p className='text-sm text-gray-400'>No Poster</p>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className='relative flex flex-col flex-1'>
                  {/* Tombol hapus favorite (pojok kanan atas) */}
                  <button
                    onClick={() => removeFavorite(movie.id)}
                    className={`absolute top-0 right-0 p-2 rounded-full border border-gray-600 transition-all duration-300 ${
                      isFavorite(movie.id)
                        ? 'bg-[#1a1a1a] text-red-500'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                    aria-label='Remove from favorites'
                  >
                    <Heart className='w-5 h-5 fill-current' />
                  </button>

                  {/* Judul dan detail */}
                  <h2 className='text-xl font-bold mb-1 pr-10'>
                    {movie.title}
                  </h2>

                  <div className='flex items-center space-x-1 mb-2'>
                    <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                    <p className='text-sm text-gray-300'>
                      {movie.vote_average.toFixed(1)}/10
                    </p>
                  </div>

                  <p className='text-gray-400 text-sm md:text-base line-clamp-3 pr-10'>
                    {movie.overview}
                  </p>

                  <div className='flex items-center mt-4'>
                    <Link
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                        movie.title + ' trailer'
                      )}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center justify-center bg-[#A52A2A] hover:bg-[#8B1A1A] text-white font-semibold py-2 rounded-full transition-all duration-300 w-auto px-8'
                    >
                      Watch Trailer
                      <Play className='ml-2 w-4 h-4' />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
