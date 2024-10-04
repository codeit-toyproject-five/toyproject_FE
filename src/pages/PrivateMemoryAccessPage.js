// src/pages/PrivateMemoryAccessPage.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  PasswordAccessContainer,
  PasswordInput,
  SubmitButton,
} from "../styles/PasswordAccessStyle"; // 필요한 스타일 파일을 추가합니다.

const PrivateMemoryAccessPage = ({ groups }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { memoryId } = useParams(); // memoryId로 변경

  const [memory, setMemory] = useState(null);

  useEffect(() => {
    if (location.state?.memory) {
      setMemory(location.state.memory);
    } else {
      // 모든 그룹에서 해당 메모리를 찾기
      const foundMemory = groups
        .flatMap((group) => group.memories || [])
        .find((mem) => mem.id === parseInt(memoryId));

      if (foundMemory) {
        setMemory(foundMemory);
      } else {
        alert("추억을 찾을 수 없습니다.");
        navigate(-1);
      }
    }
  }, [location.state, groups, memoryId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!memory) {
      alert("추억을 찾을 수 없습니다.");
      return;
    }

    if (password === memory.password) {
      // 비밀번호가 맞으면 추억 상세 페이지로 이동
      navigate(`/memory/${memory.id}`, { state: { authenticated: true } });
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <PasswordAccessContainer>
      <h2>{memory?.title}에 접근</h2>
      <p>비공개 추억에 접근하기 위해 비밀번호를 입력하세요.</p>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          type="password"
          placeholder="추억 비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">제출하기</SubmitButton>
      </form>
    </PasswordAccessContainer>
  );
};

export default PrivateMemoryAccessPage;
