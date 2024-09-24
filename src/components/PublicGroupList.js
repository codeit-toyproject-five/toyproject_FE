import React from "react";
import GroupCard from "./GroupCard";
import {
  GroupListContainer,
  EmptyState,
  EmptyMessage,
  CreateGroupButton,
} from "../styles/GroupListStyle";

// 공개 그룹 가짜 데이터 (데이터 없음)
const publicGroups = [];

const PublicGroupList = () => {
  return (
    <GroupListContainer>
      {publicGroups.length > 0 ? (
        publicGroups.map((group) => <GroupCard key={group.id} group={group} />)
      ) : (
        <EmptyState>
          <EmptyMessage>
            <img src="/empty-icon.png" alt="empty" />
            <p>등록된 공개 그룹이 없습니다.</p>
            <p>가장 먼저 그룹을 만들어보세요!</p>
          </EmptyMessage>
          <CreateGroupButton>그룹 만들기</CreateGroupButton>
        </EmptyState>
      )}
    </GroupListContainer>
  );
};

export default PublicGroupList;
