import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
} from "../styles/ModalStyles";

const MemoryDeleteModal = ({ onClose, onDelete, memory }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // navigate를 추가

  const handleDelete = () => {
    // 비밀번호 확인 후 삭제 로직
    if (password === memory.password) {
      // onDelete 함수를 호출하여 추억을 삭제
      onDelete(memory.id);

      // 추억 공개 여부에 따라 페이지 이동 로직 추가
      if (memory.isPublic) {
        navigate("/"); // 공개 추억 삭제 후 공개 추억 페이지로 이동
      } else {
        navigate("/private-group"); // 비공개 추억 삭제 후 비공개 추억 페이지로 이동
      }

      onClose(); // 모달 닫기
    } else {
      alert("비밀번호가 일치하지 않습니다.");
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
          placeholder="그룹 비밀번호를 입력해 주세요"
        />
        <SubmitButton onClick={handleDelete}>삭제하기</SubmitButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default MemoryDeleteModal;
