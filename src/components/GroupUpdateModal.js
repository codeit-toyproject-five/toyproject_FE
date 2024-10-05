import React, { useState } from "react";
import { verifyGroupPassword, updateGroup } from "../api/groupApi";
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
  const [isPublic, setIsPublic] = useState(group.isPublic);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    try {
      console.log("Password before API call:", password);

      if (!password) {
        setError("비밀번호를 입력해 주세요.");
        return;
      }

      // 비밀번호 검증 API 호출
      const verifyResponse = await verifyGroupPassword(group.id, password);
      console.log("Verify Response:", verifyResponse);

      if (verifyResponse.message && verifyResponse.message.includes("확인")) {
        console.log(
          "Password verification passed, proceeding with group update."
        );

        // 그룹 데이터를 JSON 형식으로 전송 (FormData 사용 안함)
        const updateData = {
          name: newGroupName,
          description: newGroupDescription,
          isPublic: isPublic,
          imageUrl: newGroupImage || group.imageUrl, // 이미지 URL
          introduction: newGroupDescription,
          password: password, // 비밀번호 추가
        };

        console.log("Request Body:", updateData);

        // 그룹 업데이트 API 호출
        const updateResponse = await updateGroup(group.id, updateData);
        console.log("Update Response:", updateResponse);

        if (updateResponse && updateResponse.id) {
          onUpdate({
            name: updateResponse.name,
            description: updateResponse.description,
            imageUrl: updateResponse.imageUrl || group.imageUrl,
            isPublic: updateResponse.isPublic,
          });
          onClose();
        } else {
          setError("그룹 수정에 실패했습니다. 서버 응답을 확인하세요.");
        }
      } else {
        setError("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log("Update error:", error);
      if (error.response && error.response.status === 403) {
        setError("비밀번호가 일치하지 않습니다.");
      } else {
        setError("그룹 수정 중 오류가 발생했습니다.");
      }
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
          {error && <p style={{ color: "red" }}>{error}</p>}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default GroupUpdateModal;
