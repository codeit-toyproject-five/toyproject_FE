import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
  ModalOverlay,
} from "../styles/GroupDeleteModalStyle"; // 스타일 경로 확인 필요

const GroupDeleteModal = ({ groupId, groups, onClose, onDelete }) => {
  // groups를 props로 받음
  const [password, setPassword] = useState("");

  const handleDeleteGroup = () => {
    const group = groups.find((g) => g.id === groupId); // groups에서 해당 그룹을 찾음
    if (password === group.password) {
      onDelete(groupId);
      onClose();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
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
