import React, { useState } from "react";
import GroupDetailHeader from "../components/GroupDetailHeader";
import GroupEditModal from "../components/GroupEditModal";
import {
  GroupDetailContainer,
  MemoryListContainer,
  EmptyMessageContainer,
  EmptyMessage,
  FilterContainer,
  FilterButton,
  PostButton,
} from "../styles/GroupDetailStyle";
import { useNavigate } from "react-router-dom";

const GroupDetail = ({ group }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPublicMemory, setIsPublicMemory] = useState(true); // 공개/비공개 상태 관리
  const navigate = useNavigate();

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleMemoryUploadPage = () => {
    navigate("/memory-upload");
  };

  const publicMemories = group.memories.filter((memory) => memory.isPublic); // 공개 추억 필터링
  const privateMemories = group.memories.filter((memory) => !memory.isPublic); // 비공개 추억 필터링

  return (
    <GroupDetailContainer>
      <GroupDetailHeader group={group} onEditClick={handleOpenEditModal} />

      {/* 필터 버튼 */}
      <FilterContainer>
        <div style={{ display: "flex", gap: "10px" }}>
          <FilterButton
            active={isPublicMemory}
            onClick={() => setIsPublicMemory(true)}
          >
            공개
          </FilterButton>
          <FilterButton
            active={!isPublicMemory}
            onClick={() => setIsPublicMemory(false)}
          >
            비공개
          </FilterButton>
        </div>
        <PostButton onClick={handleMemoryUploadPage}>추억 올리기</PostButton>
      </FilterContainer>

      {/* 메모리 리스트 */}
      <MemoryListContainer>
        {isPublicMemory ? (
          publicMemories.length > 0 ? (
            publicMemories.map((memory) => (
              <div key={memory.id}>
                <p>{memory.title}</p>
              </div>
            ))
          ) : (
            <EmptyMessageContainer>
              <EmptyMessage>
                <img src="/empty-icon.png" alt="empty" />
                <p>게시된 공개 추억이 없습니다.</p>
                <p>첫 번째 공개 추억을 올려보세요!</p>
              </EmptyMessage>
            </EmptyMessageContainer>
          )
        ) : privateMemories.length > 0 ? (
          privateMemories.map((memory) => (
            <div key={memory.id}>
              <p>{memory.title}</p>
            </div>
          ))
        ) : (
          <EmptyMessageContainer>
            <EmptyMessage>
              <img src="/empty-icon.png" alt="empty" />
              <p>게시된 비공개 추억이 없습니다.</p>
              <p>첫 번째 비공개 추억을 올려보세요!</p>
            </EmptyMessage>
          </EmptyMessageContainer>
        )}
      </MemoryListContainer>

      {/* 그룹 수정 모달 */}
      {isEditModalOpen && (
        <GroupEditModal group={group} onClose={handleCloseEditModal} />
      )}
    </GroupDetailContainer>
  );
};

export default GroupDetail;
