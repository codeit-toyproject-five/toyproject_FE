// src/pages/PrivateGroupPage.js
import React from "react";
import GroupCard from "../components/GroupCard";
import { GroupListContainer } from "../styles/GroupListStyle";

const PrivateGroupPage = () => {
  const privateGroups = [
    {
      id: 1,
      title: "비공개 그룹 1",
      description: "비공개된 그룹입니다.",
      dDay: 30,
      likes: 10,
      comments: 5,
      views: 500,
    },
    {
      id: 2,
      title: "비공개 그룹 2",
      description: "비공개된 그룹입니다.",
      dDay: 60,
      likes: 8,
      comments: 3,
      views: 200,
    },
  ];

  return (
    <GroupListContainer>
      {privateGroups.length > 0 ? (
        privateGroups.map((group) => <GroupCard key={group.id} group={group} />)
      ) : (
        <div>
          <p>등록된 비공개 그룹이 없습니다. 그룹을 만들어보세요!</p>
        </div>
      )}
    </GroupListContainer>
  );
};

export default PrivateGroupPage;
