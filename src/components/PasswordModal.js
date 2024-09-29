import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  CloseButton,
  ModalBody,
  Input,
  Button,
} from "../styles/PasswordModalStyle";

const PasswordModal = ({ onSubmit, onClose }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password); // 비밀번호 전달
  };

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <h3>추억 올리기</h3>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <Input
              type="password"
              placeholder="그룹 비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">제출하기</Button>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
};

export default PasswordModal;
