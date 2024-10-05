import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://toyproject-be.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
