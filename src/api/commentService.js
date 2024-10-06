import api from "./api";

// 댓글 생성
export const createComment = async (postId, commentData) => {
  try {
    const response = await api.post(`/posts/${postId}/comments`, commentData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("댓글 생성 실패");
  }
};

// 댓글 수정
export const updateComment = async (commentId, commentData) => {
  try {
    const response = await api.patch(`/comments/${commentId}`, commentData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("댓글 수정 실패");
  }
};

// 댓글 삭제
export const deleteComment = async (commentId, password) => {
  try {
    await api.delete(`/comments/${commentId}`, {
      data: { password }, // 비밀번호 전송
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    throw error.response ? error.response.data : new Error("댓글 삭제 실패");
  }
};

// 댓글 리스트 조회
export const getComments = async (postId, page = 1, pageSize = 10) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`, {
      params: { page, pageSize },
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("댓글 불러오기 실패");
  }
};
