import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
} from "../styles/ModalStyles";

const MemoryDeleteModal = ({ onClose, onDelete }) => {
  const [password, setPassword] = useState("");

  const handleDelete = () => {
    onDelete(password);
    alert("추억이 성공적으로 삭제되었습니다.");
    onClose();
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>추억 삭제</h2>
        <CloseButton onClick={onClose}>×</CloseButton>
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="삭제 권한 비밀번호를 입력해 주세요"
        />
        <SubmitButton onClick={handleDelete}>삭제하기</SubmitButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default MemoryDeleteModal;
