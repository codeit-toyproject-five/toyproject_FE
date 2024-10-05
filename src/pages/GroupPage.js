import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups } from "../api/groupApi"; // 그룹 리스트 조회 API 함수 import
import {
  GroupListContainer,
  GroupCard,
  GroupCardImage,
  GroupCardContent,
  GroupCardTitle,
  GroupCardStats,
} from "../styles/GroupPageStyle";

const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroups();
        console.log("Fetched groups data:", data); // 서버 응답 데이터 구조 확인
        setGroups(data.data); // API로부터 받은 그룹 데이터 설정
      } catch (error) {
        console.error("그룹 리스트 불러오기 실패:", error);
      }
    };

    fetchGroups(); // 컴포넌트 마운트 시 그룹 리스트 조회
  }, []);

  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <GroupListContainer>
      {groups.length > 0 ? (
        groups.map((group) => (
          <GroupCard key={group.id} onClick={() => handleGroupClick(group.id)}>
            {group.imageUrl ? (
              <GroupCardImage src={group.imageUrl} alt={group.name} /> // 이미지 표시
            ) : (
              <GroupCardImage
                src="https://via.placeholder.com/150" // 기본 이미지
                alt="placeholder"
              />
            )}
            <GroupCardContent>
              <GroupCardTitle>{group.name}</GroupCardTitle>
              <p>{group.introduction}</p>
              <GroupCardStats>
                <span>좋아요: {group.likes || 0}</span> {/* 공감 수 필드 */}
                <span>게시글 수: {group.postCount}</span>
              </GroupCardStats>
            </GroupCardContent>
          </GroupCard>
        ))
      ) : (
        <p>등록된 그룹이 없습니다.</p>
      )}
    </GroupListContainer>
  );
};

export default GroupPage;
