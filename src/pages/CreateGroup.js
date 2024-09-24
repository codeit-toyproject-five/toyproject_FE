import React, { useState } from "react";
import {
  CreateGroupContainer,
  Form,
  Label,
  Input,
  TextArea,
  ToggleSwitch,
  SubmitButton,
} from "../styles/CreateGroupStyle";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!groupName) {
      alert("그룹명을 입력해 주세요.");
      return;
    }

    const groupData = {
      groupName,
      groupImage,
      groupDescription,
      isPublic,
      password: isPublic ? null : password,
    };

    console.log("그룹 데이터 제출: ", groupData);
    alert("그룹이 성공적으로 생성되었습니다.");
  };

  return (
    <CreateGroupContainer>
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

        <Label>그룹 공개 선택</Label>
        <ToggleSwitch>
          <label>공개</label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
        </ToggleSwitch>

        {!isPublic && (
          <>
            <Label>비밀번호 생성</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="그룹 비밀번호를 입력하세요"
            />
          </>
        )}

        <SubmitButton type="submit">만들기</SubmitButton>
      </Form>
    </CreateGroupContainer>
  );
};

export default CreateGroup;
