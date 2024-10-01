import React from "react";
import { useLocation } from "react-router-dom";
import {
  MemoryDetailContainer,
  Title,
  Image,
  Content,
  Info,
  InteractionInfo,
  ActionButtonContainer,
  ProjectTitle,
  PublicStatus,
  Header,
  Tag,
  AuthorInfoContainer,
} from "../styles/MemoryDetailStyle";

const MemoryDetailPage = () => {
  const location = useLocation();
  const { memory } = location.state;

  return (
    <MemoryDetailContainer>
      <Header>
        <ProjectTitle>조각집 🌼</ProjectTitle>
        <div>
          <button>추억 수정하기</button>
          <button>추억 삭제하기</button>
        </div>
      </Header>
      <AuthorInfoContainer>
        <span>{memory.nickname}</span>
        <PublicStatus isPublic={memory.isPublic}>
          {memory.isPublic ? "공개" : "비공개"}
        </PublicStatus>
      </AuthorInfoContainer>
      <Title>{memory.title}</Title>
      <div>
        <span>{memory.location}</span> · <span>{memory.date}</span>
      </div>
      <Info>
        <InteractionInfo>
          <span>조회수: {memory.views}</span>
          <span>공감: {memory.likes}</span>
        </InteractionInfo>
        <button>공감 보내기</button>
      </Info>
      <Image src={memory.imageUrl} alt={memory.title} />
      <Content>{memory.content}</Content>
      <div>
        {memory.tags &&
          memory.tags
            .split(",")
            .map((tag, index) => <Tag key={index}>#{tag.trim()}</Tag>)}
      </div>
      <ActionButtonContainer>
        <button>댓글 등록하기</button>
      </ActionButtonContainer>
    </MemoryDetailContainer>
  );
};

export default MemoryDetailPage;
