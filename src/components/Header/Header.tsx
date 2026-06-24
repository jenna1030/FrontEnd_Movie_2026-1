import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/Logo.png";
import myPageIcon from "../../assets/myPageIcon.png";
import "./Header.css";

interface HeaderProps {
  onSearch?: (keyword: string) => void;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  onSearchSubmit?: () => void;
}

function Header({
  onSearch,
  searchValue = "",
  onSearchValueChange,
  onSearchSubmit,
}: HeaderProps) {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (onSearchSubmit) {
      onSearchSubmit();
      return;
    }

    if (searchValue.trim() === "") return;
    onSearch?.(searchValue);
  }

  return (
    <header className="header">
      <img src={logoImg} alt="Movie Beginner Logo" />

      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="검색"
          value={searchValue}
          onChange={(event) => onSearchValueChange?.(event.target.value)}
        />
        <button type="submit" className="search-btn" aria-label="검색">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
              stroke="#101828"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>

      <button
        type="button"
        className="mypage-button"
        onClick={() => navigate("/mypage")}
        aria-label="마이페이지"
      >
        <img src={myPageIcon} alt="마이페이지" />
      </button>
    </header>
  );
}

export default Header;
