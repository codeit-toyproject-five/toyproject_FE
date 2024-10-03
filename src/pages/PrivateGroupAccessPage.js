import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PasswordAccessContainer,
  PasswordInput,
  SubmitButton,
} from "../styles/PasswordAccessStyle";

const PrivateGroupAccessPage = ({ groups }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state?.groupId;

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    const foundGroup = groups.find(
      (group) => group.id === groupId && group.password === password
    );

    if (foundGroup) {
      navigate(`/group/${foundGroup.id}`);
    } else {
      setError("비밀번호가 일치하지 않습니다.");
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
