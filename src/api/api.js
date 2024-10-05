import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://toyproject-be.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 이미지 업로드 함수
export const uploadImageToServer = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile); // 이미지 파일 추가

    const response = await api.post("/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // multipart/form-data로 설정
      },
    });

    return response.data.imageUrl; // 업로드된 이미지 URL 반환
  } catch (error) {
    console.error("Error uploading image:", error.response || error);
    throw error.response ? error.response.data : new Error("서버 에러");
  }
};

export default api;
