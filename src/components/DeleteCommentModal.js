// src/components/DeleteCommentModal.jsx

import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
} from "../styles/CommentModalStyle";

const DeleteCommentModal = ({ onClose, onDelete, currentComment }) => {
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    if (password.trim()) {
      try {
        // 부모 컴포넌트의 onDelete는 비밀번호를 인자로 받도록 함
        await onDelete(password.trim());
      } catch (error) {
        console.error("Failed to delete comment:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    } else {
      alert("비밀번호를 입력해주세요.");
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>댓글 삭제</h2>
        <CloseButton onClick={onClose}>×</CloseButton>
        <InputField
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton onClick={handleDelete}>삭제하기</SubmitButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default DeleteCommentModal;
