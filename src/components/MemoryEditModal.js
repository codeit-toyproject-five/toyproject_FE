import React, { useState, useEffect } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  TextArea,
  SubmitButton,
  ToggleSwitchStyled,
  PublicStatusText,
} from "../styles/ModalStyles";

const MemoryEditModal = ({ onClose, onSubmit, memory }) => {
  const [nickname, setNickname] = useState(memory.nickname || "");
  const [title, setTitle] = useState(memory.title || "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(memory.imageUrl || "");
  const [content, setContent] = useState(memory.content || "");
  const [tags, setTags] = useState(memory.tags || "");
  const [location, setLocation] = useState(memory.location || "");
  const [date, setDate] = useState(memory.date || "");
  const [isPublic, setIsPublic] = useState(memory.isPublic || true);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMemory = {
      nickname,
      title,
      image: image || memory.imageUrl,
      imageUrl: image ? URL.createObjectURL(image) : memory.imageUrl,
      content,
      tags,
      location,
      date,
      isPublic,
      password,
    };

    onSubmit(updatedMemory);
    onClose();
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>추억 수정</h2>
        <CloseButton onClick={onClose}>×</CloseButton>

        <InputField
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해 주세요"
        />

        <InputField
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해 주세요"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="미리보기"
            style={{ width: "100%", marginBottom: "15px", borderRadius: "8px" }}
          />
        )}
        <InputField
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          placeholder="파일을 선택해 주세요"
        />

        <TextArea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="본문 내용을 입력해 주세요"
        />

        <InputField
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="태그를 입력해 주세요"
        />

        <InputField
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="장소를 입력해 주세요"
        />

        <InputField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div>
          <label>추억 공개 선택</label>
          <ToggleSwitchStyled>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <span className="slider round"></span>
          </ToggleSwitchStyled>
          <PublicStatusText isPublic={isPublic}>
            {isPublic ? "공개" : "비공개"}
          </PublicStatusText>
        </div>

        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="수정 비밀번호를 입력해 주세요"
        />

        <SubmitButton onClick={handleSubmit}>수정하기</SubmitButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default MemoryEditModal;
