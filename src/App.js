// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import GroupPage from "./pages/GroupPage"; // 공개 그룹 페이지
import PrivateGroupAccess from "./pages/PrivateGroupAccess"; // 비공개 그룹 접근 페이지 (비밀번호 입력)
import PrivateGroupPage from "./pages/PrivateGroupPage"; // 비공개 그룹 페이지
import CreateGroup from "./pages/CreateGroup";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  const [isPublic, setIsPublic] = useState(true); // 공개/비공개 상태 관리

  return (
    <Router>
      <GlobalStyle />
      <Routes>
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
          element={
            <>
              <Header isPublic={true} setIsPublic={setIsPublic} />
              <CreateGroup />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
