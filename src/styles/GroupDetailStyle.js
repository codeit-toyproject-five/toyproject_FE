import styled from "styled-components";

// 전체 컨테이너
export const GroupDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

// 필터 및 검색 부분 컨테이너
export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// 필터 버튼
export const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? "#000" : "#ddd")};
  color: ${({ active }) => (active ? "white" : "black")};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
`;

// 검색 입력창 스타일
export const SearchInput = styled.input`
  flex: 5;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-left: 10px;
  max-width: 1000px;
  min-width: 700px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-left: 0;
  }
`;

// 정렬 드롭다운
export const SortDropdown = styled.select`
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
`;

// 추억 올리기 버튼
export const PostButton = styled.button`
  padding: 15px 30px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  margin-left: 10px;

  &:hover {
    background-color: #555;
  }
`;

// 메모리 리스트 컨테이너
export const MemoryListContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 200px;
  margin-bottom: 20px;
`;

// 빈 메시지 컨테이너
export const EmptyMessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

// 빈 메시지 스타일
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

// 그룹 수정/삭제 버튼 컨테이너
export const GroupActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  top: 10px;
  right: 20px;
  margin-top: 10px;
`;
