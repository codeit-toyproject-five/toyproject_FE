// src/components/MemoryEditModal.js
import React, { useState, useEffect } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  TextArea,
  SubmitButton,
} from "../styles/ModalStyles";

const MemoryEditModal = ({ onClose, memory, onSubmit }) => {
  const [nickname, setNickname] = useState(memory.nickname || "");
  const [title, setTitle] = useState(memory.title || "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(memory.imageUrl || "");
  const [content, setContent] = useState(memory.content || "");
  const [tags, setTags] = useState(memory.tags.join(", ") || "");
  const [location, setLocation] = useState(memory.location || "");
  const [date, setDate] = useState(memory.date || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // 예시로, 비밀번호가 입력되었는지 확인
      if (!password) {
        throw new Error("비밀번호를 입력해 주세요.");
      }

      // 수정할 데이터 준비
      const updatedMemory = {
        nickname,
        title,
        content,
        tags: tags.split(",").map((tag) => tag.trim()), // 태그 배열로 변환
        location,
        date,
        postPassword: password, // 서버가 기대하는 필드 이름으로 추가
      };

      // 이미지가 변경된 경우 처리
      if (image) {
        updatedMemory.imageUrl = imagePreview; // 서버에서 반환한 URL로 교체 필요
      }

      // 부모에게 업데이트된 데이터를 전달
      await onSubmit(updatedMemory);
      onClose();
    } catch (err) {
      console.error("추억 수정 오류:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "추억을 수정하는 데 실패했습니다."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>추억 수정</h2>
        <CloseButton onClick={onClose}>×</CloseButton>

        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해 주세요"
            required
          />

          <InputField
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
            required
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="미리보기"
              style={{
                width: "100%",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
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
            required
          />

          <InputField
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="태그를 입력해 주세요 (콤마로 구분)"
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

          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="추억 비밀번호를 입력해 주세요"
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "수정 중..." : "수정하기"}
          </SubmitButton>
        </form>
      </ModalContent>
    </ModalContainer>
  );
};

export default MemoryEditModal;
