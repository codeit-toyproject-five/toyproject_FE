import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups } from "../api/groupApi"; // 그룹 리스트 API 함수 import
import {
  GroupListContainer,
  GroupCard,
  GroupCardTitle,
  GroupCardContent,
  GroupCardStats,
} from "../styles/PrivateGroupPageStyle";

const PrivateGroupPage = () => {
  const [groups, setGroups] = useState([]); // 그룹 상태 관리
  const navigate = useNavigate();

  const fetchPrivateGroups = async () => {
    try {
      const response = await getGroups(1, 10, "", false); // 비공개 그룹만 불러오기 (isPublic: false)
      console.log(response); // 응답 데이터 구조 확인
      setGroups(response.data || []); // 데이터가 배열인지 확인 후 설정
    } catch (error) {
      console.error("비공개 그룹 불러오기 실패:", error); // 오류 발생 시 콘솔에 출력
    }
  };

  useEffect(() => {
    fetchPrivateGroups(); // 컴포넌트가 마운트될 때 비공개 그룹 데이터를 불러옴
  }, []);

  const handleGroupClick = (group) => {
    navigate(`/private-group-access`, { state: { groupId: group.id } }); // 그룹 클릭 시 접근 페이지로 이동
  };

  return (
    <GroupListContainer>
      {groups.length > 0 ? (
        groups.map((group) => {
          // 로컬 저장소에서 좋아요 수 불러오기 (선택 사항)
          const savedLikes = localStorage.getItem(`group_likes_${group.id}`);
          const displayLikes = savedLikes
            ? parseInt(savedLikes, 10)
            : group.likes || 0;

          return (
            <GroupCard key={group.id} onClick={() => handleGroupClick(group)}>
              {}
              <GroupCardContent>
                <GroupCardTitle>{group.name}</GroupCardTitle>
                {/* 그룹명 표시 */}
                <p>{group.introduction}</p>
                <GroupCardStats>
                  <span>게시글 수: {group.postCount}</span>
                  <span style={{ marginLeft: "10px" }}>
                    공감 수: {displayLikes}
                  </span>
                </GroupCardStats>
              </GroupCardContent>
            </GroupCard>
          );
        })
      ) : (
        <p>등록된 비공개 그룹이 없습니다.</p>
      )}
    </GroupListContainer>
  );
};

export default PrivateGroupPage;
