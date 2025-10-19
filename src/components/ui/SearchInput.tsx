'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

/**
 * 🔍 SearchInput
 * Komponen input pencarian film.
 * - Menavigasi ke halaman hasil pencarian berdasarkan kata kunci.
 * - Dibuat sebagai controlled input agar mudah dikembangkan (misalnya: auto-suggestion).
 */
export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;

    router.push(`/search/${encodeURIComponent(query)}`);
    setSearchTerm(''); // Reset input setelah navigasi
  };

  return (
    <form
      onSubmit={handleSearch}
      className='relative flex items-center w-full'
      role='search'
      aria-label='Search for movies'
    >
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search movies...'
        aria-label='Search movies input'
        className='w-full px-4 py-2 text-white bg-gray-800/70 border border-gray-700 
                   rounded-full placeholder-gray-400 focus:outline-none 
                   focus:ring-2 focus:ring-red-500 transition-all'
      />

      <button
        type='submit'
        aria-label='Submit search'
        className='absolute right-3 text-gray-400 hover:text-white transition-colors'
      >
        <Search className='w-5 h-5' />
      </button>
    </form>
  );
}
