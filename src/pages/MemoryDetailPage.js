// src/pages/MemoryDetailPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  Button,
} from "../styles/MemoryDetailStyle";
import CommentModal from "../components/CommentModal";
import EditCommentModal from "../components/EditCommentModal";
import DeleteCommentModal from "../components/DeleteCommentModal";
import MemoryEditModal from "../components/MemoryEditModal.js";
import MemoryDeleteModal from "../components/MemoryDeleteModal.js";

const MemoryDetailPage = ({ groups }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { memoryId } = useParams();
  const [memory, setMemory] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isMemoryEditModalOpen, setMemoryEditModalOpen] = useState(false);
  const [isMemoryDeleteModalOpen, setMemoryDeleteModalOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 3;

  useEffect(() => {
    // 모든 그룹에서 해당 메모리를 찾기
    const foundMemory = groups
      .flatMap((group) => group.memories || [])
      .find((mem) => mem.id === parseInt(memoryId));

    if (!foundMemory) {
      alert("추억을 찾을 수 없습니다.");
      navigate(-1);
      return;
    }

    if (!foundMemory.isPublic && !location.state?.authenticated) {
      // 비공개 추억인데 인증되지 않았다면 접근 제한
      navigate(`/private-group/${foundMemory.groupId}/private-memory-access`, {
        state: { memory: foundMemory },
      });
      return;
    }

    setMemory(foundMemory);
  }, [location, navigate, memoryId, groups]);

  if (!memory) {
    return <p>로딩 중...</p>;
  }

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

  const handleMemoryEditSubmit = (updatedMemory) => {
    // Memory 수정 로직
    setMemory(updatedMemory); // 상태 업데이트
    alert("추억이 성공적으로 수정되었습니다.");
    setMemoryEditModalOpen(false);
  };

  const handleMemoryDelete = (password) => {
    // 비밀번호 확인 후 삭제 로직
    if (password === memory.password) {
      alert("추억이 성공적으로 삭제되었습니다.");
      navigate("/"); // 추억 삭제 후 메인 페이지로 이동
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
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
          <Button onClick={() => setMemoryEditModalOpen(true)}>
            추억 수정하기
          </Button>
          <Button onClick={() => setMemoryDeleteModalOpen(true)}>
            추억 삭제하기
          </Button>
        </div>
      </Header>
      <div>
        <span>{memory.nickname}</span>
        <PublicStatus isPublic={memory.isPublic}>
          {memory.isPublic ? "공개" : "비공개"}
        </PublicStatus>
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
        <Button>공감 보내기</Button>
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
        <Button onClick={() => setCommentModalOpen(true)}>댓글 등록하기</Button>
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
              <EditIcon
                onClick={() => {
                  setCurrentComment(comment);
                  setEditModalOpen(true); // 모달을 여는 동작 추가
                }}
              />
              <DeleteIcon
                onClick={() => {
                  setCurrentComment(comment);
                  setDeleteModalOpen(true); // 모달을 여는 동작 추가
                }}
              />
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
      {isMemoryEditModalOpen && (
        <MemoryEditModal
          memory={memory}
          onClose={() => setMemoryEditModalOpen(false)}
          onSubmit={handleMemoryEditSubmit}
        />
      )}
      {isMemoryDeleteModalOpen && (
        <MemoryDeleteModal
          onClose={() => setMemoryDeleteModalOpen(false)}
          onDelete={handleMemoryDelete}
        />
      )}
    </MemoryDetailContainer>
  );
};

export default MemoryDetailPage;
