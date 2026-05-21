import starIcon from '../../assets/star-icon.svg'
import { IMAGE_BASE_URL } from '../../constants/movie'
import type { Movie } from '../../types/movie'
import './MovieCard.css'

interface MovieCardProps {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="movie-card" data-movie-id={movie.id}>
      <img
        className="movie-card-poster"
        src={IMAGE_BASE_URL + movie.poster_path}
        alt={movie.title}
      />

      <h3 className="movie-card-title">{movie.title}</h3>

      <div className="movie-card-rating">
        <span className="movie-card-rating-value">
          {movie.vote_average.toFixed(1)}
        </span>

        <img className="movie-card-star" src={starIcon} alt="별점" />
      </div>
    </div>
  )
}

export default MovieCard
