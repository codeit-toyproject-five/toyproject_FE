// src/api/commentService.js

import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://toyproject-be.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 댓글 목록 조회
export const getComments = async (postId, page = 1, pageSize = 1000) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`, {
      params: { page, pageSize },
    });
    console.log("Fetched comments:", response.data);
    return response.data; // 서버의 응답 구조에 따라 조정 필요
  } catch (error) {
    console.error("Error fetching comments:", error.response || error);
    throw error.response
      ? error.response.data
      : new Error("Failed to fetch comments");
  }
};

// 댓글 등록 API
export const createComment = async (postId, nickname, content, password) => {
  try {
    console.log("Creating comment with data:", {
      postId,
      nickname,
      content,
      password,
    });
    const response = await api.post(`/posts/${postId}/comments`, {
      nickname,
      content,
      password,
    });
    console.log("Comment created successfully:", response.data);
    return response.data; // 생성된 댓글 객체 반환
  } catch (error) {
    if (error.response) {
      console.error("Error creating comment:", error.response.data);
      throw error.response.data;
    } else {
      console.error("Error creating comment:", error.message);
      throw new Error("Failed to create comment");
    }
  }
};

// 댓글 삭제
export const deleteComment = async (commentId, password) => {
  try {
    console.log("Deleting comment ID:", commentId, "with password:", password);
    const response = await api.delete(`/comments/${commentId}`, {
      data: { password }, // Password를 body로 전달
    });
    console.log("Comment deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error.response || error);
    throw error.response
      ? error.response.data
      : new Error("Failed to delete comment");
  }
};

// 댓글 수정
export const updateComment = async (commentId, nickname, content, password) => {
  try {
    console.log("Updating comment with data:", {
      commentId,
      nickname,
      content,
      password,
    });
    const response = await api.patch(`/comments/${commentId}`, {
      nickname,
      content,
      password,
    });
    console.log("Comment updated successfully:", response.data);
    return response.data; // 수정된 댓글 객체 반환
  } catch (error) {
    if (error.response) {
      console.error("Error updating comment:", error.response.data);
      throw error.response.data;
    } else {
      console.error("Error updating comment:", error.message);
      throw new Error("Failed to update comment");
    }
  }
};

export default api;
