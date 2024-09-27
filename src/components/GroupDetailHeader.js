import React from "react";
import {
  GroupHeaderContainer,
  GroupImage,
  GroupInfo,
  GroupTitle,
  GroupDescription,
  GroupStatistics,
  BadgeContainer,
  Badge,
  GroupLinkButtons,
  GroupLinkButton,
  GroupActionButton,
} from "../styles/GroupDetailStyle";

const GroupDetailHeader = ({ group }) => {
  return (
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
        <GroupLinkButtons>
          <GroupLinkButton>그룹 정보 수정하기</GroupLinkButton>
          <GroupLinkButton>그룹 삭제하기</GroupLinkButton>
        </GroupLinkButtons>
      </GroupInfo>
      <GroupActionButton>공감 보내기</GroupActionButton>
    </GroupHeaderContainer>
  );
};

export default GroupDetailHeader;
