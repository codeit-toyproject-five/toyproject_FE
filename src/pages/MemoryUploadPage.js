import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UploadContainer,
  UploadForm,
  FormGroup,
  Input,
  TextArea,
  Label,
  Button,
  ToggleContainer,
  ToggleSwitchLabel,
  CloseButtonContainer,
  CloseButton,
} from "../styles/MemoryUploadStyle";
import PasswordModal from "../components/PasswordModal"; // 모달 컴포넌트 추가

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

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemoryData({ ...memoryData, [name]: value });
  };

  const handleFileChange = (e) => {
    setMemoryData({ ...memoryData, image: e.target.files[0] });
  };

  const handleToggleChange = () => {
    setMemoryData((prevData) => ({
      ...prevData,
      isPublic: !prevData.isPublic,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memoryData.isPublic) {
      // 비공개로 설정된 경우 모달 열기
      setIsModalOpen(true);
    } else {
      // 공개인 경우 바로 업로드 처리
      console.log(memoryData);
      // 업로드 처리 로직
    }
  };

  const handleModalSubmit = (password) => {
    setIsModalOpen(false);
    console.log("추억 올리기 데이터:", memoryData, "비밀번호:", password);
    // 비밀번호 인증 후 업로드 처리 로직 추가
  };

  // 닫기 버튼 클릭 시 페이지 뒤로 이동
  const handleClose = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <UploadContainer>
      <CloseButtonContainer>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
      </CloseButtonContainer>
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
            <ToggleSwitchLabel>
              <input
                type="checkbox"
                checked={!memoryData.isPublic}
                onChange={handleToggleChange}
              />
              비공개
            </ToggleSwitchLabel>
          </ToggleContainer>
        </FormGroup>
        {!memoryData.isPublic && (
          <FormGroup>
            <Label>비밀번호 생성</Label>
            <Input
              type="password"
              name="password"
              placeholder="추억 비밀번호를 생성해 주세요"
              value={memoryData.password}
              onChange={handleInputChange}
            />
          </FormGroup>
        )}
        <Button type="submit">올리기</Button>
      </UploadForm>

      {isModalOpen && (
        <PasswordModal
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </UploadContainer>
  );
};

export default MemoryUploadPage;
