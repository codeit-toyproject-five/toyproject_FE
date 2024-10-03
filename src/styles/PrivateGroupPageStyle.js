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
  height: 150px; /* 고정된 이미지 높이 */
  object-fit: cover; /* 이미지가 고정 크기에 맞춰 잘리지 않도록 설정 */
  border-bottom: 1px solid #ddd; /* 이미지와 콘텐츠 사이에 구분선 추가 */
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
