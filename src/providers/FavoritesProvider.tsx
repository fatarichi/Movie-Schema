// src/providers/FavoritesProvider.tsx
'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { MovieData, FavoritesContextType } from '@/types';

const LOCAL_STORAGE_KEY = 'movie_explorer_favorites';

// Context global untuk fitur Favorites
export const FavoritesContext = createContext<FavoritesContextType | null>(
  null
);

// Hook kustom agar mudah menggunakan context di seluruh komponen
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<MovieData[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Ambil data favorites dari localStorage saat pertama kali render
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // Simpan perubahan favorites ke localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  // Fungsi kecil untuk menampilkan notifikasi singkat (toast)
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Tambah film ke daftar favorit
  const addFavorite = (movie: MovieData) => {
    if (favorites.some((fav) => fav.id === movie.id)) return;

    setFavorites((prev) => [...prev, movie]);
    triggerToast(`'${movie.title}' added to Favorites`);
  };

  // Hapus film dari daftar favorit
  const removeFavorite = (movieId: number) => {
    const movie = favorites.find((m) => m.id === movieId);
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
    triggerToast(
      movie
        ? `'${movie.title}' removed from Favorites`
        : 'Removed from Favorites'
    );
  };

  // Cek apakah film sudah ada di daftar favorit
  const isFavorite = (movieId: number) =>
    favorites.some((m) => m.id === movieId);

  const contextValue: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    showToast,
    toastMessage,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Komponen Toast sederhana untuk menampilkan notifikasi tindakan favorit
export const ToastNotification: React.FC = () => {
  const context = useContext(FavoritesContext);
  if (!context) return null;

  const { showToast, toastMessage } = context;

  return (
    <div
      className={`
        fixed top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg 
        text-white font-medium transition-opacity duration-300 z-50
        ${
          showToast
            ? 'opacity-100 bg-green-600'
            : 'opacity-0 pointer-events-none'
        }
      `}
    >
      <span className='mr-2'>&#10003;</span> {toastMessage}
    </div>
  );
};
