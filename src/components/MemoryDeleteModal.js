import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
} from "../styles/ModalStyles";
import { verifyPostPassword, deletePost } from "../api/postService"; // API 함수 추가
import { useNavigate } from "react-router-dom";

const MemoryDeleteModal = ({ onClose, memory }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setError("");
    setIsDeleting(true);

    try {
      // 비밀번호 확인 로그 추가
      console.log(
        "비밀번호 검증 요청 중... 메모리 ID:",
        memory.id,
        "입력된 비밀번호:",
        password
      );

      // 비밀번호 검증 요청
      const verifyResponse = await verifyPostPassword(memory.id, password);
      console.log("비밀번호 검증 성공:", verifyResponse);

      // 게시글 삭제 로그 추가
      console.log(
        "게시글 삭제 요청 중... 메모리 ID:",
        memory.id,
        "비밀번호:",
        password
      );

      // 게시글 삭제 요청
      const deleteResponse = await deletePost(memory.id, password);
      console.log("게시글 삭제 성공:", deleteResponse);

      alert("추억이 성공적으로 삭제되었습니다.");
      navigate(`/group/${memory.groupId}`);
      onClose();
    } catch (err) {
      console.error("추억 삭제 오류:", err);

      // 서버에서 반환한 에러 메시지를 정확히 표시
      setError(err.message || "추억을 삭제하는 데 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>추억 삭제</h2>
        <CloseButton onClick={onClose}>×</CloseButton>
        <InputField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="추억 비밀번호를 입력해 주세요"
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <SubmitButton onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "삭제 중..." : "삭제하기"}
        </SubmitButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default MemoryDeleteModal;
