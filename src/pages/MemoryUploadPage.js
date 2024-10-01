import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const MemoryUploadPage = () => {
  const [memoryData, setMemoryData] = useState({
    nickname: "",
    title: "",
    image: null,
    content: "",
    tags: "",
    location: "",
    date: "",
    isPublic: true,
    password: "",
  });

  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState(""); // 모달에서 받은 비밀번호 저장
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

    if (!memoryData.isPublic && memoryData.password !== confirmedPassword) {
      setPasswordModalOpen(true); // 모달 열기 (비밀번호 확인)
    } else {
      const newMemory = {
        ...memoryData,
        id: Date.now(), // 고유한 ID
        imageUrl: URL.createObjectURL(memoryData.image), // 이미지 URL 생성
      };

      // 추억 업로드 후 상세 페이지로 이동
      navigate("/memory-detail", { state: { memory: newMemory } });
    }
  };

  const handleModalSubmit = (password) => {
    if (password === memoryData.password) {
      setConfirmedPassword(password);
      setPasswordModalOpen(false); // 모달 닫기

      const newMemory = {
        ...memoryData,
        id: Date.now(), // 고유한 ID
        imageUrl: URL.createObjectURL(memoryData.image), // 이미지 URL 생성
      };

      // 비밀번호 확인 후 추억 상세 페이지로 이동
      navigate("/memory-detail", { state: { memory: newMemory } });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleModalClose = () => {
    setPasswordModalOpen(false); // 모달 닫기
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
          {!memoryData.isPublic && (
            <PasswordInput
              type="password"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              value={memoryData.password}
              onChange={handleInputChange}
            />
          )}
        </FormGroup>
        <SubmitButton type="submit">올리기</SubmitButton>
      </UploadForm>
      <CloseButton onClick={handleCloseModal}>×</CloseButton>

      {isPasswordModalOpen && (
        <PasswordModal
          onSubmit={handleModalSubmit}
          onClose={handleModalClose}
        />
      )}
    </UploadContainer>
  );
};

export default MemoryUploadPage;
