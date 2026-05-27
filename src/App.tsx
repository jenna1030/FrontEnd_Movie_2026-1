import { useEffect, useState } from "react";
import { fetchPopularMovies } from "./apis/popularMovieApi";
import { searchMovies } from "./apis/searchMovieApi";
// 모달 구현 추가: 카드 클릭 시 상세 정보를 가져오는 API입니다.
import { fetchMovieDetail } from "./apis/movieDetailApi";
import Header from "./components/Header/Header";
import MovieList from "./components/MovieList/MovieList";
// 모달 구현 추가: 선택한 영화 정보를 보여줄 모달 컴포넌트입니다.
import MovieModal from "./components/MovieModal/MovieModal";
import type { Movie, MovieDetail } from "./types/movie";
import "./App.css";

function App() {
  // 화면에 보여줄 영화 목록을 기억하는 state
  // 여러 영화가 들어가니까 배열([])로 시작한다.
  const [movies, setMovies] = useState<Movie[]>([]);

  // 현재 몇 페이지까지 불러왔는지 기억하는 state
  // 처음에는 1페이지를 보여줄 예정이라 1로 시작한다.
  const [page, setPage] = useState(1);

  // 검색창에 사용자가 입력 중인 글자를 기억하는 state
  const [searchInput, setSearchInput] = useState("");

  // 실제로 검색 버튼을 눌러서 검색에 사용된 단어를 기억하는 state
  // 검색 결과에서 더보기를 누를 때 이 값으로 다음 페이지를 불러온다.
  const [searchKeyword, setSearchKeyword] = useState("");

  // 모달 구현 추가: 모달에 보여줄 영화 상세 정보를 기억하는 state
  // 처음에는 선택한 영화가 없으니까 null로 시작한다.
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);

  // App이 처음 화면에 나타날 때 인기 영화 1페이지를 불러온다.
  useEffect(() => {
    async function loadPopularMovies() {
      const popularMovies = await fetchPopularMovies(1);
      setMovies(popularMovies);
    }

    loadPopularMovies();
  }, []);

  // 더보기 버튼을 눌렀을 때 실행되는 함수
  async function handleLoadMore() {
    const nextPage = page + 1;

    // 검색어가 있으면 검색 결과의 다음 페이지를 불러오고,
    // 검색어가 없으면 인기 영화의 다음 페이지를 불러온다.
    const nextMovies = searchKeyword
      ? await searchMovies(searchKeyword, nextPage)
      : await fetchPopularMovies(nextPage);

    // 기존 영화 목록 뒤에 새로 받아온 영화들을 붙인다.
    setMovies((prevMovies) => [...prevMovies, ...nextMovies]);

    // 현재 페이지 번호를 다음 페이지로 바꾼다.
    setPage(nextPage);
  }

  // 검색 form을 제출했을 때 실행되는 함수
  async function handleSearchSubmit() {
    const trimmedKeyword = searchInput.trim();

    // 검색어가 있으면 검색 API를 호출하고,
    // 검색어가 비어 있으면 다시 인기 영화 1페이지를 불러온다.
    const firstPageMovies = trimmedKeyword
      ? await searchMovies(trimmedKeyword, 1)
      : await fetchPopularMovies(1);

    // 실제 검색에 사용된 단어를 저장한다.
    setSearchKeyword(trimmedKeyword);

    // 화면의 영화 목록을 새 결과로 교체한다.
    setMovies(firstPageMovies);

    // 새 검색은 항상 1페이지부터 시작한다.
    setPage(1);
  }

  // 모달 구현 추가: 영화 카드를 클릭했을 때 실행되는 함수
  async function handleMovieClick(movieId: number) {
    // 클릭한 영화 id로 상세 API를 호출한다.
    const movieDetail = await fetchMovieDetail(movieId);

    // 받아온 상세 정보를 selectedMovie에 저장한다.
    // 이 값이 null이 아니게 되면 아래에서 모달이 열린다.
    setSelectedMovie(movieDetail);
  }

  // 모달 구현 추가: 모달 닫기 버튼을 눌렀을 때 실행되는 함수
  function handleCloseModal() {
    // 선택한 영화를 비우면 모달이 사라진다.
    setSelectedMovie(null);
  }

  // 검색 중이면 검색 결과 제목을 보여주고,
  // 검색 중이 아니면 인기 영화 제목을 보여준다.
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

      {/* 모달 구현 추가: selectedMovie가 있을 때만 모달을 보여줍니다. */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
