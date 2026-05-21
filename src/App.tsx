import { useEffect, useState } from 'react'
import { fetchPopularMovies } from './apis/movieApi'
import Header from './components/Header/Header'
import MovieList from './components/MovieList/MovieList'
import type { Movie } from './types/movie'
import './App.css'

function App() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    async function loadPopularMovies() {
      const popularMovies = await fetchPopularMovies()
      setMovies(popularMovies)
    }

    loadPopularMovies()
  }, [])

  return (
    <>
      <Header />

      <main className="main-content">
        <MovieList movies={movies} />
      </main>
    </>
  )
}

export default App
