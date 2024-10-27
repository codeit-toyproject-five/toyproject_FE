// Badge.js
import React from "react";
import styled from "styled-components";

const BadgeContainer = styled.div`
  display: inline-block;
  padding: 5px 10px;
  margin-right: 5px;
  background-color: #f0c674;
  border-radius: 5px;
  font-size: 0.8em;
  color: #333;
`;

const Badge = ({ label }) => {
  return <BadgeContainer>{label}</BadgeContainer>;
};

export default Badge;
