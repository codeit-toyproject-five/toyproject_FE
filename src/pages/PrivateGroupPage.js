// src/pages/PrivateGroupPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GroupListContainer,
  EmptyState,
  EmptyMessage,
  CreateGroupButton,
} from "../styles/PrivateGroupPageStyle";

const PrivateGroupPage = () => {
  const privateGroups = []; // 비공개 그룹 데이터가 없다는 가정

  const navigate = useNavigate();

  const handleCreateGroupClick = () => {
    navigate("/create-group");
  };

  return (
    <GroupListContainer>
      {privateGroups.length > 0 ? (
        privateGroups.map((group) => (
          <div key={group.id}>
            {/* 그룹 카드 컴포넌트 등을 여기에 렌더링 */}
          </div>
        ))
      ) : (
        <EmptyState>
          <EmptyMessage>
            <img src="/empty-icon.png" alt="empty" />
            <p>등록된 비공개 그룹이 없습니다.</p>
            <p>가장 먼저 그룹을 만들어보세요!</p>
          </EmptyMessage>
          <CreateGroupButton onClick={handleCreateGroupClick}>
            그룹 만들기
          </CreateGroupButton>
        </EmptyState>
      )}
    </GroupListContainer>
  );
};

export default PrivateGroupPage;
