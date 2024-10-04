import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyGroupPassword } from "../api/groupApi"; // 비밀번호 검증 API 함수
import {
  PasswordAccessContainer,
  PasswordInput,
  SubmitButton,
} from "../styles/PasswordAccessStyle";

const PrivateGroupAccessPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state?.groupId;

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      // 비밀번호 검증을 위한 API 호출
      const response = await verifyGroupPassword(groupId, password);

      // 서버에서 비밀번호가 확인되었다는 메시지를 받으면 그룹으로 이동
      if (response.message === "비밀번호가 확인되었습니다") {
        navigate(`/group/${groupId}`);
      } else {
        setError("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      setError("비밀번호 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <PasswordAccessContainer>
      <h1>비공개 그룹 접근</h1>
      <form onSubmit={handlePasswordSubmit}>
        <PasswordInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
        <SubmitButton type="submit">확인</SubmitButton>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </PasswordAccessContainer>
  );
};

export default PrivateGroupAccessPage;
