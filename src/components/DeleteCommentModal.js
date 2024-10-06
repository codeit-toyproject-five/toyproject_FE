// src/components/DeleteCommentModal.js
import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
} from "../styles/CommentModalStyle";

const DeleteCommentModal = ({ onClose, onDelete }) => {
  const [password, setPassword] = useState("");

  const handleDelete = () => {
    if (password) {
      onDelete(password);
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
