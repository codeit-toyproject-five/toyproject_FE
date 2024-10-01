import styled from "styled-components";

// 전체 페이지 컨테이너 스타일
export const MemoryDetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// 헤더 스타일
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;

  button {
    background-color: black;
    color: white;
    border: none;
    padding: 10px 15px;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #333;
    }
  }
`;

// 프로젝트 타이틀 스타일
export const ProjectTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

// 작성자 및 공개/비공개 상태 텍스트 스타일
export const AuthorInfoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;

  span {
    margin-right: 10px;
  }
`;

// 공개 상태 텍스트 스타일
export const PublicStatus = styled.span`
  font-size: 14px;
  color: ${({ isPublic }) => (isPublic ? "green" : "red")};
  margin-left: 10px;
`;

// 제목 스타일
export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin: 20px 0;
`;

// 정보(장소 및 상호작용 정보) 스타일
export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;

  button {
    background-color: black;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #333;
    }
  }
`;

// 조회수 및 공감 수 스타일
export const InteractionInfo = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #777;
`;

// 이미지 스타일
export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

// 본문 내용 스타일
export const Content = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #333;
`;

// 액션 버튼 컨테이너 스타일
export const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    background-color: black;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #333;
    }
  }
`;

// 태그 스타일
export const Tag = styled.span`
  display: inline-block;
  background-color: #f1f1f1;
  color: #555;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  margin-right: 10px;
  margin-bottom: 10px;
`;
