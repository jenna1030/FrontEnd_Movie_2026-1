import type { FormEvent } from "react";
import logoImg from "../../assets/Logo.png";
import "./Header.css";

interface HeaderProps {
  // 기존 검색 방식과 새 검색 방식을 둘 다 받을 수 있게 optional로 둡니다.
  onSearch?: (keyword: string) => void;
  // 모달 구현 추가: 현재 App.tsx에서 내려주는 검색창 값입니다.
  searchValue?: string;
  // 모달 구현 추가: 검색창 입력값이 바뀔 때 App state를 바꿉니다.
  onSearchValueChange?: (value: string) => void;
  // 모달 구현 추가: 검색 form 제출 시 App의 검색 함수를 실행합니다.
  onSearchSubmit?: () => void;
}

function Header({
  onSearch,
  searchValue = "",
  onSearchValueChange,
  onSearchSubmit,
}: HeaderProps) {
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
    </header>
  );
}

export default Header;
