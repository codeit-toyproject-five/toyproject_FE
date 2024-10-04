import api from "./api";

// 그룹 생성
export const createGroup = async (groupData) => {
  try {
    const response = await api.post("/groups", groupData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 그룹 리스트 조회 (필터, 페이지네이션)
export const getGroups = async (
  page = 1,
  pageSize = 10,
  keyword = "",
  isPublic = true
) => {
  try {
    const response = await api.get("/groups", {
      params: {
        page,
        pageSize,
        keyword,
        isPublic,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 그룹 삭제
export const deleteGroup = async (groupId, password) => {
  try {
    const response = await api.delete(`/groups/${groupId}`, {
      data: { password },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 그룹 수정
export const updateGroup = async (groupId, groupData) => {
  try {
    const response = await api.patch(`/groups/${groupId}`, groupData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 그룹 세부 정보 가져오기
export const getGroupDetails = async (groupId) => {
  try {
    const response = await api.get(`/groups/${groupId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 그룹 좋아요
export const likeGroup = async (groupId) => {
  try {
    const response = await api.post(`/groups/${groupId}/like`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 그룹 비밀번호 확인
export const verifyGroupPassword = async (groupId, password) => {
  try {
    const response = await api.post(`/groups/${groupId}/verify-password`, {
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};
