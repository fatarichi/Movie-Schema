'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w300';
const STAR_ICON = '/images/Star.png';

interface TrendingCardProps {
  movie: Movie;
  index: number;
}

/**
 * 🎬 TrendingCard
 * Kartu film untuk menampilkan setiap item trending.
 * Berisi: nomor urut, poster film, judul, dan rating.
 */
function TrendingCard({ movie, index }: TrendingCardProps) {
  return (
    <Link href={`/movie/${movie.id}`} className='cursor-pointer block'>
      <div className='relative'>
        {/* Nomor urut film */}
        <div
          className='absolute top-2 left-2 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 bg-black/60'
          aria-label={`Ranking ${index + 1}`}
        >
          {index + 1}
        </div>

        {/* Poster film */}
        {movie.poster_path ? (
          <Image
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={`Poster of ${movie.title}`}
            width={300}
            height={450}
            className='rounded-lg object-cover w-full h-auto shadow-xl transition-transform duration-300 hover:scale-[1.03]'
            loading='lazy'
          />
        ) : (
          <div className='w-full h-60 bg-gray-700 flex items-center justify-center rounded-lg'>
            <p className='text-xs text-white text-center p-2'>No Poster</p>
          </div>
        )}
      </div>

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
 * 🌟 TrendingCarousel
 * Menampilkan daftar film trending menggunakan carousel.
 * Berfungsi di semua ukuran layar dan mendukung navigasi next/previous.
 */
export default function TrendingCarousel({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  if (movies.length === 0) return null;

  return (
    <section className='mb-10'>
      {/* SEO-friendly heading */}
      <h2 className='text-xl md:text-2xl font-bold text-white mb-4'>{title}</h2>

      <Carousel opts={{ align: 'start' }} className='w-full relative group'>
        <CarouselContent className='-ml-4'>
          {movies.map((movie, index) => (
            <CarouselItem
              key={movie.id}
              className='basis-1/2 md:basis-1/5 pl-4'
            >
              <TrendingCard movie={movie} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Tombol navigasi carousel */}
        <CarouselPrevious className='absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 rounded-full bg-gray-900/70 text-white border-none shadow-lg hover:bg-gray-800/80 transition' />
        <CarouselNext className='absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 rounded-full bg-gray-900/70 text-white border-none shadow-lg hover:bg-gray-800/80 transition' />
      </Carousel>
    </section>
  );
}
