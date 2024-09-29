import React from "react";
import {
  MemoryListContainer,
  EmptyMessageContainer,
  EmptyMessage,
} from "../styles/GroupDetailStyle"; // 스타일 임포트

const PublicMemories = ({ memories }) => {
  const publicMemories = memories.filter((memory) => memory.isPublic); // 공개된 추억만 필터링

  return (
    <MemoryListContainer>
      {publicMemories.length > 0 ? (
        publicMemories.map((memory) => (
          <div key={memory.id}>
            <p>{memory.title}</p>
          </div>
        ))
      ) : (
        <EmptyMessageContainer>
          <EmptyMessage>
            <img src="/empty-icon.png" alt="empty" />
            <p>게시된 공개 추억이 없습니다.</p>
            <p>첫 번째 공개 추억을 올려보세요!</p>
          </EmptyMessage>
        </EmptyMessageContainer>
      )}
    </MemoryListContainer>
  );
};

export default PublicMemories;
