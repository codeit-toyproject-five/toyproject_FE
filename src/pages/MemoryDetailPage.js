// src/pages/MemoryDetailPage.jsx

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
  DeleteIcon,
  Button,
} from "../styles/MemoryDetailStyle";
import CommentModal from "../components/CommentModal";
import DeleteCommentModal from "../components/DeleteCommentModal";
import MemoryEditModal from "../components/MemoryEditModal";
import MemoryDeleteModal from "../components/MemoryDeleteModal";
import {
  getPostDetails,
  likePost,
  deletePost,
  updatePost,
} from "../api/postService";
import {
  getComments,
  createComment,
  deleteComment,
} from "../api/commentService"; // updateComment 임포트 제거

const MemoryDetailPage = ({ updateMemoryInGroup }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { memoryId } = useParams();
  const [memory, setMemory] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isMemoryEditModalOpen, setMemoryEditModalOpen] = useState(false);
  const [isMemoryDeleteModalOpen, setMemoryDeleteModalOpen] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemoryDetails = async () => {
      try {
        const data = await getPostDetails(memoryId);
        console.log("Fetched memory details:", data);

        // 비공개 메모리 접근 제어
        if (!data.isPublic && !location.state?.authenticated) {
          navigate(`/private-group/${data.groupId}/private-memory-access`, {
            state: { memory: data },
          });
          return;
        }

        // likeCount가 존재하지 않거나 숫자가 아니면 0으로 설정
        const sanitizedData = {
          ...data,
          likeCount: typeof data.likeCount === "number" ? data.likeCount : 0,
        };

        setMemory(sanitizedData);
        setLoading(false);
      } catch (err) {
        console.error("메모리 상세 조회 오류:", err);
        setError(err.message || "메모리를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await getComments(memoryId, 1, 1000); // 모든 댓글을 가져옵니다.
        console.log("Fetched comments:", response);
        setComments(response.comments || response.data || []);
      } catch (err) {
        console.error("댓글 불러오기 오류:", err);
      }
    };

    fetchMemoryDetails();
    fetchComments();
  }, [location, navigate, memoryId]);

  const handleLike = async () => {
    if (!memory) return;

    // 현재 likeCount가 숫자인지 확인하고, 아니면 0으로 설정
    const currentLikeCount = Number(memory.likeCount) || 0;

    // Optimistic UI 업데이트: 공감 수를 즉시 증가
    setMemory((prevMemory) => ({
      ...prevMemory,
      likeCount: currentLikeCount + 1,
    }));

    try {
      const updatedData = await likePost(memory.id);
      console.log("Updated like count:", updatedData.likeCount);

      // updatedData.likeCount가 숫자인지 확인하고, 아니면 현재 값을 유지
      const newLikeCount =
        typeof updatedData.likeCount === "number"
          ? updatedData.likeCount
          : currentLikeCount + 1;

      setMemory((prevMemory) => ({
        ...prevMemory,
        likeCount: newLikeCount,
      }));
    } catch (err) {
      // 오류 발생 시 Optimistic UI 업데이트 되돌림
      setMemory((prevMemory) => ({
        ...prevMemory,
        likeCount: currentLikeCount,
      }));
      console.error("공감 추가 오류:", err);
      alert(err.message || "공감을 추가하는 데 실패했습니다.");
    }
  };

  const handleCommentSubmit = async (newComment) => {
    try {
      console.log("Submitting new comment:", newComment);
      setLoading(true);

      const createdComment = await createComment(
        memoryId,
        newComment.nickname,
        newComment.content,
        newComment.password
      );

      console.log("Created comment received:", createdComment);

      if (createdComment) {
        setComments((prevComments) => [createdComment, ...prevComments]);
      }

      setCommentModalOpen(false);
    } catch (error) {
      console.error("댓글 등록 오류:", error);
      alert(error.message || "댓글 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (password) => {
    try {
      console.log(
        "Deleting comment ID:",
        currentComment.id,
        "with password:",
        password
      );
      await deleteComment(currentComment.id, password);
      console.log("Deleted comment ID:", currentComment.id);
      setComments(
        comments.filter((comment) => comment.id !== currentComment.id)
      );
      setDeleteModalOpen(false);
      setCurrentComment(null);
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
      alert(error.message || "댓글을 삭제하는 데 실패했습니다.");
    }
  };

  const handleMemoryEditSubmit = async (updatedMemory) => {
    try {
      const updatedData = await updatePost(memory.id, updatedMemory);
      console.log("Updated memory:", updatedData);
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
      console.log("Deleting memory ID:", memory.id, "with password:", password);
      await deletePost(memory.id, password);
      console.log("Deleted memory ID:", memory.id);
      alert("추억이 성공적으로 삭제되었습니다.");
      navigate(`/group/${memory.groupId}`);
    } catch (err) {
      alert(err.message || "추억을 삭제하는 데 실패했습니다.");
    }
  };

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
        {comments.map((comment) => (
          <Comment key={comment.id}>
            <div className="comment-header">
              <span className="nickname">{comment.nickname}</span>
              <span className="date">
                {new Date(comment.createdAt).toLocaleString()}{" "}
                {/* 날짜와 시간 표시 */}
              </span>
            </div>
            <p className="comment-content">{comment.content}</p>
            <div className="comment-actions">
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

      {/* 페이징 제거: 모든 댓글을 한 페이지에 표시 */}

      {/* 모달들 */}
      {isCommentModalOpen && (
        <CommentModal
          postId={memoryId} // postId를 CommentModal에 전달
          onClose={() => setCommentModalOpen(false)}
          onSubmit={handleCommentSubmit}
        />
      )}
      {isDeleteModalOpen && currentComment && (
        <DeleteCommentModal
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteComment}
          currentComment={currentComment}
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
