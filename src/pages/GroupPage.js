import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GroupListContainer,
  GroupCard,
  GroupCardImage,
  GroupCardContent,
  GroupCardTitle,
  GroupCardStats,
} from "../styles/GroupPageStyle";

const GroupPage = ({ groups }) => {
  const navigate = useNavigate();

  // 그룹의 이미지 URL을 미리 관리하기 위한 상태
  const [groupImages, setGroupImages] = useState({});

  useEffect(() => {
    // 그룹 이미지가 File 객체인지 확인하고 URL 생성
    const updatedImages = {};
    groups.forEach((group) => {
      if (group.groupImage instanceof File) {
        const imageURL = URL.createObjectURL(group.groupImage);
        updatedImages[group.id] = imageURL;
      } else {
        updatedImages[group.id] = group.groupImage;
      }
    });
    setGroupImages(updatedImages);

    // 메모리 누수를 방지하기 위해 clean-up 함수 추가
    return () => {
      Object.values(updatedImages).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [groups]);

  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <GroupListContainer>
      {groups.length > 0 ? (
        groups
          .filter((group) => group.isPublic)
          .map((group) => (
            <GroupCard
              key={group.id}
              onClick={() => handleGroupClick(group.id)}
            >
              {groupImages[group.id] && (
                <GroupCardImage
                  src={groupImages[group.id]}
                  alt={group.groupName}
                />
              )}
              <GroupCardContent>
                <GroupCardTitle>{group.groupName}</GroupCardTitle>
                <p>{group.description}</p> {/* 그룹 한줄 소개 표시 */}
                <GroupCardStats>
                  <span>좋아요: {group.likes}</span>
                  <span>조회수: {group.views}K</span>
                </GroupCardStats>
              </GroupCardContent>
            </GroupCard>
          ))
      ) : (
        <p>등록된 공개 그룹이 없습니다.</p>
      )}
    </GroupListContainer>
  );
};

export default GroupPage;
