// src/pages/GroupDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GroupDetailHeader from "../components/GroupDetailHeader";
import PublicMemories from "./PublicMemories";
import PrivateMemories from "./PrivateMemories";
import {
  GroupDetailContainer,
  FilterContainer,
  FilterButton,
  PostButton,
} from "../styles/GroupDetailStyle";

const GroupDetail = ({
  groups,
  onGroupDelete,
  onGroupUpdate,
  addMemoryToGroup,
  updateMemoryInGroup, // App.js에서 전달된 updateMemoryInGroup 함수
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const group = groups.find((group) => group.id === parseInt(id));
  const [isPublicMemory, setIsPublicMemory] = useState(true);
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    if (group) {
      setMemories(group.memories || []);
    }
  }, [group]);

  const handleUploadMemory = () => {
    navigate(`/memory-upload/${group.id}`);
  };

  const handlePublicMemories = () => {
    setIsPublicMemory(true);
  };

  const handlePrivateMemories = () => {
    setIsPublicMemory(false);
  };

  // 메모리가 업데이트될 때마다 그룹의 메모리 상태를 동기화
  useEffect(() => {
    if (group) {
      setMemories(group.memories || []);
    }
  }, [group]);

  if (!group) {
    return <p>그룹을 찾을 수 없습니다.</p>;
  }

  return (
    <GroupDetailContainer>
      <GroupDetailHeader
        group={group}
        onGroupDelete={onGroupDelete}
        onGroupUpdate={onGroupUpdate}
      />

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
        <PostButton onClick={handleUploadMemory}>추억 올리기</PostButton>
      </FilterContainer>

      {isPublicMemory ? (
        <PublicMemories
          memories={memories.filter((memory) => memory.isPublic)}
        />
      ) : (
        <PrivateMemories
          memories={memories.filter((memory) => !memory.isPublic)}
        />
      )}
    </GroupDetailContainer>
  );
};

export default GroupDetail;
