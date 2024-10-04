// src/pages/PublicMemories.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PublicMemoryListContainer,
  PublicMemoryCard,
  MemoryImage,
  MemoryInfo,
  Tags,
} from "../styles/PublicMemoryStyle";

const PublicMemories = ({ memories }) => {
  const navigate = useNavigate();

  const handleCardClick = (memory) => {
    navigate(`/memory/${memory.id}`, { state: { memory } });
  };

  return (
    <PublicMemoryListContainer>
      {memories && memories.length > 0 ? (
        memories.map((memory) => (
          <PublicMemoryCard
            key={memory.id}
            onClick={() => handleCardClick(memory)}
          >
            {memory.imageUrl && (
              <MemoryImage src={memory.imageUrl} alt={memory.title} />
            )}
            <MemoryInfo>
              <p>{memory.nickname} | 공개</p>
              <h3>{memory.title}</h3>
              <Tags>
                {memory.tags.split(",").map((tag, index) => (
                  <span key={index}>#{tag.trim()}</span>
                ))}
              </Tags>
              <p>
                {memory.location} ・ {memory.date}
              </p>
            </MemoryInfo>
          </PublicMemoryCard>
        ))
      ) : (
        <p>게시된 공개 추억이 없습니다.</p>
      )}
    </PublicMemoryListContainer>
  );
};

export default PublicMemories;
