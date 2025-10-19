import React from 'react';
import Image from 'next/image';

// 🧑‍🎬 Tipe data untuk setiap anggota pemeran (cast)
interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

// Props untuk komponen CastCard
interface CastCardProps {
  cast: CastMember;
}

// URL dasar untuk gambar profil dari TMDB
const PROFILE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

/**
 * 🎭 CastCard
 * Menampilkan kartu profil pemeran (aktor/aktris) pada halaman detail film.
 * - Menampilkan foto, nama, dan karakter yang diperankan.
 * - Jika tidak ada foto, akan menampilkan ikon placeholder.
 */
export default function CastCard({ cast }: CastCardProps) {
  const profileUrl = cast.profile_path
    ? `${PROFILE_BASE_URL}${cast.profile_path}`
    : null;

  return (
    <div className='text-center'>
      {/* Foto Profil atau Placeholder */}
      <div className='aspect-square w-full rounded-full overflow-hidden mx-auto bg-gray-700 shadow-md'>
        {profileUrl ? (
          <Image
            src={profileUrl}
            alt={`Profile of ${cast.name}`}
            width={200}
            height={200}
            className='object-cover w-full h-full'
            loading='lazy' // ✅ Optimisasi performa
          />
        ) : (
          <div
            className='w-full h-full flex items-center justify-center'
            aria-label='No profile available'
          >
            <span className='text-4xl'>👤</span>
          </div>
        )}
      </div>

      {/* Informasi Pemeran */}
      <p className='mt-2 text-sm font-semibold truncate'>{cast.name}</p>
      <p className='text-xs text-gray-400 truncate'>{cast.character}</p>
    </div>
  );
}
