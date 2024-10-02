import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  TextArea,
  InputField,
  SubmitButton,
} from "../styles/CommentModalStyle";

const EditCommentModal = ({ onClose, onSubmit, currentComment }) => {
  const [nickname, setNickname] = useState(currentComment.nickname);
  const [content, setContent] = useState(currentComment.content);
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (password === currentComment.password) {
      onSubmit({ nickname, content });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
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
