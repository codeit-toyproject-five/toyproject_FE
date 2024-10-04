import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleGroupUpdate = (updatedGroup) => {
    onGroupUpdate(updatedGroup);
    // Redirect based on group visibility
    if (updatedGroup.isPublic) {
      navigate("/"); // Navigate to public groups
    } else {
      navigate("/private-group"); // Navigate to private groups
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
          <span>그룹 공감 {group.likes || 0}K</span>
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
      <GroupActionButtonSmall>공감 보내기</GroupActionButtonSmall>

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
