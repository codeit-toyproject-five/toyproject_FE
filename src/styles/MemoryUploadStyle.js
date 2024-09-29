import styled from "styled-components";

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

export const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 150px;
`;

export const Button = styled.button`
  padding: 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleSwitchLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  input {
    margin-right: 0.5rem;
    transform: scale(1.5);
  }
`;

export const CloseButtonContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #555;
  }
`;
