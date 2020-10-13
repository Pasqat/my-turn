import React from "react";
import styled from "styled-components";

const StyledBigCalendar = styled.div`
  /* TODO maybe call this container     */
  height: auto;
  background: var(--background-main);
  flex-grow: 1;
  padding: 2rem
`;

// 🤖 start from the calendar view in Sidebare, than try to replicate here
const BigCalendar = () => {
  return <StyledBigCalendar>Hello World</StyledBigCalendar>;
};

export default BigCalendar;
