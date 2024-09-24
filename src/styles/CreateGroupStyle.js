import styled from "styled-components";

export const CreateGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 100vh; /* 페이지 전체를 채우도록 설정 */
  background-color: #f8f9fa; /* 배경색 설정 */
`;

export const Form = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  height: 100px;
  resize: none;
`;

export const ToggleSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    width: 40px;
    height: 20px;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
`;
