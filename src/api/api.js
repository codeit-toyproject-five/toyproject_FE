import axios from "axios";

// JWT 토큰을 가져오는 함수
const getJwtToken = () => {
  // 로컬 스토리지에서 JWT 토큰을 가져옴
  return localStorage.getItem("jwtToken");
};

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://toyproject-be.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정 (모든 요청에 JWT 토큰 추가)
api.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (token) {
      // Authorization 헤더에 토큰을 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
