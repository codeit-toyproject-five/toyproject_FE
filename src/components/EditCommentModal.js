// src/components/EditCommentModal.js
import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  TextArea,
  SubmitButton,
} from "../styles/CommentModalStyle";

const EditCommentModal = ({ onClose, onSubmit, currentComment }) => {
  const [nickname, setNickname] = useState(currentComment.nickname);
  const [content, setContent] = useState(currentComment.content);
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (nickname && content && password) {
      onSubmit({ nickname, content, password });
    } else {
      alert("모든 필드를 채워주세요.");
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>댓글 수정</h2>
        <CloseButton onClick={onClose}>×</CloseButton>
        <InputField
          type="text"
          placeholder="닉네임을 입력해 주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <TextArea
          placeholder="댓글을 입력해 주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="수정 권한 비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>수정하기</SubmitButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default EditCommentModal;
