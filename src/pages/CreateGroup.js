import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGroup } from "../api/groupApi"; // 그룹 생성 API 함수 import
import {
  CreateGroupContainer,
  Form,
  Label,
  Input,
  TextArea,
  ToggleSwitch,
  SubmitButton,
  CloseButton,
} from "../styles/CreateGroupStyle";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(""); // 파일 이름만 저장
  const [groupDescription, setGroupDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!groupName || !password) {
      alert("그룹명과 비밀번호를 입력해 주세요.");
      return;
    }

    // 이미지 파일이 없을 경우 null로 설정
    const imageUrl = groupImage ? URL.createObjectURL(groupImage) : null;

    const newGroup = {
      name: groupName,
      password,
      imageUrl, // 이미지의 URL 대신 파일 이름만 전송
      isPublic,
      introduction: groupDescription,
    };

    try {
      const response = await createGroup(newGroup); // 그룹 생성 API 호출
      console.log("생성된 그룹 ID:", response.id); // 생성된 그룹 ID를 콘솔에 출력
      console.log("생성된 그룹 이미지 URL:", response.imageUrl); // 이미지 URL도 확인 가능
      navigate("/"); // 생성 후 홈으로 이동
    } catch (error) {
      console.error("그룹 생성 실패:", error);
      alert("그룹 생성 중 오류가 발생했습니다.");
    }
  };

  const handleClose = () => {
    navigate(-1); // 닫기 버튼 클릭 시 이전 페이지로 이동
  };

  return (
    <CreateGroupContainer>
      <CloseButton onClick={handleClose}>✕</CloseButton>
      <h1>그룹 만들기</h1>
      <Form onSubmit={handleSubmit}>
        <Label>그룹명</Label>
        <Input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="그룹명을 입력하세요"
        />

        <Label>대표 이미지</Label>
        <Input type="file" onChange={(e) => setGroupImage(e.target.files[0])} />

        <Label>그룹 소개</Label>
        <TextArea
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          placeholder="그룹을 소개해 주세요"
        />

        <Label>그룹 공개 여부</Label>
        <ToggleSwitch>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          <span></span>
          <span>{isPublic ? "공개" : "비공개"}</span>
        </ToggleSwitch>

        <Label>비밀번호</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />

        <SubmitButton type="submit">그룹 생성</SubmitButton>
      </Form>
    </CreateGroupContainer>
  );
};

export default CreateGroup;
