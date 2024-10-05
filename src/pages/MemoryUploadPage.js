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
import { createPost } from "../api/postService"; // postService에서 createPost 임포트
import api from "../api/api"; // 이미지 업로드를 위한 API 인스턴스

const MemoryUploadPage = ({ groups, addMemoryToGroup }) => {
  const { groupId } = useParams(); // URL에서 그룹 ID 가져오기
  const [memoryData, setMemoryData] = useState({
    nickname: "",
    title: "",
    content: "",
    tags: "",
    location: "",
    date: "",
    isPublic: true,
    password: "", // 추억 비밀번호
    image: null, // 이미지 파일
  });

  const [error, setError] = useState(""); // 에러 처리용 상태
  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemoryData({ ...memoryData, [name]: value });
  };

  // 파일 변경 핸들러
  const handleFileChange = (e) => {
    setMemoryData({ ...memoryData, image: e.target.files[0] });
  };

  // 이미지 업로드 함수
  const uploadImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await api.post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.imageUrl; // 업로드된 이미지 URL 반환
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("이미지 업로드에 실패했습니다.");
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !memoryData.nickname ||
      !memoryData.title ||
      !memoryData.content ||
      !memoryData.location ||
      !memoryData.date ||
      !memoryData.password ||
      !memoryData.image // 이미지 파일 필수
    ) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    try {
      // 이미지 파일을 먼저 업로드하여 URL을 받아옴
      const imageUrl = await uploadImage(memoryData.image);

      // tags를 콤마로 구분된 문자열로 받아서 배열로 변환
      const tagsArray = memoryData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""); // 빈 태그 제거

      // 서버에 전송할 바디 데이터
      const postData = {
        nickname: memoryData.nickname,
        title: memoryData.title,
        content: memoryData.content,
        postPassword: memoryData.password,
        imageUrl, // 업로드된 이미지 URL
        tags: tagsArray, // 태그 배열로 전송
        location: memoryData.location,
        moment: memoryData.date,
        isPublic: memoryData.isPublic,
      };

      console.log("Post Data 내용:", postData);

      // 게시글 생성 API 호출
      const createResponse = await createPost(groupId, postData);

      if (createResponse && createResponse.id) {
        alert("추억이 성공적으로 생성되었습니다.");
        addMemoryToGroup(groupId, createResponse);

        navigate(`/group/${groupId}`);
      } else {
        setError("게시글 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error creating memory:", error);
      setError("서버와의 통신에 문제가 발생했습니다.");
    }
  };

  // 모달 닫기 버튼
  const handleCloseModal = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 공개 설정 토글
  const togglePublicOption = () => {
    setMemoryData({ ...memoryData, isPublic: !memoryData.isPublic });
  };

  return (
    <UploadContainer>
      <h2>추억 올리기</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
          <Input type="file" accept="image/*" onChange={handleFileChange} />
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
            placeholder="태그를 입력해 주세요 (콤마로 구분)"
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
        <FormGroup>
          <Label>추억 비밀번호</Label>
          <PasswordInput
            type="password"
            name="password"
            placeholder="비밀번호를 입력해 주세요"
            value={memoryData.password}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">올리기</SubmitButton>
      </UploadForm>
      <CloseButton onClick={handleCloseModal}>×</CloseButton>
    </UploadContainer>
  );
};

export default MemoryUploadPage;
