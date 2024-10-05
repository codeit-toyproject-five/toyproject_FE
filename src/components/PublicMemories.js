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
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    console.log("groupId (PublicMemories):", groupId); // groupId 확인

    // 공개 추억 가져오기
    const fetchPublicMemories = async () => {
      try {
        console.log("Fetching Public Memories for groupId:", groupId); // 그룹 ID 확인
        const data = await getGroupPosts(groupId, 1, 10, "latest", "", true); // isPublic을 boolean true로 전달
        console.log("Fetched Public Memories Data:", data); // 데이터 확인을 위한 로그

        // API 응답 구조에 따라 게시글 설정
        if (data.data) {
          setMemories(data.data);
        } else if (data.posts) {
          setMemories(data.posts);
        } else {
          setMemories([]); // 예상치 못한 구조일 경우 빈 배열 설정
        }

        setError(null); // 성공 시 에러 상태 초기화
      } catch (error) {
        console.error("Error fetching public memories:", error);
        setError("공개 추억을 가져오는 데 실패했습니다."); // 사용자에게 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };
    fetchPublicMemories();
  }, [groupId]);

  const handleCardClick = (memory) => {
    navigate(`/memory/${memory.id}`, { state: { memory } });
  };

  return (
    <PublicMemoryListContainer>
      {loading && <p>로딩 중...</p>} {/* 로딩 메시지 표시 */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* 에러 메시지 표시 */}
      {!loading && !error && memories && memories.length > 0
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
        : !loading &&
          !error && (
            <p>게시된 공개 추억이 없습니다.</p>
          ) // 데이터가 없을 때 메시지 표시
      }
    </PublicMemoryListContainer>
  );
};

export default PublicMemories;
