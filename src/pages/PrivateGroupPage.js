import React from "react";
import { useNavigate } from "react-router-dom";
import {
  GroupListContainer,
  GroupCard,
  GroupCardTitle,
  GroupCardContent,
} from "../styles/PrivateGroupPageStyle";

const PrivateGroupPage = ({ groups }) => {
  const navigate = useNavigate();

  const handleGroupClick = (group) => {
    navigate(`/private-group-access`, { state: { groupId: group.id } });
  };

  return (
    <GroupListContainer>
      {groups.length > 0 ? (
        groups
          .filter((group) => !group.isPublic)
          .map((group) => (
            <GroupCard key={group.id} onClick={() => handleGroupClick(group)}>
              <GroupCardContent>
                <GroupCardTitle>{group.groupName}</GroupCardTitle>
              </GroupCardContent>
            </GroupCard>
          ))
      ) : (
        <p>등록된 비공개 그룹이 없습니다.</p>
      )}
    </GroupListContainer>
  );
};

export default PrivateGroupPage;
