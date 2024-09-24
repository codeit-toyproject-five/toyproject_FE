import styled from "styled-components";

export const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
  width: 250px;
  background-color: white;
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 10px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 18px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #555;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #777;
`;
