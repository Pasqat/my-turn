import React from "react";
import styled from "styled-components";

import Calendar from "./Calendar";

const StyledSideBar = styled.div`
  max-width: 18rem;
  border-right: var(--color-border);
  height: 75vh; /* TODO delete me!!! */
`;

const Sidebar = () => {
  return (
    <StyledSideBar>
      <Calendar />
    </StyledSideBar>
  );
};

export default Sidebar;
