import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: white;
  border-bottom: 1px solid #ddd;
`;

export const Logo = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

export const FilterButton = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? "#000" : "#ddd")};
  color: ${({ active }) => (active ? "white" : "black")};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
`;

export const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  width: 300px;
  margin-left: 10px;
`;

export const CreateGroupButton = styled.button`
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

export const SortDropdown = styled.select`
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
`;
