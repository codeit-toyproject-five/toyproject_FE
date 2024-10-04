import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
} from "../styles/ModalStyles";
import { useNavigate } from "react-router-dom";

const MemoryDeleteModal = ({ onClose, onDelete, memory }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleDelete = () => {
    if (password === memory.password) {
      onDelete(password);

      navigate(`/group/${memory.groupId}`);
      onClose();
    } else {
      alert("추억 비밀번호가 일치하지 않습니다.");
    }
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
          placeholder="추억 비밀번호를 입력해 주세요"
        />
        <SubmitButton onClick={handleDelete}>삭제하기</SubmitButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default MemoryDeleteModal;
