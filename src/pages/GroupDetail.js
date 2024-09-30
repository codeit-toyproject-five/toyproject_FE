import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GroupDetailHeader from "../components/GroupDetailHeader";
import GroupEditModal from "../components/GroupEditModal";
import PublicMemories from "./PublicMemories";
import PrivateMemories from "./PrivateMemories";
import {
  GroupDetailContainer,
  FilterContainer,
  FilterButton,
  PostButton,
} from "../styles/GroupDetailStyle";

const GroupDetail = ({ group }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPublicMemory, setIsPublicMemory] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // navigate로부터 전달된 state를 가져옵니다.

  useEffect(() => {
    // location.state를 통해 비공개 추억인지 확인
    if (location.state?.isPrivateMemory) {
      setIsPublicMemory(false);
    }
  }, [location.state]);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleMemoryUploadPage = () => {
    navigate("/memory-upload");
  };

  const handlePublicMemories = () => {
    setIsPublicMemory(true);
  };

  const handlePrivateMemories = () => {
    navigate(`/group/${group.id}/private-memory-access`);
  };

  const publicMemories = group.memories.filter((memory) => memory.isPublic);
  const privateMemories = group.memories.filter((memory) => !memory.isPublic);

  return (
    <GroupDetailContainer>
      <GroupDetailHeader group={group} onEditClick={handleOpenEditModal} />

      <FilterContainer>
        <div style={{ display: "flex", gap: "10px" }}>
          <FilterButton active={isPublicMemory} onClick={handlePublicMemories}>
            공개
          </FilterButton>
          <FilterButton
            active={!isPublicMemory}
            onClick={handlePrivateMemories}
          >
            비공개
          </FilterButton>
        </div>
        <PostButton onClick={handleMemoryUploadPage}>추억 올리기</PostButton>
      </FilterContainer>

      {isPublicMemory ? (
        <PublicMemories memories={publicMemories} />
      ) : (
        <PrivateMemories memories={privateMemories} />
      )}

      {isEditModalOpen && (
        <GroupEditModal group={group} onClose={handleCloseEditModal} />
      )}
    </GroupDetailContainer>
  );
};

export default GroupDetail;
