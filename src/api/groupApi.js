// groupService.js
import api from "./api";

// 그룹 생성
export const createGroup = async (groupData) => {
  try {
    const response = await api.post("/groups", groupData); // 일반 JSON 형식으로 전송
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
      params: { page, pageSize, keyword, isPublic },
    });
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

// 그룹 수정
export const updateGroup = async (groupId, groupData) => {
  try {
    // 그룹 데이터를 JSON 형식으로 전송
    const response = await api.patch(`/groups/${groupId}`, groupData, {
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 전송
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating group:", error); // 에러 로그 출력
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

// 그룹 좋아요
export const likeGroup = async (groupId) => {
  try {
    const response = await api.post(`/groups/${groupId}/like`);
    return response.data; // { message: "그룹 공감하기 성공", newLikeCount: 101 }
  } catch (error) {
    throw error.response ? error.response.data : new Error("Server error");
  }
};

// 그룹 비밀번호 확인
export const verifyGroupPassword = async (groupId, password) => {
  try {
    // 비밀번호를 JSON 형식으로 서버에 전송
    const response = await api.post(`/groups/${groupId}/verify-password`, {
      password: password, // 요청 본문에 비밀번호 포함
    });

    // 서버로부터 성공적인 응답을 받은 경우
    console.log("Response from server:", response.data);

    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("Error during password verification:", error);

    // 서버로부터 반환된 에러 메시지 처리
    if (error.response) {
      console.log("Error response status:", error.response.status);
      console.log("Error response data:", error.response.data);
      throw error.response.data; // 서버에서 받은 에러 데이터를 그대로 던짐
    } else {
      throw new Error("서버와의 통신 오류가 발생했습니다.");
    }
  }
};
