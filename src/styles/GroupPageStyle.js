import styled from "styled-components";

export const GroupListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export const GroupCard = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(1.02);
  }
`;

export const GroupCardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
  aspect-ratio: 4 / 3;
`;

export const GroupCardContent = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const GroupCardTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
`;

export const GroupCardStats = styled.div`
  font-size: 12px;
  color: #777;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const CreateGroupButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #555;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  margin-top: 50px;
`;

export const EmptyMessage = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
`;

// LikeButton 스타일 정의
export const LikeButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007BFF")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  font-size: 14px;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;
