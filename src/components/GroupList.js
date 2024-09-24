import React from "react";
import GroupCard from "./GroupCard";
import { GroupListContainer } from "../styles/GroupListStyle";

// 가짜 데이터
const publicGroups = [
  {
    id: 1,
    title: "공개 그룹",
    description: "공개된 그룹입니다.",
    dDay: 265,
    likes: 8,
    comments: 8,
    views: 1.5,
  },
  // 추가 공개 그룹 데이터
];

const privateGroups = [
  {
    id: 1,
    title: "비공개 그룹",
    description: "비공개된 그룹입니다.",
    dDay: 265,
    likes: 8,
    comments: 8,
    views: 1.5,
  },
  // 추가 비공개 그룹 데이터
];

const GroupList = ({ type }) => {
  const groups = type === "public" ? publicGroups : privateGroups; // 공개/비공개에 따라 그룹 데이터 선택

  return (
    <GroupListContainer>
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </GroupListContainer>
  );
};

export default GroupList;
