// src/pages/PrivateMemories.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PrivateMemoryListContainer,
  PrivateMemoryCard,
  MemoryInfo,
} from "../styles/PrivateMemoryStyle";

const PrivateMemories = ({ memories }) => {
  const navigate = useNavigate();

  const handleCardClick = (memory) => {
    // 비공개 추억 접근 시 비밀번호 입력 페이지로 이동
    navigate(`/private-group/${memory.groupId}/private-memory-access`, {
      state: { memory },
    });
  };

  return (
    <PrivateMemoryListContainer>
      {memories && memories.length > 0 ? (
        memories.map((memory) => (
          <PrivateMemoryCard
            key={memory.id}
            onClick={() => handleCardClick(memory)}
          >
            <MemoryInfo>
              <p>{memory.nickname} | 비공개</p>
              <h3>{memory.title}</h3>
            </MemoryInfo>
          </PrivateMemoryCard>
        ))
      ) : (
        <p>게시된 비공개 추억이 없습니다.</p>
      )}
    </PrivateMemoryListContainer>
  );
};

export default PrivateMemories;
