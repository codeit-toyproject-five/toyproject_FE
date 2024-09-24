import React from "react";
import { Link } from "react-router-dom";
import {
  HeaderContainer,
  Logo,
  FilterButton,
  SearchInput,
  CreateGroupButton,
  SortDropdown,
} from "../styles/HeaderStyle";

const Header = ({ isPublic, setIsPublic }) => {
  return (
    <HeaderContainer>
      <Logo>조각집 🌼</Logo>
      <div>
        {/* 공개/비공개 상태 변경 버튼 */}
        <FilterButton active={isPublic} onClick={() => setIsPublic(true)}>
          공개
        </FilterButton>
        <FilterButton active={!isPublic} onClick={() => setIsPublic(false)}>
          비공개
        </FilterButton>
        <SearchInput placeholder="그룹명을 검색해 주세요" />
        <SortDropdown>
          <option value="recent">공감순</option>
          <option value="popular">인기순</option>
        </SortDropdown>
      </div>
      <Link to="/create-group">
        <CreateGroupButton>그룹 만들기</CreateGroupButton>
      </Link>
    </HeaderContainer>
  );
};

export default Header;
