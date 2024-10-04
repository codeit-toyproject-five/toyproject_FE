// src/pages/PublicMemories.js
import React from "react";
import {
  MemoryListContainer,
  MemoryCard,
  MemoryImage,
  MemoryInfo,
  EmptyMessageContainer,
  EmptyMessage,
} from "../styles/GroupDetailStyle";

const PublicMemories = ({ memories }) => {
  return (
    <MemoryListContainer>
      {memories && memories.length > 0 ? (
        memories.map((memory) => (
          <MemoryCard key={memory.id}>
            {memory.imageUrl && (
              <MemoryImage src={memory.imageUrl} alt={memory.title} />
            )}
            <MemoryInfo>
              <p>작성자: {memory.nickname}</p>
              <p>제목: {memory.title}</p>
              <p>장소: {memory.location}</p>
            </MemoryInfo>
          </MemoryCard>
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
