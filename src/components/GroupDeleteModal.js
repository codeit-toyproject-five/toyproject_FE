import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigate 사용
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
  ModalOverlay,
} from "../styles/GroupDeleteModalStyle"; // 스타일 경로 확인 필요

const GroupDeleteModal = ({ group, onClose, onDelete }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 리디렉션을 위한 navigate 추가

  const handleDeleteGroup = () => {
    // 비밀번호가 일치하는지 확인
    if (password === group.password) {
      onDelete(group.id); // 그룹 삭제 함수 호출
      onClose(); // 모달 닫기

      // 삭제 후 공개 여부에 따른 페이지 리디렉션
      if (group.isPublic) {
        navigate("/"); // 공개 그룹 페이지로 리디렉션
      } else {
        navigate("/private-group"); // 비공개 그룹 페이지로 리디렉션
      }
    } else {
      alert("비밀번호가 일치하지 않습니다."); // 비밀번호 불일치 경고
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={onClose}>X</CloseButton>
          <h2>그룹 삭제</h2>
          <label>삭제 권한 인증</label>
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="그룹 비밀번호를 입력해 주세요"
          />
          <SubmitButton onClick={handleDeleteGroup}>삭제하기</SubmitButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GroupDeleteModal;
