import starIcon from "../../assets/star-icon.svg";
import { IMAGE_BASE_URL } from "../../constants/movie";
import type { MovieDetail } from "../../types/movie";
import "./MovieModal.css";

interface MovieModalProps {
  movie: MovieDetail;
  onClose: () => void;
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  // 모달 구현 추가: 상세 API의 genres 배열을 화면에 보여줄 문자열로 바꿉니다.
  const genreText = movie.genres.map((genre) => genre.name).join(", ");
  const posterSrc = movie.poster_path
    ? IMAGE_BASE_URL + movie.poster_path
    : "/favicon.svg";

  return (
    <div className="movie-modal-backdrop">
      <section className="movie-modal">
        <header className="movie-modal-header">
          <h2>{movie.title}</h2>
          <button
            className="movie-modal-close"
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
          >
            X
          </button>
        </header>

        <div className="movie-modal-content">
          <img className="movie-modal-poster" src={posterSrc} alt={movie.title} />

          <div className="movie-modal-info">
            <p className="movie-modal-meta">
              {genreText}
              <img src={starIcon} alt="별점" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </p>

            <p className="movie-modal-overview">
              {movie.overview || "영화 소개가 아직 없습니다."}
            </p>

            <div className="movie-modal-rating-box">
              <span>내 별점</span>
              <span className="movie-modal-stars">★★★☆☆</span>
              <span>6 보통이에요</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MovieModal;
