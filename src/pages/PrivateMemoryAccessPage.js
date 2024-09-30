import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  PasswordAccessContainer,
  PasswordInput,
  SubmitButton,
} from "../styles/PasswordAccessStyle";

const PrivateMemoryAccessPage = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { groupId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "1234") {
      // 비밀번호가 일치하는 경우
      navigate(`/group/${groupId}`, { state: { isPrivateMemory: true } }); // 비공개 추억 페이지로 이동
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <PasswordAccessContainer>
      <h2>비공개 추억</h2>
      <p>비공개 추억에 접근하기 위해 권한 확인이 필요합니다.</p>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          type="password"
          placeholder="추억 비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">제출하기</SubmitButton>
      </form>
    </PasswordAccessContainer>
  );
};

export default PrivateMemoryAccessPage;
