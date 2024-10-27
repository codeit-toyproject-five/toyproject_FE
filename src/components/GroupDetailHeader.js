import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { likeGroup } from "../api/groupApi";
import {
  GroupHeaderContainer,
  GroupImage,
  GroupInfo,
  GroupTitle,
  GroupDescription,
  GroupStatistics,
  GroupActionButtonSmall,
  GroupActionsContainer,
  GroupLinkButton,
} from "../styles/GroupDetailHeaderStyle";
import GroupUpdateModal from "./GroupUpdateModal";
import GroupDeleteModal from "./GroupDeleteModal";

const GroupDetailHeader = ({ group, onGroupUpdate, onGroupDelete }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [likes, setLikes] = useState(group.likes || 0);
  const navigate = useNavigate();

  // 로컬 저장소에서 좋아요 수 불러오기
  useEffect(() => {
    const savedLikes = localStorage.getItem(`group_likes_${group.id}`);
    if (savedLikes) {
      setLikes(parseInt(savedLikes, 10));
    }
  }, [group.id]);

  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleGroupUpdate = (updatedGroup) => {
    onGroupUpdate(updatedGroup);
    if (updatedGroup.isPublic) {
      navigate("/"); // 공개 그룹으로 이동
    } else {
      navigate("/private-group"); // 비공개 그룹으로 이동
    }
  };

  const handleLikeClick = async () => {
    try {
      const response = await likeGroup(group.id);
      if (response.message === "그룹 공감하기 성공") {
        setLikes((prevLikes) => {
          const newLikes = prevLikes + 1;
          localStorage.setItem(`group_likes_${group.id}`, newLikes); // 로컬 저장소에 저장
          return newLikes;
        });
      }
    } catch (error) {
      console.error("Error liking group:", error);
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
          <span>그룹 공감 {likes}</span>
        </GroupStatistics>
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
      </GroupActionButtonSmall>
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
