import React from "react";
import styled from "styled-components";

const CustomCursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ff5e5e;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  pointer-events: none;
  user-select: none;
`;

const Cursor = () => {
  return <CustomCursor />;
}

export default Cursor