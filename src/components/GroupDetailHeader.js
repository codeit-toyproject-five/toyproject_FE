import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigate 추가
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
  const navigate = useNavigate(); // navigate 추가

  const groupImageSrc =
    group.groupImage instanceof File
      ? URL.createObjectURL(group.groupImage)
      : group.groupImage;

  const handleUpdateClick = () => {
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleGroupUpdate = (updatedGroup) => {
    onGroupUpdate(updatedGroup);
    // 그룹 공개 여부에 따른 리디렉션 처리
    if (updatedGroup.isPublic) {
      navigate("/"); // 공개 그룹 목록으로 이동
    } else {
      navigate("/private-group"); // 비공개 그룹 목록으로 이동
    }
  };

  return (
    <GroupHeaderContainer>
      {groupImageSrc && (
        <GroupImage src={groupImageSrc} alt={group.groupName || group.title} />
      )}
      <GroupInfo>
        <GroupTitle>{group.groupName || group.title}</GroupTitle>
        <GroupDescription>{group.description}</GroupDescription>
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

      {/* Modals */}
      {isUpdateModalOpen && (
        <GroupUpdateModal
          group={group}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={handleGroupUpdate}
        />
      )}
      {isDeleteModalOpen && (
        <GroupDeleteModal
          group={group} // group 객체를 모달로 전달
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={onGroupDelete}
        />
      )}
    </GroupHeaderContainer>
  );
};

export default GroupDetailHeader;
