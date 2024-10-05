import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGroupPosts } from "../api/postService"; // getGroupPosts 사용
import {
  PublicMemoryListContainer,
  PublicMemoryCard,
  MemoryImage,
  MemoryInfo,
  Tags,
} from "../styles/PublicMemoryStyle";

const PublicMemories = () => {
  const [memories, setMemories] = useState([]);
  const { groupId } = useParams(); // URL에서 그룹 ID 가져오기
  const navigate = useNavigate();
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    // 공개 추억 가져오기
    const fetchPublicMemories = async () => {
      try {
        const data = await getGroupPosts(groupId, 1, 10, "latest", "", "true"); // isPublic을 문자열 "true"로 변경
        setMemories(data.data); // 서버로부터 받은 게시글 리스트를 설정
      } catch (error) {
        console.error("Error fetching public memories:", error);
        setError("공개 추억을 가져오는 데 실패했습니다."); // 사용자에게 에러 메시지 설정
      }
    };
    fetchPublicMemories();
  }, [groupId]);

  const handleCardClick = (memory) => {
    navigate(`/memory/${memory.id}`, { state: { memory } });
  };

  return (
    <PublicMemoryListContainer>
      {error && <p>{error}</p>}
      {!error && memories && memories.length > 0
        ? memories.map((memory) => (
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
                  {memory.tags && memory.tags.length > 0 ? (
                    memory.tags.map((tag, index) => (
                      <span key={index}>#{tag.trim()}</span>
                    ))
                  ) : (
                    <span>#태그없음</span>
                  )}
                </Tags>
                <p>
                  {memory.location} ・ {memory.moment}
                </p>
              </MemoryInfo>
            </PublicMemoryCard>
          ))
        : !error && <p>게시된 공개 추억이 없습니다.</p>}
    </PublicMemoryListContainer>
  );
};

export default PublicMemories;
