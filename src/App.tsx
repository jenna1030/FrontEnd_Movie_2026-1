import { useEffect, useState } from "react";
import { fetchPopularMovies } from "./apis/popularMovieApi";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
import type { Movie } from "./types/movie";
import "./App.css";
import { searchMovies } from "./apis/searchMovieApi";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  //상태 기억
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function loadPopularMovies() {
      const popularMovies = await fetchPopularMovies();
      setMovies(popularMovies);
    }

    loadPopularMovies();
  }, []);

  async function nextPopularMovies() {
    const nextPage = page + 1;

    const nextMovies = await fetchPopularMovies(nextPage);
    setMovies((prevMovies) => [...prevMovies, ...nextMovies]);
    setPage(nextPage);
  }
  async function handleSearch(keyword: string) {
    const searchedMovies = await searchMovies(keyword, 1);
    setMovies(searchedMovies);
    setPage(1);
  }
  return (
    <>
      <Header onSearch={handleSearch} />

      <main className="main-content">
        <MovieList movies={movies} onLoadMore={nextPopularMovies} />
      </main>
    </>
  );
}

export default App;
