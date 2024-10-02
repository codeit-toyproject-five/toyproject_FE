import styled from "styled-components";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const MemoryDetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

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

export const ProjectTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

export const PublicStatus = styled.span`
  font-size: 14px;
  color: ${({ isPublic }) => (isPublic ? "green" : "red")};
  margin-left: 10px;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin: 20px 0;
`;

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

export const InteractionInfo = styled.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #777;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const Content = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #333;
`;

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

export const Button = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

export const CommentsContainer = styled.div`
  margin-top: 20px;
`;

export const Comment = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  position: relative; /* Position relative for absolute positioning of icons */

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nickname {
    font-weight: bold;
    font-size: 16px;
  }

  .date {
    font-size: 14px;
    color: #888;
  }

  .comment-content {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }

  .comment-actions {
    display: flex;
    gap: 10px;
    position: absolute;
    bottom: 10px; /* Place actions at the bottom */
    right: 10px; /* Align to the right */
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background-color: ${({ active }) => (active ? "#333" : "white")};
  color: ${({ active }) => (active ? "white" : "#333")};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
    color: white;
  }
`;

export const EditIcon = styled(FaEdit)`
  cursor: pointer;
  font-size: 16px;
  color: #888;

  &:hover {
    color: #333;
  }
`;

export const DeleteIcon = styled(FaTrashAlt)`
  cursor: pointer;
  font-size: 16px;
  color: #888;

  &:hover {
    color: #333;
  }
`;

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
