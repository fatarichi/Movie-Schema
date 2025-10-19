'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import WatchTrailerButton from '../movie/WatchTrailerButton';

/**
 * 🎬 Data utama Hero Section
 */
const HERO_DATA = {
  id: 950396,
  title: 'The Gorge',
  description:
    'Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge. When an evil below emerges, they must work together to survive what lies within.',
  imageUrl: '/images/Hero.png',
  trailerKey: 'rUSdnuOLebE',
};

const HEADER_HEIGHT = 68;

/**
 * 🔹 Tombol aksi (digunakan di mobile & desktop)
 */
function HeroButtons() {
  return (
    <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
      {/* 🔹 Watch Trailer pakai komponen milikmu */}
      <div className='w-full md:w-auto'>
        <WatchTrailerButton
          trailerKey={HERO_DATA.trailerKey}
          className='w-full md:w-auto bg-[#D12B26] hover:bg-red-700 text-white py-6 md:py-7 px-8 text-lg md:text-xl font-semibold rounded-full'
        />
      </div>

      {/* 🔹 See Detail menuju halaman detail */}
      <Link
        href={`/movie/${HERO_DATA.id}`}
        className='w-full md:w-auto flex justify-center'
      >
        <Button
          variant='outline'
          className='bg-transparent border-white text-white py-6 md:py-7 px-8 text-lg md:text-xl font-semibold rounded-full hover:bg-white/10 w-full md:w-auto'
        >
          See Detail
        </Button>
      </Link>
    </div>
  );
}

/**
 * 🖼️ Komponen gambar Hero dengan overlay gelap di bawah
 */
function HeroImage({ isDesktop }: { isDesktop?: boolean }) {
  return (
    <div
      className={`relative w-full overflow-hidden ${
        isDesktop ? 'h-[90vh] min-h-[700px]' : 'aspect-[1/1.25]'
      }`}
    >
      <Image
        src={HERO_DATA.imageUrl}
        alt={HERO_DATA.title}
        fill
        priority
        className={`object-cover ${isDesktop ? 'object-top' : ''}`}
      />

      <div
        className='absolute bottom-0 left-0 w-full h-[55%] 
          bg-gradient-to-t from-black/90 via-black/60 to-transparent'
      />
    </div>
  );
}

/**
 * 🌟 Hero Section utama (mobile + desktop)
 */
export default function HeroSection() {
  return (
    <section className='relative w-full mt-[-68px] pt-[68px]'>
      {/* 🌐 MOBILE VIEW */}
      <div className='flex flex-col md:hidden relative'>
        <HeroImage />
        <div className='absolute bottom-0 w-full p-6 text-white'>
          <h1 className='text-4xl font-extrabold mb-3'>{HERO_DATA.title}</h1>
          <p className='text-base text-gray-300 mb-8'>
            {HERO_DATA.description}
          </p>
          <HeroButtons />
        </div>
      </div>

      {/* 💻 DESKTOP VIEW */}
      <div className='hidden md:block relative w-full'>
        <HeroImage isDesktop />
        <div className='absolute inset-y-0 left-0 flex items-center w-full max-w-7xl mx-auto px-12 text-white'>
          <div className='w-full md:w-1/2'>
            <h1 className='text-7xl font-extrabold mb-6 drop-shadow-lg'>
              {HERO_DATA.title}
            </h1>
            <p className='text-xl text-gray-200 mb-10 drop-shadow-md'>
              {HERO_DATA.description}
            </p>
            <HeroButtons />
          </div>
        </div>
      </div>
    </section>
  );
}
