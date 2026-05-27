import MovieCard from "../MovieCard/MovieCard";
import type { Movie } from "../../types/movie";
import "./MovieList.css";

interface MovieListProps {
  movies: Movie[];
  onLoadMore: () => void;
  // 모달 구현 추가: App에서 영화 카드 클릭 함수를 받아옵니다.
  onMovieClick?: (movieId: number) => void;
  // 검색 결과 제목을 App에서 넘겨줄 수 있게 추가했습니다.
  title?: string;
}

function MovieList({
  movies,
  onLoadMore,
  onMovieClick,
  title = "지금 인기있는 영화",
}: MovieListProps) {
  return (
    <section className="movie-list">
      <h2 className="movie-list-title">{title}</h2>
      <div className="movies" data-movie-count={movies.length}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            // 모달 구현 추가: 카드 클릭 시 선택한 영화 id를 App으로 올려보냅니다.
            onClick={onMovieClick ? () => onMovieClick(movie.id) : undefined}
          />
        ))}
      </div>
      <button className="moreMovie" onClick={onLoadMore}>
        더보기
      </button>
    </section>
  );
}

export default MovieList;
