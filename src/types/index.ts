// src/types/index.ts

// ====== Movie Basic Types ======
export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
  backdrop_path?: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  original_language: string;
};

// Digunakan untuk hasil pencarian & list TMDB
export type SearchResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

// ====== Video / Trailer Types ======
export type VideoProps = {
  id: string;
  key: string;
  name: string;
  site: string; // YouTube, Vimeo, etc.
  type: string; // Trailer, Teaser, dll.
  official: boolean;
  published_at: string;
};

export type Videos = {
  id: number;
  results: VideoProps[];
};

// ====== Credits (Cast & Crew) ======
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

// ====== Movie Detail ======
export type MovieDetails = Movie & {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
};

// ====== Release Dates / Age Rating ======
export interface ReleaseDate {
  certification: string;
  release_date: string;
  iso_639_1: string;
  note: string;
  type: number;
}

export interface ReleaseDatesResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface MovieReleaseDates {
  id: number;
  results: ReleaseDatesResult[];
}

// ====== Favorites Feature ======
export interface MovieData {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
}

// Context global untuk fitur Favorite (localStorage)
export interface FavoritesContextType {
  favorites: MovieData[];
  addFavorite: (movie: MovieData) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  showToast: boolean;
  toastMessage: string;
}
