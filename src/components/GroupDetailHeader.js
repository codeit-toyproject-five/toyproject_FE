import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { likeGroup } from "../api/groupApi"; // likeGroup 함수 추가
import {
  GroupHeaderContainer,
  GroupImage,
  GroupInfo,
  GroupTitle,
  GroupDescription,
  GroupStatistics,
  BadgeContainer,
  Badge,
  GroupActionButtonSmall,
  GroupActionsContainer,
  GroupLinkButton,
} from "../styles/GroupDetailHeaderStyle";
import GroupUpdateModal from "./GroupUpdateModal";
import GroupDeleteModal from "./GroupDeleteModal";

const GroupDetailHeader = ({ group, onGroupUpdate, onGroupDelete }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [likes, setLikes] = useState(group.likes || 0); // 공감 수를 상태로 관리
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleGroupUpdate = (updatedGroup) => {
    onGroupUpdate(updatedGroup);
    if (updatedGroup.isPublic) {
      navigate("/"); // Navigate to public groups
    } else {
      navigate("/private-group"); // Navigate to private groups
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = await likeGroup(group.id); // likeGroup API 호출
      if (response.message === "그룹 공감하기 성공") {
        setLikes((prevLikes) => prevLikes + 1); // 공감 수 증가
      }
    } catch (error) {
      console.error("Error liking group:", error);
      // 오류 처리
    }
  };

  return (
    <GroupHeaderContainer>
      {group.imageUrl && (
        <GroupImage src={group.imageUrl} alt={group.name || group.title} />
      )}
      <GroupInfo>
        <GroupTitle>{group.name || group.title}</GroupTitle>
        <GroupDescription>{group.introduction}</GroupDescription>
        <GroupStatistics>
          <span>추억 {group.memories?.length || 0}</span> |{" "}
          <span>그룹 공감 {likes}</span> {/* likes 상태를 사용 */}
        </GroupStatistics>
        <BadgeContainer>
          <Badge>🌟 7일 연속 추억 등록</Badge>
          <Badge>🎉 그룹 공감 1만 개 이상 받기</Badge>
          <Badge>💖 추억 공감 1만 개 이상 받기</Badge>
        </BadgeContainer>
      </GroupInfo>
      <GroupActionsContainer>
        <GroupLinkButton onClick={handleUpdateClick}>
          그룹 정보 수정하기
        </GroupLinkButton>
        <GroupLinkButton onClick={handleDeleteClick}>
          그룹 삭제하기
        </GroupLinkButton>
      </GroupActionsContainer>
      <GroupActionButtonSmall onClick={handleLikeClick}>
        공감 보내기
      </GroupActionButtonSmall>{" "}
      {/* 공감 보내기 버튼에 클릭 이벤트 추가 */}
      {isUpdateModalOpen && (
        <GroupUpdateModal
          group={group}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={handleGroupUpdate}
        />
      )}
      {isDeleteModalOpen && (
        <GroupDeleteModal
          group={group}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={onGroupDelete}
        />
      )}
    </GroupHeaderContainer>
  );
};

export default GroupDetailHeader;
