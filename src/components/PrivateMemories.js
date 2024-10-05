import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGroupPosts } from "../api/postService"; // getGroupPosts 사용
import {
  PrivateMemoryListContainer,
  PrivateMemoryCard,
  MemoryInfo,
} from "../styles/PrivateMemoryStyle";

const PrivateMemories = () => {
  const [memories, setMemories] = useState([]);
  const [error, setError] = useState(null); // 에러 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const { groupId } = useParams(); // URL에서 그룹 ID 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    console.log("groupId (PrivateMemories):", groupId); // groupId 확인

    // 비공개 추억 가져오기
    const fetchPrivateMemories = async () => {
      try {
        console.log("Fetching Private Memories for groupId:", groupId); // 그룹 ID 확인
        const data = await getGroupPosts(groupId, 1, 10, "latest", "", false); // isPublic을 boolean false로 전달
        console.log("Fetched Private Memories Data:", data); // 데이터 확인을 위한 로그

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
        console.error("Error fetching private memories:", error);
        setError("비공개 추억을 가져오는 데 실패했습니다."); // 사용자에게 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };
    fetchPrivateMemories();
  }, [groupId]);

  const handleCardClick = (memory) => {
    // 비공개 추억 접근 시 비밀번호 입력 페이지로 이동
    navigate(`/private-group/${groupId}/private-memory-access`, {
      // memory.groupId 대신 groupId 사용
      state: { memory },
    });
  };

  return (
    <PrivateMemoryListContainer>
      {loading && <p>로딩 중...</p>} {/* 로딩 메시지 표시 */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* 에러 메시지 표시 */}
      {!loading && !error && memories && memories.length > 0
        ? memories.map((memory) => (
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
        : !loading &&
          !error && (
            <p>게시된 비공개 추억이 없습니다.</p>
          ) // 데이터가 없을 때 메시지 표시
      }
    </PrivateMemoryListContainer>
  );
};

export default PrivateMemories;
