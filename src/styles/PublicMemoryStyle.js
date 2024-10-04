import styled from "styled-components";

export const PublicMemoryListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(240px, 1fr)
  ); // 카드들이 자동으로 왼쪽부터 채워짐
  gap: 0px;
  padding: 0px;
  background-color: #f9f9f9;
  justify-items: start; // 카드들이 항상 왼쪽에서 시작하도록 설정
  align-items: start; // 카드들이 항상 상단에서 시작되도록 설정
  width: 100%; // 부모 컨테이너의 너비를 100%로 설정
  box-sizing: border-box; // 패딩을 포함한 전체 크기를 계산
`;

export const PublicMemoryCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  width: 240px; // 카드의 너비를 고정
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

export const MemoryImage = styled.img`
  width: 100%;
  height: 180px; // 이미지 크기 고정
  object-fit: cover; // 이미지 비율을 유지하며 크기 맞춤
  border-radius: 8px;
`;

export const MemoryInfo = styled.div`
  font-size: 14px;
  color: #333;
  text-align: left;

  h3 {
    font-size: 16px;
    margin: 5px 0;
  }

  p {
    margin: 5px 0;
  }
`;

export const Tags = styled.div`
  margin: 5px 0;
  font-size: 12px;
  color: #666;

  span {
    margin-right: 5px;
  }
`;
