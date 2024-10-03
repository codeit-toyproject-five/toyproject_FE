import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
  ModalOverlay,
} from "../styles/GroupUpdateModalStyle";

const GroupUpdateModal = ({ group, onClose, onUpdate }) => {
  const [password, setPassword] = useState("");
  const [newGroupName, setNewGroupName] = useState(
    group.groupName || group.title
  ); // 그룹명 기본값 설정
  const [newGroupDescription, setNewGroupDescription] = useState(
    group.description
  );
  const [newGroupImage, setNewGroupImage] = useState(null);

  const handleUpdate = () => {
    // 비밀번호가 일치하는지 확인합니다.
    if (password === group.password) {
      const updatedGroup = {
        ...group,
        groupName: newGroupName,
        description: newGroupDescription,
        groupImage: newGroupImage || group.groupImage, // 이미지가 없으면 기존 이미지 유지
      };
      onUpdate(updatedGroup); // 상위 컴포넌트로 업데이트된 그룹 정보를 전달
      onClose(); // 모달을 닫습니다.
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={onClose}>X</CloseButton>
          <h2>그룹 정보 수정</h2>
          <label>그룹명</label>
          <InputField
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <label>그룹 소개</label>
          <InputField
            type="text"
            value={newGroupDescription}
            onChange={(e) => setNewGroupDescription(e.target.value)}
          />
          <label>그룹 이미지 변경</label>
          <InputField
            type="file"
            onChange={(e) => setNewGroupImage(e.target.files[0])}
          />
          <label>수정 권한 인증</label>
          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="그룹 비밀번호를 입력해 주세요"
          />
          <SubmitButton onClick={handleUpdate}>수정하기</SubmitButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GroupUpdateModal;
