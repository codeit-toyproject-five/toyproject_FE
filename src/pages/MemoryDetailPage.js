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
import MemoryEditModal from "../components/MemoryEditModal";
import MemoryDeleteModal from "../components/MemoryDeleteModal";
import {
  getPostDetails,
  likePost,
  deletePost,
  updatePost,
} from "../api/postService";

const MemoryDetailPage = ({ updateMemoryInGroup }) => {
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemoryDetails = async () => {
      try {
        const data = await getPostDetails(memoryId);
        // 비공개 메모리 접근 제어
        if (!data.isPublic && !location.state?.authenticated) {
          navigate(`/private-group/${data.groupId}/private-memory-access`, {
            state: { memory: data },
          });
          return;
        }
        setMemory(data);
        setLoading(false);
      } catch (err) {
        console.error("메모리 상세 조회 오류:", err);
        setError(err.message || "메모리를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchMemoryDetails();
  }, [location, navigate, memoryId]);

  const handleLike = async () => {
    if (!memory) return;

    // Optimistic UI 업데이트: 공감 수를 즉시 증가
    setMemory((prevMemory) => ({
      ...prevMemory,
      likeCount: prevMemory.likeCount + 1,
    }));

    try {
      const updatedData = await likePost(memory.id);
      console.log("업데이트된 데이터:", updatedData);

      // 서버 응답 데이터 구조에 따라 likeCount 업데이트
      if (updatedData.likeCount !== undefined) {
        setMemory((prevMemory) => ({
          ...prevMemory,
          likeCount: updatedData.likeCount,
        }));
      } else if (updatedData.post && updatedData.post.likeCount !== undefined) {
        setMemory((prevMemory) => ({
          ...prevMemory,
          likeCount: updatedData.post.likeCount,
        }));
      } else {
        console.warn("likeCount를 찾을 수 없습니다. 서버 응답을 확인하세요.");
      }
    } catch (err) {
      // 오류 발생 시 Optimistic UI 업데이트 되돌림
      setMemory((prevMemory) => ({
        ...prevMemory,
        likeCount: prevMemory.likeCount - 1,
      }));
      console.error("공감 추가 오류:", err);
      alert(err.message || "공감을 추가하는 데 실패했습니다.");
    }
  };

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

  const handleMemoryEditSubmit = async (updatedMemory) => {
    try {
      const updatedData = await updatePost(memory.id, updatedMemory);
      setMemory(updatedData);
      alert("추억이 성공적으로 수정되었습니다.");
      setMemoryEditModalOpen(false);
      navigate(`/group/${updatedData.groupId}`);
    } catch (err) {
      alert(err.message || "추억을 수정하는 데 실패했습니다.");
    }
  };

  const handleMemoryDelete = async (password) => {
    try {
      await deletePost(memory.id, password);
      alert("추억이 성공적으로 삭제되었습니다.");
      navigate(`/group/${memory.groupId}`);
    } catch (err) {
      alert(err.message || "추억을 삭제하는 데 실패했습니다.");
    }
  };

  const paginatedComments = comments.slice(
    (currentPage - 1) * commentsPerPage,
    currentPage * commentsPerPage
  );

  if (loading) {
    return <MemoryDetailContainer>로딩 중...</MemoryDetailContainer>;
  }

  if (error) {
    return (
      <MemoryDetailContainer>
        <p>{error}</p>
        <Button onClick={() => navigate(-1)}>뒤로가기</Button>
      </MemoryDetailContainer>
    );
  }

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
        <span>{memory.location}</span> ·{" "}
        <span>{new Date(memory.moment).toLocaleDateString()}</span>
      </div>
      <Info>
        <InteractionInfo>
          <span>조회수: {memory.views}</span>
          <span>공감: {memory.likeCount}</span>
        </InteractionInfo>
        <Button onClick={handleLike}>공감 보내기</Button>
      </Info>
      {memory.imageUrl && <Image src={memory.imageUrl} alt={memory.title} />}
      <Content>{memory.content}</Content>
      <div>
        {memory.tags &&
          memory.tags.map((tag, index) => <Tag key={index}>#{tag.trim()}</Tag>)}
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
                  setEditModalOpen(true);
                }}
              />
              <DeleteIcon
                onClick={() => {
                  setCurrentComment(comment);
                  setDeleteModalOpen(true);
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
          memory={memory}
        />
      )}
    </MemoryDetailContainer>
  );
};

export default MemoryDetailPage;
