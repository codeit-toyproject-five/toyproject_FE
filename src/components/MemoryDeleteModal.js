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
    const deleteSuccessful = onDelete(password); // onDelete가 성공 또는 실패를 반환

    if (deleteSuccessful) {
      alert("추억이 성공적으로 삭제되었습니다."); // 성공 알림
      onClose(); // 모달 닫기
    } else {
      alert("비밀번호가 일치하지 않아 삭제가 되지 않았습니다."); // 실패 알림
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
          placeholder="삭제 권한 비밀번호를 입력해 주세요"
        />
        <SubmitButton onClick={handleDelete}>삭제하기</SubmitButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default MemoryDeleteModal;
