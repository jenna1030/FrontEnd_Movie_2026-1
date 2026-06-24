import type { Movie } from "../types/movie";

const FAVORITE_MOVIES_KEY = "favoriteMovies";

export type StoredMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

function convertMovie(movie: Movie): StoredMovie {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
  };
}

export function getFavoriteMovies(): StoredMovie[] {
  const savedMovies = localStorage.getItem(FAVORITE_MOVIES_KEY);

  if (!savedMovies) {
    return [];
  }

  return JSON.parse(savedMovies);
}

export function saveFavoriteMovie(movie: Movie) {
  const favoriteMovies = getFavoriteMovies();
  const isAlreadySaved = favoriteMovies.some(
    (favoriteMovie) => favoriteMovie.id === movie.id,
  );

  if (isAlreadySaved) {
    return;
  }

  const newFavoriteMovies = [...favoriteMovies, convertMovie(movie)];
  localStorage.setItem(FAVORITE_MOVIES_KEY, JSON.stringify(newFavoriteMovies));
}

export function removeFavoriteMovie(movieId: number) {
  const favoriteMovies = getFavoriteMovies();
  const filteredMovies = favoriteMovies.filter((movie) => movie.id !== movieId);

  localStorage.setItem(FAVORITE_MOVIES_KEY, JSON.stringify(filteredMovies));
}

export function isFavoriteMovie(movieId: number) {
  return getFavoriteMovies().some((movie) => movie.id === movieId);
}
