'use client';

import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

/**
 * 🎬 Tombol untuk membuka trailer YouTube dalam modal.
 * Didesain agar mudah digunakan ulang di berbagai halaman (movie detail, hero, dll).
 */
interface WatchTrailerButtonProps {
  trailerKey: string | null;
  className?: string;
}

export default function WatchTrailerButton({
  trailerKey,
  className,
}: WatchTrailerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Jangan tampilkan tombol jika tidak ada trailer
  if (!trailerKey) return null;

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* ▶️ Tombol Utama */}
      <Button
        onClick={handleOpen}
        disabled={!trailerKey}
        className={clsx(
          'bg-[#D12B26] hover:bg-red-700 text-white px-8 py-7 text-xl font-semibold rounded-full flex items-center justify-center transition',
          className
        )}
      >
        Watch Trailer
        <Play className='ml-3 h-6 w-6' fill='white' />
      </Button>

      {/* 🎥 Modal Video */}
      {isOpen && (
        <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4'>
          <div className='relative w-full max-w-4xl aspect-video'>
            {/* Tombol Tutup (X) */}
            <button
              onClick={handleClose}
              aria-label='Close trailer'
              className='absolute -top-10 right-0 text-white hover:text-red-500 transition z-50'
            >
              <X className='h-8 w-8' />
            </button>

            {/* Video YouTube */}
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title='Movie Trailer'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
              className='w-full h-full rounded-lg shadow-2xl border border-white/10'
            />
          </div>
        </div>
      )}
    </>
  );
}
