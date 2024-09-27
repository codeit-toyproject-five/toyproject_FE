import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  TextArea,
  ToggleSwitch,
  SubmitButton,
  ModalOverlay,
} from "../styles/GroupEditModalStyle"; // 스타일

const GroupEditModal = ({ group, onClose }) => {
  const [groupName, setGroupName] = useState(group?.title || "");
  const [groupImage, setGroupImage] = useState(group?.image || "");
  const [groupDescription, setGroupDescription] = useState(
    group?.description || ""
  );
  const [isPublic, setIsPublic] = useState(true); // 기본값은 공개로 설정
  const [password, setPassword] = useState(""); // 수정 권한 인증

  const handleSaveChanges = () => {
    // 수정 사항 저장 로직 (API 호출 등을 통해 서버에 저장)
    console.log("변경사항 저장:", {
      groupName,
      groupImage,
      groupDescription,
      isPublic,
      password,
    });
    onClose(); // 모달 닫기
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent>
          <CloseButton onClick={onClose}>X</CloseButton>
          <h2>그룹 정보 수정</h2>

          {/* 그룹명 입력 */}
          <InputField
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="그룹명을 입력하세요"
          />

          {/* 그룹 이미지 선택 */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <InputField
              type="text"
              value={groupImage ? groupImage.name : "이미지 선택 안됨"}
              disabled
            />
            <InputField
              type="file"
              onChange={(e) => setGroupImage(e.target.files[0])}
            />
          </div>

          {/* 그룹 설명 입력 */}
          <TextArea
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            placeholder="그룹 설명을 입력하세요"
          />

          {/* 그룹 공개 선택 */}
          <label>그룹 공개 선택</label>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <span className="slider round"></span>
          </ToggleSwitch>

          {/* 비공개일 때만 보이는 비밀번호 입력 필드 */}
          {!isPublic && (
            <InputField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="그룹 비밀번호를 입력해 주세요"
            />
          )}

          {/* 수정하기 버튼 */}
          <SubmitButton onClick={handleSaveChanges}>수정하기</SubmitButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GroupEditModal;
