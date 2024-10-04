import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GroupDetailHeader from "../components/GroupDetailHeader";
import PublicMemories from "./PublicMemories";
import PrivateMemories from "./PrivateMemories";
import { getGroupDetails } from "../api/groupApi"; // Import the API function
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
  updateMemoryInGroup,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null); // Hold group data
  const [isPublicMemory, setIsPublicMemory] = useState(true);
  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const groupData = await getGroupDetails(id); // Fetch group details by ID
        setGroup(groupData);
        setMemories(groupData.memories || []); // Set memories for the group
      } catch (error) {
        console.error("Error fetching group details:", error);
      }
    };

    fetchGroupDetails();
  }, [id]);

  const handleUploadMemory = () => {
    navigate(`/memory-upload/${group.id}`);
  };

  const handlePublicMemories = () => {
    setIsPublicMemory(true);
  };

  const handlePrivateMemories = () => {
    setIsPublicMemory(false);
  };

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
