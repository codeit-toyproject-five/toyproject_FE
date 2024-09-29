import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import GroupPage from "./pages/GroupPage";
import PrivateGroupAccess from "./pages/PrivateGroupAccess";
import PrivateGroupPage from "./pages/PrivateGroupPage";
import CreateGroup from "./pages/CreateGroup";
import GroupDetail from "./pages/GroupDetail";
import MemoryUploadPage from "./pages/MemoryUploadPage.js"; // 추억 올리기 페이지 추가
import GlobalStyle from "./styles/GlobalStyle";

const mockGroupData = {
  id: 1,
  title: "달봉이네 가족",
  image: "/path-to-group-image.jpg",
  likes: 1500,
  views: 1.5,
  memories: [],
};

function App() {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header isPublic={isPublic} setIsPublic={setIsPublic} />
              {isPublic ? <GroupPage /> : <PrivateGroupAccess />}
            </>
          }
        />
        <Route path="/private-group-access" element={<PrivateGroupAccess />} />
        <Route
          path="/private-group"
          element={
            <>
              <Header isPublic={false} setIsPublic={setIsPublic} />
              <PrivateGroupPage />
            </>
          }
        />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route
          path="/group/:id"
          element={<GroupDetail group={mockGroupData} />}
        />
        <Route
          path="/memory-upload"
          element={<MemoryUploadPage />} // 추억 올리기 페이지 경로
        />
      </Routes>
    </Router>
  );
}

export default App;
