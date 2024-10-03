import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  PasswordAccessContainer,
  PasswordInput,
  SubmitButton,
} from "../styles/PasswordAccessStyle"; // 필요한 스타일 파일을 추가합니다.

const PrivateMemoryAccessPage = ({ groups }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 그룹 ID를 가져옴

  const group = groups.find((group) => group.id === parseInt(id)); // 그룹 ID에 맞는 그룹 찾기

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!group) {
      alert("그룹을 찾을 수 없습니다.");
      return;
    }

    if (password === group.password) {
      // 비밀번호가 맞으면 그룹 상세 페이지로 이동
      navigate(`/group/${id}`);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <PasswordAccessContainer>
      <h2>{group?.groupName}에 접근</h2>
      <p>비공개 그룹에 접근하기 위해 비밀번호를 입력하세요.</p>
      <form onSubmit={handleSubmit}>
        <PasswordInput
          type="password"
          placeholder="그룹 비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">제출하기</SubmitButton>
      </form>
    </PasswordAccessContainer>
  );
};

export default PrivateMemoryAccessPage;
