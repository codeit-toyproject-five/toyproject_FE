// src/components/PasswordModal.js
import React, { useState } from "react";
import {
  ModalContainer,
  ModalContent,
  CloseButton,
  InputField,
  SubmitButton,
  ModalHeader,
  ModalBody,
} from "../styles/PasswordModalStyle";

const PasswordModal = ({ onSubmit, onClose, title, placeholder }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password); // 비밀번호 전달
    setPassword("");
  };

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <h3>{title}</h3>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <InputField
              type="password"
              placeholder={placeholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <SubmitButton type="submit">제출하기</SubmitButton>
          </form>
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
};

export default PasswordModal;
