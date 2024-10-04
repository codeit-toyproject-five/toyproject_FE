import styled from "styled-components";

export const PrivateMemoryListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(240px, 1fr)
  ); // 항목들이 자동으로 채워짐
  gap: 20px;
  padding: 20px;
  justify-content: start; // 카드들이 왼쪽부터 배치되도록 설정
  align-content: start; // 카드가 상단부터 정렬되도록 설정
  width: 100%; // 부모 컨테이너의 너비를 100%로 설정
  background-color: #f9f9f9;
`;

export const PrivateMemoryCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  width: 240px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

export const MemoryInfo = styled.div`
  font-size: 14px;
  color: #333;

  h3 {
    font-size: 16px;
    margin: 5px 0;
    color: #333;
  }

  p {
    margin: 5px 0;
    font-size: 12px;
    color: #999;
  }
`;
