import {
  SearchResults,
  Movie,
  VideoProps,
  MovieDetails,
  Credits,
  MovieReleaseDates,
} from '@/types';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_HEADER = {
  accept: 'application/json',
  Authorization: `Bearer ${process.env.NEXT_TMDB_READ_ACCESS_TOKEN}`,
};

/**
 * 🔹 Generic fetcher untuk endpoint TMDB.
 * Mengatur parameter umum & caching otomatis.
 */
const fetcher = async (url: URL, cacheTime: number = 60 * 60 * 24) => {
  url.searchParams.set('include_adult', 'false');
  url.searchParams.set('sort_by', 'popularity.desc');
  url.searchParams.set('language', 'en-US');
  url.searchParams.set('page', '1');

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: AUTH_HEADER,
    next: { revalidate: cacheTime },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from TMDB: ${response.statusText}`);
  }

  return (await response.json()) as SearchResults;
};

//
// === 1️⃣ HOME PAGE MOVIE LIST ===
//
export const getTrendingNow = async (): Promise<Movie[]> => {
  const url = new URL(`${TMDB_BASE_URL}/trending/movie/week`);
  const data = await fetcher(url);
  return data.results;
};

export const getNewRelease = async (): Promise<Movie[]> => {
  const url = new URL(`${TMDB_BASE_URL}/movie/now_playing`);
  const data = await fetcher(url);
  return data.results;
};

//
// === 2️⃣ DISCOVER & SEARCH ===
//
export const getDiscoverMovies = async (
  genreId?: string,
  keywords?: string
): Promise<Movie[]> => {
  const url = new URL(`${TMDB_BASE_URL}/discover/movie`);
  if (genreId) url.searchParams.set('with_genres', genreId);
  if (keywords) url.searchParams.set('with_keywords', keywords);

  const data = await fetcher(url);
  return data.results;
};

export const getSearchedMovies = async (term: string): Promise<Movie[]> => {
  const url = new URL(`${TMDB_BASE_URL}/search/movie`);
  url.searchParams.set('query', term);

  const data = await fetcher(url);
  return data.results;
};

//
// === 3️⃣ MOVIE DETAIL PAGE ===
//

/**
 * 🔹 Mengambil detail lengkap film berdasarkan ID.
 */
export const getMoviesDetails = async (id: string): Promise<MovieDetails> => {
  if (!id) throw new Error('Movie ID is required');

  const url = new URL(`${TMDB_BASE_URL}/movie/${id}`);
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: AUTH_HEADER,
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }

  return (await response.json()) as MovieDetails;
};

/**
 * 🔹 Mengambil daftar video (trailer) dari film.
 */
export const getMoviesVideos = async (id: string): Promise<VideoProps[]> => {
  if (!id) return [];

  const url = new URL(`${TMDB_BASE_URL}/movie/${id}/videos`);
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: AUTH_HEADER,
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) return [];

  const data = (await response.json()) as { results: VideoProps[] };
  return data.results;
};

/**
 * 🔹 Mengambil data cast & crew film.
 */
export const getMovieCredits = async (id: string): Promise<Credits> => {
  if (!id) throw new Error('Movie ID is required');

  const url = new URL(`${TMDB_BASE_URL}/movie/${id}/credits`);
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: AUTH_HEADER,
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch credits: ${response.statusText}`);
  }

  return (await response.json()) as Credits;
};

/**
 * 🔹 Mengambil klasifikasi usia (rating umur) film.
 */
export const getMovieAgeRating = async (id: string): Promise<string | null> => {
  if (!id) return null;

  const url = new URL(`${TMDB_BASE_URL}/movie/${id}/release_dates`);
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: AUTH_HEADER,
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as MovieReleaseDates;
  const preferredCountries = ['US', 'ID', 'GB', 'CA'];

  // Coba cari sertifikasi di negara prioritas terlebih dahulu
  for (const country of preferredCountries) {
    const release = data.results.find((r) => r.iso_3166_1 === country);
    const cert = release?.release_dates.find(
      (rd) =>
        rd.certification &&
        rd.certification !== 'NR' &&
        rd.certification !== 'Unrated'
    )?.certification;

    if (cert) return cert;
  }

  // Jika tidak ditemukan, cari sertifikasi valid pertama
  for (const r of data.results) {
    const cert = r.release_dates.find(
      (rd) =>
        rd.certification &&
        rd.certification !== 'NR' &&
        rd.certification !== 'Unrated'
    )?.certification;
    if (cert) return cert;
  }

  return null;
};
