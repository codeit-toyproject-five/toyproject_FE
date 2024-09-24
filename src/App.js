import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PublicGroupList from "./components/PublicGroupList";
import PrivateGroupList from "./components/PrivateGroupList";
import CreateGroup from "./pages/CreateGroup"; // 그룹 만들기 페이지
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  // 공개/비공개 상태 관리
  const [isPublic, setIsPublic] = useState(true);

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        {/* Header가 포함된 페이지 */}
        <Route
          path="/"
          element={
            <>
              <Header isPublic={isPublic} setIsPublic={setIsPublic} />
              {isPublic ? <PublicGroupList /> : <PrivateGroupList />}
            </>
          }
        />
        {/* 그룹 만들기 페이지는 Header 없이 */}
        <Route path="/create-group" element={<CreateGroup />} />
      </Routes>
    </Router>
  );
}

export default App;
