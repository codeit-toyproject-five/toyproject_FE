import styled from "styled-components";

// 그룹 헤더 컨테이너
export const GroupHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1150px; /* 디테일 섹션과 동일하게 크기 설정 */
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  position: relative; /* 수정/삭제 버튼을 포함시키기 위해 필요 */
`;

// 그룹 이미지 스타일
export const GroupImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 20px;
`;

// 그룹 정보 스타일
export const GroupInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// 그룹 타이틀
export const GroupTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

// 그룹 설명
export const GroupDescription = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #555;
`;

// 그룹 통계
export const GroupStatistics = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #777;
`;

// 배지 컨테이너
export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

// 배지 스타일
export const Badge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background-color: #f1f1f1;
  color: #333;
  border-radius: 20px;
  font-size: 14px;
  border: 1px solid #ddd;
  white-space: nowrap;
`;

// 그룹 수정/삭제 버튼 컨테이너
export const GroupActionsContainer = styled.div`
  display: flex;
  gap: 10px;
  /* position을 absolute에서 relative로 변경하여 컨테이너 내에 유지 */
  align-self: flex-end; /* 오른쪽 끝에 맞추기 위해 추가 */
`;

// 수정 및 삭제 버튼
export const GroupLinkButton = styled.button`
  background: none;
  border: none;
  color: #999;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

// 공감 보내기 버튼 (작게)
export const GroupActionButtonSmall = styled.button`
  padding: 8px 16px;
  background-color: #333;
  color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #555;
  }
`;
