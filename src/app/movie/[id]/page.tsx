// src/app/movie/[id]/page.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, CalendarDays, User } from 'lucide-react';

import {
  getMoviesDetails,
  getMoviesVideos,
  getMovieCredits,
  getMovieAgeRating,
} from '@/lib/getMovies';
import { Cast, MovieDetails, VideoProps } from '@/types';
import WatchTrailerButton from '@/components/movie/WatchTrailerButton';
import FavoriteButton from '@/components/movie/FavoriteButton';

// ---------- Helper Function ----------
const findYoutubeTrailer = (videos: VideoProps[]): string | null => {
  if (!videos?.length) return null;
  const official = videos.find(
    (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official
  );
  return official?.key ?? videos.find((v) => v.site === 'YouTube')?.key ?? null;
};

// ---------- Cast Card ----------
const CastCard: React.FC<{ cast: Cast }> = ({ cast }) => {
  const PROFILE_URL = 'https://image.tmdb.org/t/p/w185';

  return (
    <div className='flex items-center space-x-3'>
      <div className='relative w-12 h-12 flex-shrink-0'>
        {cast.profile_path ? (
          <Image
            src={`${PROFILE_URL}${cast.profile_path}`}
            alt={cast.name}
            width={48}
            height={48}
            className='rounded-full object-cover w-full h-full'
          />
        ) : (
          <div className='w-full h-full rounded-full bg-gray-700 flex items-center justify-center'>
            <User className='w-6 h-6 text-gray-400' />
          </div>
        )}
      </div>
      <div>
        <p className='text-sm font-semibold text-white truncate'>{cast.name}</p>
        <p className='text-xs text-gray-400 truncate'>{cast.character}</p>
      </div>
    </div>
  );
};

// ---------- Halaman Detail Film ----------
interface MovieDetailPageProps {
  params: { id: string };
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const movieId = params.id;
  const BACKDROP_URL = 'https://image.tmdb.org/t/p/original';
  const POSTER_URL = 'https://image.tmdb.org/t/p/w500';
  const ICON_SIZE = 'w-7 h-7';

  // Ambil semua data film sekaligus
  const [movieDetails, movieVideos, movieCredits, ageRating] =
    (await Promise.all([
      getMoviesDetails(movieId),
      getMoviesVideos(movieId),
      getMovieCredits(movieId),
      getMovieAgeRating(movieId),
    ])) as [
      MovieDetails,
      VideoProps[],
      Awaited<ReturnType<typeof getMovieCredits>>,
      string | null
    ];

  if (!movieDetails?.id) return notFound();

  const trailerKey = findYoutubeTrailer(movieVideos);
  const topCast = movieCredits.cast.slice(0, 6);

  const formattedDate = new Date(movieDetails.release_date).toLocaleDateString(
    'id-ID',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  );

  return (
    <main className='bg-[#0A0D12] min-h-screen'>
      {/* ===== HERO SECTION ===== */}
      <section className='relative w-full min-h-[500px] md:h-[90vh] md:min-h-[700px] mt-[-68px]'>
        {movieDetails.backdrop_path && (
          <Image
            src={`${BACKDROP_URL}${movieDetails.backdrop_path}`}
            alt={movieDetails.title}
            fill
            priority
            className='absolute inset-0 object-cover object-top'
          />
        )}

        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent hidden md:block' />
        <div className='absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0D12] to-transparent md:hidden' />

        {/* Konten Utama */}
        <div className='absolute bottom-0 md:inset-0 w-full md:flex items-center max-w-7xl mx-auto px-6 pt-[68px] pb-8 md:pb-0 text-white'>
          {/* Mobile Layout */}
          <div className='md:hidden flex flex-col w-full'>
            <div className='flex items-center space-x-6 relative z-10 -mt-10 mb-8'>
              <div className='relative w-32 h-48 flex-shrink-0'>
                {movieDetails.poster_path ? (
                  <Image
                    src={`${POSTER_URL}${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                    width={128}
                    height={192}
                    className='rounded-lg shadow-xl object-cover'
                  />
                ) : (
                  <div className='w-full h-full bg-gray-700 flex items-center justify-center rounded-lg'>
                    <p className='text-xs text-center'>No Poster</p>
                  </div>
                )}
              </div>
              <div className='flex flex-col justify-end'>
                <h1 className='text-3xl font-extrabold mb-1 leading-tight'>
                  {movieDetails.title}
                </h1>
                <p className='text-base text-gray-300 flex items-center'>
                  <CalendarDays className='w-4 h-4 mr-2 text-gray-400' />
                  {formattedDate}
                </p>
              </div>
            </div>

            {/* Tombol mobile */}
            <div className='flex items-center w-full space-x-3'>
              <div className='flex-[0.85]'>
                <WatchTrailerButton
                  trailerKey={trailerKey}
                  className='w-full'
                />
              </div>
              <div className='flex-[0.15] flex justify-end'>
                <FavoriteButton
                  movie={{
                    id: Number(movieId),
                    title: movieDetails.title,
                    poster_path: movieDetails.poster_path || null,
                    backdrop_path: movieDetails.backdrop_path || null,
                    overview: movieDetails.overview,
                    vote_average: movieDetails.vote_average,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className='hidden md:flex flex-col md:max-w-xl lg:max-w-2xl text-white relative z-10'>
            <h1 className='text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight'>
              {movieDetails.title}
            </h1>
            <p className='text-xl lg:text-2xl text-gray-300 mb-6 flex items-center'>
              <CalendarDays className='w-5 h-5 mr-3 text-gray-400' />
              {formattedDate}
            </p>

            <div className='flex space-x-6 items-center'>
              <WatchTrailerButton trailerKey={trailerKey} />
              <FavoriteButton
                movie={{
                  id: Number(movieId),
                  title: movieDetails.title,
                  poster_path: movieDetails.poster_path || null,
                  backdrop_path: movieDetails.backdrop_path || null,
                  overview: movieDetails.overview,
                  vote_average: movieDetails.vote_average,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== DETAIL SECTION ===== */}
      <section className='w-full max-w-7xl mx-auto px-6 pt-8 pb-12 text-white'>
        {/* Metadata */}
        <div className='grid grid-cols-3 gap-4 mb-10'>
          <MetadataCard
            icon={
              <Star
                className={`${ICON_SIZE} mb-1 text-yellow-400 fill-yellow-400`}
              />
            }
            label='Rating'
            value={`${movieDetails.vote_average.toFixed(1)}/10`}
          />
          <MetadataCard
            icon={
              <Image
                src='/images/Camera.png'
                alt='Genre'
                width={28}
                height={28}
                className={`${ICON_SIZE} mb-1`}
              />
            }
            label='Genre'
            value={movieDetails.genres?.[0]?.name || 'N/A'}
          />
          <MetadataCard
            icon={
              <Image
                src='/images/Face.png'
                alt='Age Limit'
                width={28}
                height={28}
                className={`${ICON_SIZE} mb-1`}
              />
            }
            label='Age Limit'
            value={ageRating || 'N/A'}
          />
        </div>

        {/* Overview */}
        <div className='mb-10'>
          <h2 className='text-2xl font-bold mb-4'>Overview</h2>
          <p className='text-base text-gray-300'>{movieDetails.overview}</p>
        </div>

        {/* Cast & Crew */}
        <div>
          <h2 className='text-2xl font-bold mb-6'>Cast & Crew</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6'>
            {topCast.map((cast) => (
              <CastCard key={cast.id} cast={cast} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ---------- Metadata Card ----------
const MetadataCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className='bg-gray-800/70 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-lg'>
    {icon}
    <p className='text-xs text-gray-400 mt-1'>{label}</p>
    <p className='text-sm md:text-lg font-bold'>{value}</p>
  </div>
);
