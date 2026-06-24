import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import "./MyPage.css";

type SavedMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type ActiveTab = "rated" | "wanted";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MyPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("rated");
  const [ratedMovies, setRatedMovies] = useState<SavedMovie[]>([]);
  const [wantedMovies, setWantedMovies] = useState<SavedMovie[]>([]);

  useEffect(() => {
    const savedRatedMovies = localStorage.getItem("ratedMovies");
    const savedWantedMovies = localStorage.getItem("wantedMovies");

    setRatedMovies(savedRatedMovies ? JSON.parse(savedRatedMovies) : []);
    setWantedMovies(savedWantedMovies ? JSON.parse(savedWantedMovies) : []);
  }, []);

  const currentMovies = activeTab === "rated" ? ratedMovies : wantedMovies;

  return (
    <>
      <Header
        searchValue=""
        onSearchValueChange={() => {}}
        onSearchSubmit={() => {}}
      />

      <main className="mypage">
        <section className="profile-card">
          <div className="profile-image">개인 사진</div>

          <div className="profile-info">
            <PageTitle>닉네임</PageTitle>
            <p>
              평가 영화 수 :{" "}
              <span className="highlight">{ratedMovies.length}</span>
            </p>
            <p>선호 장르 : 공포, 액션, 로맨스</p>
          </div>
        </section>

        <section className="movie-section">
          <div className="tab-menu">
            <button
              type="button"
              className={activeTab === "rated" ? "tab active" : "tab"}
              onClick={() => setActiveTab("rated")}
            >
              평가한 영화
            </button>

            <button
              type="button"
              className={activeTab === "wanted" ? "tab active" : "tab"}
              onClick={() => setActiveTab("wanted")}
            >
              보고싶은 영화
            </button>
          </div>

          {currentMovies.length === 0 ? (
            <p className="empty-text">
              {activeTab === "rated"
                ? "아직 평가한 영화가 없습니다."
                : "아직 보고싶은 영화가 없습니다."}
            </p>
          ) : (
            <div className="mypage-movie-grid">
              {currentMovies.map((movie) => (
                <article key={movie.id} className="mypage-movie-card">
                  {movie.poster_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      className="mypage-movie-poster"
                    />
                  ) : (
                    <div className="empty-poster">No Image</div>
                  )}

                  <strong className="mypage-movie-title">{movie.title}</strong>

                  <p className="mypage-movie-rating">
                    {movie.vote_average.toFixed(1)}
                    <span className="star">★</span>
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default MyPage;

const PageTitle = styled.h1`
  margin: 0 0 14px;
  color: #ffffff;
  font-size: 24px;
`;
