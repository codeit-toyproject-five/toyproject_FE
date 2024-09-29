import React from "react";
import {
  MemoryListContainer,
  EmptyMessageContainer,
  EmptyMessage,
} from "../styles/GroupDetailStyle"; // 스타일 임포트

const PrivateMemories = ({ memories }) => {
  const privateMemories = memories.filter((memory) => !memory.isPublic); // 비공개된 추억만 필터링

  return (
    <MemoryListContainer>
      {privateMemories.length > 0 ? (
        privateMemories.map((memory) => (
          <div key={memory.id}>
            <p>{memory.title}</p>
          </div>
        ))
      ) : (
        <EmptyMessageContainer>
          <EmptyMessage>
            <img src="/empty-icon.png" alt="empty" />
            <p>게시된 비공개 추억이 없습니다.</p>
            <p>첫 번째 비공개 추억을 올려보세요!</p>
          </EmptyMessage>
        </EmptyMessageContainer>
      )}
    </MemoryListContainer>
  );
};

export default PrivateMemories;
