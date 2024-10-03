import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
  ModalOverlay,
  ToggleSwitch,
  Label,
} from "../styles/GroupUpdateModalStyle";

const GroupUpdateModal = ({ group, onClose, onUpdate }) => {
  const [password, setPassword] = useState("");
  const [newGroupName, setNewGroupName] = useState(
    group.groupName || group.title
  );
  const [newGroupDescription, setNewGroupDescription] = useState(
    group.description
  );
  const [newGroupImage, setNewGroupImage] = useState(null);
  const [isPublic, setIsPublic] = useState(group.isPublic); // 그룹 공개 여부 설정

  const handleUpdate = () => {
    // 비밀번호가 일치하는지 확인합니다.
    if (password === group.password) {
      const updatedGroup = {
        ...group,
        groupName: newGroupName,
        description: newGroupDescription,
        groupImage: newGroupImage || group.groupImage,
        isPublic, // 공개 여부 반영
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
          <Label>그룹명</Label>
          <InputField
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <Label>그룹 소개</Label>
          <InputField
            type="text"
            value={newGroupDescription}
            onChange={(e) => setNewGroupDescription(e.target.value)}
          />
          <Label>그룹 이미지 변경</Label>
          <InputField
            type="file"
            onChange={(e) => setNewGroupImage(e.target.files[0])}
          />
          <Label>그룹 공개 선택</Label>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <span className="slider round"></span>
            <span>{isPublic ? "공개" : "비공개"}</span>
          </ToggleSwitch>
          <Label>수정 권한 인증</Label>
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
