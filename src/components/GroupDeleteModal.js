import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
  ModalOverlay,
} from "../styles/GroupDeleteModalStyle.js"; // 스타일 임포트

const GroupDeleteModal = ({ onClose }) => {
  const [password, setPassword] = useState(""); // 비밀번호 상태

  const handleDeleteGroup = () => {
    // 삭제 로직을 구현 (예: 서버로 API 요청)
    console.log("그룹 삭제 비밀번호:", password);
    onClose(); // 모달 닫기
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={onClose}>X</CloseButton>
          <h2>그룹 삭제</h2>
          <label>삭제 권한 인증</label>
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="그룹 비밀번호를 입력해 주세요"
          />
          <SubmitButton onClick={handleDeleteGroup}>삭제하기</SubmitButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GroupDeleteModal;
