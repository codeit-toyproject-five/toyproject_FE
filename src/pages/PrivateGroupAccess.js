// src/pages/PrivateGroupAccess.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PrivateGroupContainer,
  Title,
  Description,
  Input,
  SubmitButton,
  Form,
} from "../styles/PrivateGroupAccessStyle";

const PrivateGroupAccess = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "1234") {
      navigate("/private-group"); // 비밀번호가 맞으면 비공개 그룹 페이지로 이동
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <PrivateGroupContainer>
      <Title>비공개 그룹</Title>
      <Description>
        비공개 그룹에 접근하기 위해 비밀번호를 입력하세요.
      </Description>
      <Form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">제출하기</SubmitButton>
      </Form>
    </PrivateGroupContainer>
  );
};

export default PrivateGroupAccess;
