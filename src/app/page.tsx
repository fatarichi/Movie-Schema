// src/app/page.tsx

import HeroSection from '@/components/sections/HeroSection';
import NewReleaseGrid from '@/components/sections/NewRelease';
import TrendingCarousel from '@/components/sections/TrendingNow';
import { getNewRelease, getTrendingNow } from '@/lib/getMovies';
import { Movie } from '@/types';

export default async function Home() {
  const TrendingNow: Movie[] = await getTrendingNow();
  const NewRelease: Movie[] = await getNewRelease();

  return (
    // PERBAIKAN: Hapus max-w-7xl mx-auto dari main agar Hero Section full-width.
    // Gunakan px-0 agar padding diserahkan ke komponen di dalamnya.
    <main className='px-0 bg-gray-900 min-h-screen'>
      {/* HeroSection (Harus tetap full-width) */}
      <HeroSection />

      {/* Konten Utama (Trending & New Release) dibungkus dengan max-w-7xl mx-auto */}
      <div className='max-w-7xl mx-auto px-6'>
        {/* 1. SECTION TRENDING NOW */}
        <TrendingCarousel title='Trending Now' movies={TrendingNow} />

        {/* 2. SECTION NEW RELEASE */}
        <NewReleaseGrid title='New Release' movies={NewRelease} />
      </div>
    </main>
  );
}
