// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import GroupPage from "./pages/GroupPage";
import PrivateGroupPage from "./pages/PrivateGroupPage";
import CreateGroup from "./pages/CreateGroup";
import GroupDetail from "./pages/GroupDetail";
import MemoryUploadPage from "./pages/MemoryUploadPage";
import PrivateMemoryAccessPage from "./pages/PrivateMemoryAccessPage";
import PrivateGroupAccessPage from "./pages/PrivateGroupAccessPage";
import MemoryDetailPage from "./pages/MemoryDetailPage";
import GlobalStyle from "./styles/GlobalStyle";

function App() {
  const [groups, setGroups] = useState([]);
  const [isPublic, setIsPublic] = useState(true);

  const addGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
  };

  const deleteGroup = (groupId) => {
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  const updateGroup = (updatedGroup) => {
    setGroups(
      groups.map((group) =>
        group.id === updatedGroup.id ? updatedGroup : group
      )
    );
  };

  // 그룹에 추억 추가 함수
  const addMemoryToGroup = (groupId, newMemory) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? { ...group, memories: [...(group.memories || []), newMemory] }
          : group
      )
    );
  };

  // 그룹 내 추억 업데이트 함수
  const updateMemoryInGroup = (groupId, updatedMemory) => {
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              memories: group.memories.map((memory) =>
                memory.id === updatedMemory.id ? updatedMemory : memory
              ),
            }
          : group
      )
    );
  };

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header isPublic={isPublic} setIsPublic={setIsPublic} />
              <GroupPage groups={groups.filter((group) => group.isPublic)} />
            </>
          }
        />
        <Route
          path="/private-group-access"
          element={
            <PrivateGroupAccessPage groups={groups} setIsPublic={setIsPublic} />
          }
        />
        <Route
          path="/private-group"
          element={
            <>
              <Header isPublic={false} setIsPublic={setIsPublic} />
              <PrivateGroupPage
                groups={groups.filter((group) => !group.isPublic)}
              />
            </>
          }
        />
        <Route
          path="/create-group"
          element={<CreateGroup addGroup={addGroup} />}
        />
        <Route
          path="/private-group/:groupId/private-memory-access"
          element={<PrivateMemoryAccessPage />}
        />
        <Route
          path="/group/:groupId"
          element={
            <GroupDetail
              groups={groups}
              onGroupDelete={deleteGroup}
              onGroupUpdate={updateGroup}
              addMemoryToGroup={addMemoryToGroup}
              updateMemoryInGroup={updateMemoryInGroup}
            />
          }
        />
        <Route
          path="/memory-upload/:groupId"
          element={
            <MemoryUploadPage
              groups={groups}
              addMemoryToGroup={addMemoryToGroup}
            />
          }
        />
        <Route
          path="/memory/:memoryId"
          element={
            <MemoryDetailPage
              groups={groups}
              updateMemoryInGroup={updateMemoryInGroup}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
