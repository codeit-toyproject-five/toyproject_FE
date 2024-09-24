import React from "react";
import {
  CardContainer,
  Image,
  CardContent,
  Title,
  Description,
  Info,
} from "../styles/GroupCardStyle";

const GroupCard = ({ group }) => {
  return (
    <CardContainer>
      <Image src={group.image} alt={group.title} />
      <CardContent>
        <Title>{group.title}</Title>
        <Description>{group.description}</Description>
        <Info>
          <span>D-{group.dDay}</span>
          <span>공감 {group.likes}</span>
          <span>댓글 {group.comments}</span>
          <span>조회 {group.views}K</span>
        </Info>
      </CardContent>
    </CardContainer>
  );
};

export default GroupCard;
