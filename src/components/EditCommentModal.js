// src/components/EditCommentModal.jsx

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

  const handleSubmit = async () => {
    if (nickname.trim() && content.trim() && password.trim()) {
      try {
        console.log("Submitting updated comment:", {
          nickname: nickname.trim(),
          content: content.trim(),
          password: password.trim(),
        });
        // 부모 컴포넌트의 onSubmit은 업데이트된 댓글 데이터를 받도록 함
        await onSubmit({
          nickname: nickname.trim(),
          content: content.trim(),
          password: password.trim(),
        });
      } catch (error) {
        console.error("Failed to update comment:", error);
        alert("댓글 수정에 실패했습니다.");
      }
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
