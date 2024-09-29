import React, { useState } from "react";
import GroupDetailHeader from "../components/GroupDetailHeader"; // 헤더 컴포넌트
import GroupEditModal from "../components/GroupEditModal"; // 모달 컴포넌트
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
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate

const GroupDetail = ({ group }) => {
  const [isPublicMemory, setIsPublicMemory] = useState(true); // 공개/비공개 상태 관리
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 그룹 수정 모달 상태
  const navigate = useNavigate(); // 페이지 이동 함수

  const memories = group?.memories.filter(
    (memory) => memory.isPublic === isPublicMemory
  ); // 공개/비공개 필터링

  // 그룹 수정 모달 열기
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  // 그룹 수정 모달 닫기
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleMemoryUploadPage = () => {
    navigate("/memory-upload"); // 추억 올리기 페이지로 이동
  };

  return (
    <GroupDetailContainer>
      {/* 그룹 헤더 */}
      <GroupDetailHeader group={group} onEditClick={handleOpenEditModal} />

      {/* 필터 및 검색 영역 */}
      <FilterContainer>
        <div style={{ display: "flex", gap: "10px" }}>
          <FilterButton
            active={isPublicMemory}
            onClick={() => setIsPublicMemory(true)}
          >
            공개
          </FilterButton>
          <FilterButton
            active={!isPublicMemory}
            onClick={() => setIsPublicMemory(false)}
          >
            비공개
          </FilterButton>
          <SearchInput placeholder="태그 혹은 제목을 입력해 주세요" />
          <SortDropdown>
            <option value="likes">공감순</option>
            <option value="recent">최신순</option>
          </SortDropdown>
        </div>
        <PostButton onClick={handleMemoryUploadPage}>추억 올리기</PostButton>
        {/* 추억 올리기 버튼 */}
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
      {isEditModalOpen && (
        <GroupEditModal group={group} onClose={handleCloseEditModal} />
      )}
    </GroupDetailContainer>
  );
};

export default GroupDetail;
