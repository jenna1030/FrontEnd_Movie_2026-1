import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../apis/popularMovieApi";
import { searchMovies } from "../apis/searchMovieApi";
import { fetchMovieDetail } from "../apis/movieDetailApi";
import Header from "../components/Header/Header";
import MovieList from "../components/MovieList/MovieList";
import MovieModal from "../components/MovieModal/MovieModal";
import type { Movie, MovieDetail } from "../types/movie";
import "../App.css";

function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    async function loadPopularMovies() {
      const popularMovies = await fetchPopularMovies(1);
      setMovies(popularMovies);
    }

    loadPopularMovies();
  }, []);

  async function handleLoadMore() {
    const nextPage = page + 1;

    const nextMovies = searchKeyword
      ? await searchMovies(searchKeyword, nextPage)
      : await fetchPopularMovies(nextPage);

    setMovies((prevMovies) => [...prevMovies, ...nextMovies]);
    setPage(nextPage);
  }

  async function handleSearchSubmit() {
    const trimmedKeyword = searchInput.trim();

    const firstPageMovies = trimmedKeyword
      ? await searchMovies(trimmedKeyword, 1)
      : await fetchPopularMovies(1);

    setSearchKeyword(trimmedKeyword);
    setMovies(firstPageMovies);
    setPage(1);
  }

  async function handleMovieClick(movieId: number) {
    const movieDetail = await fetchMovieDetail(movieId);
    setSelectedMovie(movieDetail);
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  const movieListTitle = searchKeyword
    ? `"${searchKeyword}" 검색 결과`
    : "지금 인기있는 영화";

  return (
    <>
      <Header
        searchValue={searchInput}
        onSearchValueChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <main className="main-content">
        <MovieList
          movies={movies}
          title={movieListTitle}
          onLoadMore={handleLoadMore}
          onMovieClick={handleMovieClick}
        />
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default HomePage;
