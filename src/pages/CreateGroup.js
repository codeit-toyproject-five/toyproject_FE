// src/pages/CreateGroup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreateGroupContainer,
  Form,
  Label,
  Input,
  TextArea,
  ToggleSwitch,
  SubmitButton,
} from "../styles/CreateGroupStyle";

const CreateGroup = ({ addGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [author, setAuthor] = useState(""); // 작성자 추가
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!groupName || !password || !author) {
      alert("그룹명, 비밀번호, 작성자를 입력해 주세요.");
      return;
    }

    const newGroup = {
      id: Date.now(),
      groupName, // 그룹명
      groupImage, // 이미지
      description: groupDescription, // 그룹 소개는 공개/비공개 상관없이 작성 가능
      isPublic, // 공개 여부
      password, // 비밀번호
      author, // 작성자
      likes: 0,
      views: 0,
      memories: [], // 추억 배열 초기화
    };

    addGroup(newGroup);

    if (isPublic) {
      // 공개 그룹일 경우 공개 그룹 페이지로 이동
      navigate("/");
    } else {
      // 비공개 그룹일 경우 비공개 그룹 목록 페이지로 이동
      navigate("/private-group");
    }
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

        <Label>작성자</Label>
        <Input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="작성자를 입력하세요"
        />

        <Label>그룹 공개 선택</Label>
        <ToggleSwitch>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          <span></span>
          <span>{isPublic ? "공개" : "비공개"}</span>
        </ToggleSwitch>

        <Label>비밀번호 생성</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="그룹 비밀번호를 입력하세요"
        />

        <SubmitButton type="submit">만들기</SubmitButton>
      </Form>
    </CreateGroupContainer>
  );
};

export default CreateGroup;
