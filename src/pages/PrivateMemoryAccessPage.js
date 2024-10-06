// src/pages/PrivateMemoryAccessPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PasswordAccessContainer,
  PasswordInput,
  SubmitButton,
} from "../styles/PasswordAccessStyle";
import { verifyPostPassword } from "../api/postService";

const PrivateMemoryAccessPage = ({ groups }) => {
  const [password, setPassword] = useState("");
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("PrivateMemoryAccessPage mounted");

    if (location.state?.memory) {
      console.log("Memory found in location state");
      setMemory(location.state.memory);
      setLoading(false);
    } else {
      if (!location.state?.postId) {
        console.error("Memory postId not provided.");
        alert("올바르지 않은 접근입니다.");
        navigate(-1);
        return;
      }

      const foundMemory = groups
        .flatMap((group) => group.memories || [])
        .find((mem) => mem.id === parseInt(location.state.postId, 10));

      if (foundMemory) {
        console.log("Memory found in groups:", foundMemory);
        setMemory(foundMemory);
      } else {
        console.error("Memory not found in groups.");
        alert("추억을 찾을 수 없습니다.");
        navigate(-1);
      }

      setLoading(false);
    }
  }, [location.state, groups, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!memory) {
      console.error("Memory not found.");
      alert("추억을 찾을 수 없습니다.");
      return;
    }

    setVerifying(true);
    setError(null);

    try {
      // 비밀번호 검증 API 호출
      const response = await verifyPostPassword(memory.id, password);
      console.log("API Response:", response);

      // 비밀번호가 확인되었는지 메시지를 통해 판단
      if (response.message === "비밀번호가 확인되었습니다") {
        console.log("Password verification successful, navigating...");
        // 검증 성공 시 추억 상세 페이지로 이동하면서 authenticated 상태 전달
        navigate(`/memory/${memory.id}`, { state: { authenticated: true } });
      } else {
        // 검증 실패 시 에러 메시지 표시
        console.error("Password verification failed:", response.message);
        setError(response.message || "비밀번호가 틀렸습니다.");
      }
    } catch (err) {
      console.error("Error during password verification:", err);
      setError(err.message || "비밀번호 검증 중 오류가 발생했습니다.");
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return <PasswordAccessContainer>로딩 중...</PasswordAccessContainer>;
  }

  return (
    <PasswordAccessContainer>
      <h2>{memory?.title}에 접근</h2>
      <p>비공개 추억에 접근하기 위해 추억 비밀번호를 입력하세요.</p>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          type="password"
          placeholder="추억 비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={verifying}
        />
        <SubmitButton type="submit" disabled={verifying}>
          {verifying ? "검증 중..." : "제출하기"}
        </SubmitButton>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </PasswordAccessContainer>
  );
};

export default PrivateMemoryAccessPage;
