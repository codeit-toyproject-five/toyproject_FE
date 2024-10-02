import React, { useState } from "react";
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
  CommentsContainer,
  Comment,
  PaginationContainer,
  PageButton,
  EditIcon,
  DeleteIcon,
} from "../styles/MemoryDetailStyle";
import CommentModal from "../components/CommentModal";
import EditCommentModal from "../components/EditCommentModal";
import DeleteCommentModal from "../components/DeleteCommentModal";

const MemoryDetailPage = () => {
  const location = useLocation();
  const { memory } = location.state;

  const [comments, setComments] = useState([]);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  const handleCommentSubmit = (newComment) => {
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        ...newComment,
        date: new Date().toISOString().split("T")[0],
      },
    ]);
    setCommentModalOpen(false);
  };

  const handleEditCommentSubmit = (updatedComment) => {
    setComments(
      comments.map((comment) =>
        comment.id === currentComment.id
          ? { ...comment, ...updatedComment }
          : comment
      )
    );
    setEditModalOpen(false);
    setCurrentComment(null);
  };

  const handleDeleteComment = (password) => {
    if (password === currentComment.password) {
      setComments(
        comments.filter((comment) => comment.id !== currentComment.id)
      );
      setDeleteModalOpen(false);
      setCurrentComment(null);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleEditClick = (comment) => {
    setCurrentComment(comment);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (comment) => {
    setCurrentComment(comment);
    setDeleteModalOpen(true);
  };

  const paginatedComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  return (
    <MemoryDetailContainer>
      <Header>
        <ProjectTitle>조각집 🌼</ProjectTitle>
        <div>
          <button>추억 수정하기</button>
          <button>추억 삭제하기</button>
        </div>
      </Header>
      <div>
        <span>{memory.nickname}</span>
        <PublicStatus>{memory.isPublic ? "공개" : "비공개"}</PublicStatus>
      </div>
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
        <button onClick={() => setCommentModalOpen(true)}>댓글 등록하기</button>
      </ActionButtonContainer>

      <CommentsContainer>
        {paginatedComments.map((comment) => (
          <Comment key={comment.id}>
            <div className="comment-header">
              <span className="nickname">{comment.nickname}</span>
              <span className="date">{comment.date}</span>
            </div>
            <p className="comment-content">{comment.content}</p>
            <div className="comment-actions">
              <EditIcon onClick={() => handleEditClick(comment)} />
              <DeleteIcon onClick={() => handleDeleteClick(comment)} />
            </div>
          </Comment>
        ))}
      </CommentsContainer>

      <PaginationContainer>
        {Array.from(
          { length: Math.ceil(comments.length / commentsPerPage) },
          (_, index) => (
            <PageButton
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PageButton>
          )
        )}
      </PaginationContainer>

      {isCommentModalOpen && (
        <CommentModal
          onClose={() => setCommentModalOpen(false)}
          onSubmit={handleCommentSubmit}
        />
      )}
      {isEditModalOpen && currentComment && (
        <EditCommentModal
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleEditCommentSubmit}
          currentComment={currentComment}
        />
      )}
      {isDeleteModalOpen && currentComment && (
        <DeleteCommentModal
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteComment}
        />
      )}
    </MemoryDetailContainer>
  );
};

export default MemoryDetailPage;
