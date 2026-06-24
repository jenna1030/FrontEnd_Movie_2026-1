import Header from "../components/Header/Header";

function MyPage() {
  return (
    <>
      <Header
        searchValue=""
        onSearchValueChange={() => {}}
        onSearchSubmit={() => {}}
      />
      <main className="main-content">
        <h1>마이페이지</h1>
        <p>마이페이지 테스트 화면입니다.</p>
      </main>
    </>
  );
}

export default MyPage;
