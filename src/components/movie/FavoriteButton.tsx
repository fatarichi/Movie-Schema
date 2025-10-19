'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/providers/FavoritesProvider';
import { MovieData } from '@/types';

/**
 * ❤️ Tombol untuk menambahkan atau menghapus film dari daftar favorit.
 * Menggunakan FavoritesProvider agar state global dapat diakses di seluruh aplikasi.
 */
interface FavoriteButtonProps {
  movie: MovieData;
}

export default function FavoriteButton({ movie }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = () => {
    favorite ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return (
    <button
      onClick={toggleFavorite}
      aria-label={`Toggle favorite for ${movie.title}`}
      className='w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300'
    >
      {/* Ikon Hati berubah warna ketika film difavoritkan */}
      <Heart
        className='h-6 w-6 transition-colors'
        fill={favorite ? '#D12B26' : 'none'}
        stroke='white'
        strokeWidth={2}
      />
    </button>
  );
}
