import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import GroupDetailHeader from "../components/GroupDetailHeader";
import PublicMemories from "./PublicMemories";
import PrivateMemories from "./PrivateMemories";
import {
  GroupDetailContainer,
  FilterContainer,
  FilterButton,
  PostButton,
} from "../styles/GroupDetailStyle";

const GroupDetail = ({ groups, onGroupDelete, onGroupUpdate }) => {
  const { id } = useParams();
  const group = groups.find((group) => group.id === parseInt(id));
  const location = useLocation();
  const [isPublicMemory, setIsPublicMemory] = useState(true);

  useEffect(() => {
    if (location.state?.isPrivateMemory) {
      setIsPublicMemory(false);
    }
  }, [location.state]);

  const publicMemories = group?.memories.filter((memory) => memory.isPublic);
  const privateMemories = group?.memories.filter((memory) => !memory.isPublic);

  const handlePublicMemories = () => {
    setIsPublicMemory(true);
  };

  const handlePrivateMemories = () => {
    setIsPublicMemory(false);
  };

  return (
    <GroupDetailContainer>
      {group && (
        <GroupDetailHeader
          group={group}
          onGroupDelete={onGroupDelete}
          onGroupUpdate={onGroupUpdate}
        />
      )}

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
        <PostButton>추억 올리기</PostButton>
      </FilterContainer>

      {isPublicMemory ? (
        <PublicMemories memories={publicMemories} />
      ) : (
        <PrivateMemories memories={privateMemories} />
      )}
    </GroupDetailContainer>
  );
};

export default GroupDetail;
