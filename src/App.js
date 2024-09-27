import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import GroupPage from "./pages/GroupPage"; // 공개 그룹 페이지
import PrivateGroupAccess from "./pages/PrivateGroupAccess"; // 비공개 그룹 접근 페이지 (비밀번호 입력)
import PrivateGroupPage from "./pages/PrivateGroupPage"; // 비공개 그룹 페이지
import CreateGroup from "./pages/CreateGroup"; // 그룹 만들기 페이지
import GroupDetail from "./pages/GroupDetail"; // 그룹 상세 페이지
import GlobalStyle from "./styles/GlobalStyle";

// Mock 데이터 추가
const mockGroupData = {
  id: 1,
  title: "달봉이네 가족",
  image: "/path-to-group-image.jpg", // 임시 이미지 경로
  likes: 1500,
  views: 1.5,
  memories: [], // 추억 목록
};

function App() {
  const [isPublic, setIsPublic] = useState(true); // 공개/비공개 상태 관리

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        {/* 그룹 만들기 페이지가 아닐 때만 헤더를 표시 */}
        <Route
          path="/"
          element={
            <>
              <Header isPublic={isPublic} setIsPublic={setIsPublic} />
              {isPublic ? <GroupPage /> : <PrivateGroupAccess />}{" "}
              {/* 공개 그룹과 비공개 그룹 구분 */}
            </>
          }
        />
        <Route
          path="/private-group-access"
          element={<PrivateGroupAccess />} // 헤더 없는 비밀번호 입력 페이지
        />
        <Route
          path="/private-group"
          element={
            <>
              <Header isPublic={false} setIsPublic={setIsPublic} />
              <PrivateGroupPage />
            </>
          }
        />
        <Route
          path="/create-group"
          element={<CreateGroup />} // 그룹 만들기 페이지에 헤더 제거
        />
        {/* 그룹 상세 페이지 추가 */}
        <Route
          path="/group/:id"
          element={<GroupDetail group={mockGroupData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
