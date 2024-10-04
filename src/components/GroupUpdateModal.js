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
      // 비밀번호 검증 API 호출
      const verifyResponse = await verifyGroupPassword(group.id, password);
      console.log("Verify Response:", verifyResponse); // 응답 메시지 확인

      // 비밀번호 검증 성공 여부를 확인 (서버 응답에 따라 조정)
      if (verifyResponse.message && verifyResponse.message.includes("확인")) {
        console.log(
          "Password verification passed, proceeding with group update."
        );

        const formData = new FormData();
        formData.append("name", newGroupName);
        formData.append("description", newGroupDescription);
        formData.append("isPublic", isPublic.toString()); // isPublic을 문자열로 변환하여 전송

        // 이미지가 있을 경우에만 FormData에 추가
        if (newGroupImage) {
          formData.append("imageUrl", newGroupImage); // 파일 데이터 그대로 전송
        }

        // 그룹 업데이트 API 호출 및 서버 응답 수신
        const updateResponse = await updateGroup(group.id, formData);
        console.log("Update Response:", updateResponse); // 서버 응답 확인

        if (updateResponse && updateResponse.success) {
          // 업데이트된 정보를 부모 컴포넌트에 전달
          onUpdate({
            name: updateResponse.name, // 서버에서 반환된 새 이름
            description: updateResponse.description, // 서버에서 반환된 새 설명
            imageUrl: updateResponse.imageUrl || group.imageUrl, // 서버에서 반환된 이미지 URL, 없으면 기존 URL 유지
            isPublic: updateResponse.isPublic, // 서버에서 반환된 공개 상태
          });

          // 모달 닫기
          onClose();
        } else {
          setError("그룹 수정에 실패했습니다. 서버 응답을 확인하세요.");
        }
      } else {
        setError("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log("Update error:", error); // 에러 디버깅을 위해 추가
      if (error.response && error.response.status === 401) {
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
