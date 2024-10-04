import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteGroup } from "../api/groupApi"; // 그룹 삭제 API 함수 import
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
  ModalOverlay,
} from "../styles/GroupDeleteModalStyle";

const GroupDeleteModal = ({ group, onClose, onDelete }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDeleteGroup = async () => {
    try {
      // 서버에 그룹 삭제 요청
      await deleteGroup(group.id, password);

      // 삭제된 그룹 ID를 콘솔에 출력
      console.log("Deleted group ID:", group.id);

      onDelete(group.id); // 상위 컴포넌트에 삭제된 그룹 ID 전달
      onClose(); // 모달 닫기

      // 그룹 공개 여부에 따른 페이지 리디렉션
      if (group.isPublic) {
        navigate("/"); // 공개 그룹 페이지로 리디렉션
      } else {
        navigate("/private-group"); // 비공개 그룹 페이지로 리디렉션
      }
    } catch (error) {
      // 에러 처리
      setError("비밀번호가 일치하지 않거나 삭제 중 오류가 발생했습니다.");
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
          {error && <p style={{ color: "red" }}>{error}</p>}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GroupDeleteModal;
