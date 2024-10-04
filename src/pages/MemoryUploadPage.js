// src/pages/MemoryUploadPage.js
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  UploadContainer,
  UploadForm,
  FormGroup,
  Label,
  Input,
  TextArea,
  ToggleContainer,
  SubmitButton,
  CloseButton,
  ToggleSwitchStyled,
  PasswordInput,
} from "../styles/MemoryUploadStyle";
import PasswordModal from "../components/PasswordModal";

const MemoryUploadPage = ({ groups, addMemoryToGroup }) => {
  const { groupId } = useParams(); // URL에서 그룹 ID 가져오기
  const group = groups.find((g) => g.id === parseInt(groupId));
  const [memoryData, setMemoryData] = useState({
    nickname: "",
    title: "",
    image: null,
    content: "",
    tags: "",
    location: "",
    date: "",
    isPublic: true,
    password: "", // 추억 비밀번호 (비공개 추억에만 사용)
  });

  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemoryData({ ...memoryData, [name]: value });
  };

  const handleFileChange = (e) => {
    setMemoryData({ ...memoryData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 입력 필드 확인
    if (
      !memoryData.nickname ||
      !memoryData.title ||
      !memoryData.content ||
      !memoryData.location ||
      !memoryData.date ||
      (!memoryData.isPublic && !memoryData.password) // 비공개 추억일 경우 비밀번호 필수
    ) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    // 그룹 비밀번호 인증을 위해 모달 열기
    setPasswordModalOpen(true);
  };

  const handleModalSubmit = (groupPassword) => {
    // 그룹 비밀번호를 확인하고 추억 생성
    if (groupPassword === group.password) {
      setPasswordModalOpen(false);

      const newMemory = {
        id: Date.now(),
        groupId: group.id, // 그룹 ID 추가
        nickname: memoryData.nickname,
        title: memoryData.title,
        imageUrl: memoryData.image ? URL.createObjectURL(memoryData.image) : "",
        content: memoryData.content,
        tags: memoryData.tags,
        location: memoryData.location,
        date: memoryData.date,
        isPublic: memoryData.isPublic,
        password: memoryData.isPublic ? null : memoryData.password, // 비공개일 경우 추억 비밀번호 저장
        likes: 0,
        views: 0,
      };

      addMemoryToGroup(group.id, newMemory);

      alert("추억이 성공적으로 생성되었습니다.");

      navigate(`/group/${group.id}`); // 그룹 상세 페이지로 이동
    } else {
      alert("그룹 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleModalClose = () => {
    setPasswordModalOpen(false);
  };

  const handleCloseModal = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const togglePublicOption = () => {
    setMemoryData({ ...memoryData, isPublic: !memoryData.isPublic });
  };

  return (
    <UploadContainer>
      <h2>추억 올리기</h2>
      <UploadForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>닉네임</Label>
          <Input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해 주세요"
            value={memoryData.nickname}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>제목</Label>
          <Input
            type="text"
            name="title"
            placeholder="제목을 입력해 주세요"
            value={memoryData.title}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>이미지</Label>
          <Input type="file" onChange={handleFileChange} />
        </FormGroup>
        <FormGroup>
          <Label>본문</Label>
          <TextArea
            name="content"
            placeholder="본문 내용을 입력해 주세요"
            value={memoryData.content}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>태그</Label>
          <Input
            type="text"
            name="tags"
            placeholder="태그를 입력해 주세요"
            value={memoryData.tags}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>장소</Label>
          <Input
            type="text"
            name="location"
            placeholder="장소를 입력해 주세요"
            value={memoryData.location}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>추억의 순간</Label>
          <Input
            type="date"
            name="date"
            value={memoryData.date}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>추억 공개 선택</Label>
          <ToggleContainer>
            <ToggleSwitchStyled>
              <input
                type="checkbox"
                checked={memoryData.isPublic}
                onChange={togglePublicOption}
              />
              <span></span>
            </ToggleSwitchStyled>
            <span>{memoryData.isPublic ? "공개" : "비공개"}</span>
          </ToggleContainer>
        </FormGroup>
        {!memoryData.isPublic && (
          <FormGroup>
            <Label>추억 비밀번호</Label>
            <PasswordInput
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              value={memoryData.password}
              onChange={handleInputChange}
              required={!memoryData.isPublic}
            />
          </FormGroup>
        )}
        <SubmitButton type="submit">올리기</SubmitButton>
      </UploadForm>
      <CloseButton onClick={handleCloseModal}>×</CloseButton>

      {isPasswordModalOpen && (
        <PasswordModal
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
          title="그룹 비밀번호 인증"
          placeholder="그룹 비밀번호를 입력해 주세요"
        />
      )}
    </UploadContainer>
  );
};

export default MemoryUploadPage;
