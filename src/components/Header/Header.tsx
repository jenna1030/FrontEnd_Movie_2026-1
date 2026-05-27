import logoImg from "../../assets/Logo.png";
import "./Header.css";
import React, { useState } from "react";
interface HeaderProps {
  onSearch: (keyword: string) => void;
}

function Header({ onSearch }: HeaderProps) {
  const [keyword, setKeyword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keyword.trim() === "") return;

    onSearch(keyword);
  };
  return (
    <header className="header">
      <img src={logoImg} alt="Movie Beginner Logo" />
      <form className="search-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit" className="search-btn">
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </form>
    </header>
  );
}

export default Header;
