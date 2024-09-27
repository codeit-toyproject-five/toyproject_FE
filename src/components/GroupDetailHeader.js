import React, { useState } from "react";
import {
  GroupHeaderContainer,
  GroupImage,
  GroupInfo,
  GroupTitle,
  GroupDescription,
  GroupStatistics,
  BadgeContainer,
  Badge,
  GroupActionButtonSmall, // 작게 만든 공감 보내기 버튼
  GroupLinkButton,
  GroupActionsContainer, // 수정 및 삭제 버튼 컨테이너
} from "../styles/GroupDetailHeaderStyle.js"; // 스타일 임포트
import GroupDeleteModal from "./GroupDeleteModal"; // 삭제 모달 컴포넌트 임포트

const GroupDetailHeader = ({ group, onEditClick }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // 삭제 모달 상태 관리

  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true); // 삭제 모달 열기
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false); // 삭제 모달 닫기
  };

  return (
    <>
      <GroupHeaderContainer>
        <GroupImage src={group.image} alt={group.title} />
        <GroupInfo>
          <GroupTitle>{group.title}</GroupTitle>
          <GroupDescription>{group.description}</GroupDescription>
          <GroupStatistics>
            <span>추억 {group.memories?.length || 0}</span> |{" "}
            <span>그룹 공감 {group.likes || 0}K</span>
          </GroupStatistics>
          <BadgeContainer>
            <Badge>7일 연속 추억 등록</Badge>
            <Badge>그룹 공감 1만 개 이상 받기</Badge>
            <Badge>추억 공감 1만 개 이상 받기</Badge>
          </BadgeContainer>
        </GroupInfo>

        {/* 그룹 수정 및 삭제 버튼을 오른쪽 상단에 배치 */}
        <GroupActionsContainer>
          <GroupLinkButton onClick={onEditClick}>
            그룹 정보 수정하기
          </GroupLinkButton>
          <GroupLinkButton onClick={handleOpenDeleteModal}>
            그룹 삭제하기
          </GroupLinkButton>
        </GroupActionsContainer>

        {/* 작게 만든 공감 보내기 버튼 */}
        <GroupActionButtonSmall>공감 보내기</GroupActionButtonSmall>
      </GroupHeaderContainer>

      {/* 삭제 모달 */}
      {isDeleteModalOpen && (
        <GroupDeleteModal onClose={handleCloseDeleteModal} />
      )}
    </>
  );
};

export default GroupDetailHeader;
