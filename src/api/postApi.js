import api from "./api";

// 그룹에 새로운 게시글 작성
export const createPost = async (groupId, postData) => {
  try {
    const response = await api.post(`/groups/${groupId}/posts`, postData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 그룹의 게시글 리스트 조회 (필터, 페이지네이션)
export const getPosts = async (
  groupId,
  page = 1,
  pageSize = 10,
  keyword = "",
  sortBy = "latest",
  isPublic = true
) => {
  try {
    const response = await api.get(`/groups/${groupId}/posts`, {
      params: {
        page,
        pageSize,
        keyword,
        sortBy,
        isPublic,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 게시글 수정
export const updatePost = async (postId, postData) => {
  try {
    const response = await api.patch(`/posts/${postId}`, postData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 게시글 삭제
export const deletePost = async (postId, postPassword) => {
  try {
    const response = await api.delete(`/posts/${postId}`, {
      data: { postPassword },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 게시글 상세 조회
export const getPostDetails = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 게시글 좋아요
export const likePost = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 게시글 비밀번호 확인
export const verifyPostPassword = async (postId, password) => {
  try {
    const response = await api.post(`/posts/${postId}/verify-password`, {
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 게시글 공개 여부 확인
export const isPostPublic = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/is-public`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};
