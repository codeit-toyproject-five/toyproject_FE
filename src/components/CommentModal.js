import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  TextArea,
  SubmitButton,
} from "../styles/CommentModalStyle";

const CommentModal = ({ onClose, onSubmit }) => {
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (nickname && content && password) {
      onSubmit({ nickname, content, password });
      setNickname("");
      setContent("");
      setPassword("");
    } else {
      alert("모든 필드를 채워주세요.");
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>댓글 등록</h2>
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
          placeholder="댓글 비밀번호를 생성해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>등록하기</SubmitButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default CommentModal;
