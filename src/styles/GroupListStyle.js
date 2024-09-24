import styled from "styled-components";

export const GroupListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px); /* 전체 화면 중앙 정렬을 위해 높이 조정 */
  flex-direction: column;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  margin-bottom: 20px;

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #555;
  }

  p:first-child {
    font-weight: bold;
  }
`;

export const CreateGroupButton = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  width: fit-content;
`;
