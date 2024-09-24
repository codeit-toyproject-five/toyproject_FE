// src/pages/GroupPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GroupListContainer,
  EmptyState,
  EmptyMessage,
  CreateGroupButton,
} from "../styles/GroupPageStyle";

const GroupPage = () => {
  const navigate = useNavigate();

  const publicGroups = []; // 빈 배열로 공개 그룹이 없다는 것을 가정

  const handleCreateGroup = () => {
    navigate("/create-group");
  };

  return (
    <GroupListContainer>
      {publicGroups.length > 0 ? (
        publicGroups.map((group) => (
          <div key={group.id}>
            {/* 그룹 카드 컴포넌트 등을 여기에 렌더링 */}
          </div>
        ))
      ) : (
        <EmptyState>
          <EmptyMessage>
            <img src="/empty-icon.png" alt="empty" />
            <p>등록된 공개 그룹이 없습니다.</p>
            <p>가장 먼저 그룹을 만들어보세요!</p>
          </EmptyMessage>
          <CreateGroupButton onClick={handleCreateGroup}>
            그룹 만들기
          </CreateGroupButton>
        </EmptyState>
      )}
    </GroupListContainer>
  );
};

export default GroupPage;
