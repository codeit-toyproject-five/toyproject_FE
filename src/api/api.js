// src/api/api.js
import axios from "axios";

// axios 기본 인스턴스 생성
const api = axios.create({
  baseURL: "https://toyproject-be.onrender.com/api", // 서버 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
