// src/api/postService.js
import api from "./api";

// 게시글 생성
export const createPost = async (groupId, postData) => {
  try {
    console.log("JSON 바디 전송 내용:", postData);
    const response = await api.post(`/groups/${groupId}/posts`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error.response || error);
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 그룹의 게시글 리스트 조회
export const getGroupPosts = async (
  groupId,
  page = 1,
  pageSize = 10,
  sortBy = "latest",
  keyword = "",
  isPublic = true // boolean 타입 유지
) => {
  try {
    const response = await api.get(`/groups/${groupId}/posts`, {
      params: { page, pageSize, sortBy, keyword, isPublic },
    });
    console.log("API Response:", response.data); // 응답 데이터 확인을 위한 로그
    return response.data;
  } catch (error) {
    console.error("Error fetching group posts:", error.response || error);
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 게시글 수정
export const updatePost = async (postId, postData) => {
  try {
    const response = await api.patch(`/posts/${postId}`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error.response || error);
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 게시글 삭제
export const deletePost = async (postId, postPassword) => {
  try {
    const response = await api.delete(`/posts/${postId}`, {
      data: { postPassword },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error.response || error);
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 게시글 비밀번호 확인
export const verifyPostPassword = async (postId, password) => {
  try {
    const response = await api.post(
      `/posts/${postId}/verify-password`,
      { password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying post password:", error.response || error);
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 게시글 좋아요
export const likePost = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking post:", error.response || error);
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 게시글 공개 여부 확인
export const checkPostPublicStatus = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/is-public`);
    return response.data;
  } catch (error) {
    console.error(
      "Error checking post public status:",
      error.response || error
    );
    throw error.response ? error.response.data : new Error("Server error");
  }
};
