import React from "react";
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
}) => {
  const { id } = useParams();
  const group = groups.find((group) => group.id === parseInt(id));
  const navigate = useNavigate();
  const [isPublicMemory, setIsPublicMemory] = React.useState(true);

  const handleUploadMemory = () => {
    navigate(`/memory-upload/${group.id}`);
  };

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
        <PostButton onClick={handleUploadMemory}>추억 올리기</PostButton>
      </FilterContainer>

      {isPublicMemory ? (
        <PublicMemories
          memories={group?.memories.filter((memory) => memory.isPublic)}
        />
      ) : (
        <PrivateMemories
          memories={group?.memories.filter((memory) => !memory.isPublic)}
        />
      )}
    </GroupDetailContainer>
  );
};

export default GroupDetail;
