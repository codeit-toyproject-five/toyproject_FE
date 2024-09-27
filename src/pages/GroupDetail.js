import React, { useState } from "react";
import GroupDetailHeader from "../components/GroupDetailHeader"; // 헤더 컴포넌트
import GroupEditModal from "../components/GroupEditModal.js"; // 모달 컴포넌트
import {
  GroupDetailContainer,
  MemoryListContainer,
  EmptyMessageContainer,
  EmptyMessage,
  PostButton,
  FilterContainer,
  FilterButton,
  SearchInput,
  SortDropdown,
} from "../styles/GroupDetailStyle"; // 스타일 임포트

const GroupDetail = ({ group }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림/닫힘 상태 관리

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const memories = group?.memories || []; // 그룹에 추억이 없을 경우 빈 배열로 처리

  return (
    <GroupDetailContainer>
      {/* 그룹 헤더 */}
      <GroupDetailHeader group={group} onEditClick={handleOpenModal} />{" "}
      {/* 그룹 수정 클릭 시 모달 열기 */}
      {/* 필터 및 검색 영역 */}
      <FilterContainer>
        <div style={{ display: "flex", gap: "10px" }}>
          <FilterButton active={true}>공개</FilterButton>
          <FilterButton active={false}>비공개</FilterButton>
          <SearchInput placeholder="태그 혹은 제목을 입력해 주세요" />
          <SortDropdown>
            <option value="likes">공감순</option>
            <option value="recent">최신순</option>
          </SortDropdown>
        </div>
        <PostButton>추억 올리기</PostButton> {/* 추억 올리기 버튼 */}
      </FilterContainer>
      {/* 메모리 리스트 */}
      <MemoryListContainer>
        {memories.length > 0 ? (
          memories.map((memory) => (
            <div key={memory.id}>
              <p>{memory.title}</p>
            </div>
          ))
        ) : (
          <EmptyMessageContainer>
            <EmptyMessage>
              <img src="/empty-icon.png" alt="empty" />
              <p>게시된 추억이 없습니다.</p>
              <p>첫 번째 추억을 올려보세요!</p>
            </EmptyMessage>
          </EmptyMessageContainer>
        )}
      </MemoryListContainer>
      {/* 그룹 수정 모달 */}
      {isModalOpen && (
        <GroupEditModal group={group} onClose={handleCloseModal} />
      )}
    </GroupDetailContainer>
  );
};

export default GroupDetail;
