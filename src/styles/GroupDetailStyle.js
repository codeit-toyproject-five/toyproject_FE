import styled from "styled-components";

// 전체 컨테이너
export const GroupDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  width: 100%;
`;

// 그룹 헤더 컨테이너
export const GroupHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 900px; /* 컨테이너 크기 수정 */
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const GroupImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

export const GroupInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const GroupTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

export const GroupDescription = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #555;
`;

export const GroupStatistics = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #777;
`;

// Badge 및 관련 스타일 추가
export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 5px 15px;
  background-color: #f1f1f1;
  color: #333;
  border-radius: 20px;
  font-size: 14px;
  border: 1px solid #ddd;
  white-space: nowrap;
`;

// GroupLinkButtons 및 GroupLinkButton 스타일 추가
export const GroupLinkButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
`;

export const GroupLinkButton = styled.a`
  color: #999;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

// GroupActionButton 스타일 추가
export const GroupActionButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #555;
  }
`;

// 필터 및 검색 부분 스타일
export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 900px; /* 컨테이너 크기 수정 */
  margin-bottom: 20px;
  gap: 15px;
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? "#000" : "#ddd")};
  color: ${({ active }) => (active ? "white" : "black")};
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-left: 10px;
  width: 470px; /* 입력창 넓이 확대 */
`;

export const SortDropdown = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
`;

export const PostButton = styled.button`
  padding: 10px 20px; /* 버튼 크기 축소 */
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

// 메모리 리스트 컨테이너
export const MemoryListContainer = styled.div`
  width: 100%;
  max-width: 900px; /* 컨테이너 크기 수정 */
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 200px;
  margin-bottom: 20px;
`;

export const EmptyMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const EmptyMessage = styled.div`
  text-align: center;

  img {
    width: 100px;
    margin-bottom: 20px;
  }

  p {
    color: #777;
  }
`;
