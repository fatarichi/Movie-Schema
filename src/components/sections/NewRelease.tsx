'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';
const STAR_ICON = '/images/Star.png';

/**
 * 🔹 Setting layout grid (bisa diubah kapan saja)
 */
const MOBILE_COLUMNS = 2;
const DESKTOP_COLUMNS = 5;
const MOBILE_ROWS = 4;
const DESKTOP_ROWS = 3;

/**
 * 🎬 NewReleaseCard
 * Kartu individual untuk menampilkan film rilis baru.
 */
function NewReleaseCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className='block cursor-pointer transition-transform duration-300 hover:scale-[1.03]'
    >
      {/* Poster */}
      {movie.poster_path ? (
        <Image
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={`Poster of ${movie.title}`}
          width={300}
          height={450}
          className='rounded-lg object-cover w-full h-auto shadow-lg'
          loading='lazy'
        />
      ) : (
        <div className='w-full h-60 bg-gray-700 flex items-center justify-center rounded-lg'>
          <p className='text-xs text-white text-center p-2'>No Poster</p>
        </div>
      )}

      {/* Informasi film */}
      <div className='mt-2'>
        <p className='text-white text-xs md:text-sm font-medium truncate'>
          {movie.title}
        </p>
        <div className='flex items-center space-x-1 mt-1'>
          <Image
            src={STAR_ICON}
            alt='Star rating icon'
            width={12}
            height={12}
            className='w-3 h-3'
          />
          <p className='text-gray-400 text-xs'>
            {movie.vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </Link>
  );
}

/**
 * 🧩 NewReleaseGrid
 * Komponen utama untuk menampilkan daftar film rilis baru dalam bentuk grid.
 * Grid menyesuaikan jumlah kolom dan baris berdasarkan ukuran layar.
 */
export default function NewReleaseGrid({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  // Jumlah default item yang tampil di server (desktop)
  const initialLimit = DESKTOP_COLUMNS * DESKTOP_ROWS;
  const [visibleCount, setVisibleCount] = useState(initialLimit);

  useEffect(() => {
    // Jalankan di sisi client agar menyesuaikan lebar layar
    const calculateVisibleCount = () => {
      return window.innerWidth < 768
        ? MOBILE_COLUMNS * MOBILE_ROWS
        : DESKTOP_COLUMNS * DESKTOP_ROWS;
    };

    setVisibleCount(calculateVisibleCount());

    const handleResize = () => setVisibleCount(calculateVisibleCount());
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showLoadMore = movies.length > initialLimit;

  return (
    <section className='mb-10'>
      {/* SEO-friendly heading */}
      <h2 className='text-xl md:text-2xl font-bold text-white mb-4'>{title}</h2>

      {/* Grid responsif */}
      <div className='grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8'>
        {movies.slice(0, visibleCount).map((movie) => (
          <NewReleaseCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Tombol Load More */}
      {showLoadMore && (
        <div className='flex justify-center mt-8'>
          <button
            onClick={() => setVisibleCount(movies.length)}
            className='bg-[#0A0D12] text-white py-3 px-8 rounded-full font-semibold hover:bg-gray-800 transition'
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
