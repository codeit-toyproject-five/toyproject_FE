// src/styles/GroupPageStyle.js
import styled from "styled-components";

export const GroupListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  margin-bottom: 20px;

  img {
    width: 100px;
    margin-bottom: 20px;
  }

  p {
    font-size: 16px;
    color: #666;
    margin: 5px 0;
  }
`;

export const CreateGroupButton = styled.button`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #555;
  }
`;
