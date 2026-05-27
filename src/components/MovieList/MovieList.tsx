import MovieCard from "../MovieCard/MovieCard";
import type { Movie } from "../../types/movie";
import "./MovieList.css";

interface MovieListProps {
  movies: Movie[];
  onLoadMore: () => void;
}

function MovieList({ movies, onLoadMore }: MovieListProps) {
  return (
    <section className="movie-list">
      <h2 className="movie-list-title">지금 인기있는 영화</h2>
      <div className="movies" data-movie-count={movies.length}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <button className="moreMovie" onClick={onLoadMore}>
        더보기
      </button>{" "}
    </section>
  );
}

export default MovieList;
