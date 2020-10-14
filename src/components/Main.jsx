import React from "react";
import styled from "styled-components";

import SideBar from "./Sidebar";
import BigCalendar from "./calendar/BigCalendar";

const StyledMain = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
`;

const Main = () => {
  return (
    <StyledMain>
      <SideBar />
      <BigCalendar />
    </StyledMain>
  );
};

export default Main;
