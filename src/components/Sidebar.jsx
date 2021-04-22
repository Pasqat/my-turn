import React from "react";
import styled, { css } from "styled-components";

import Calendar from "./calendar/Calendar";

const StyledSideBar = styled.div`
  max-width: 18rem;
  /* border-right: var(--color-border); */
  position: sticky;
  top: 0;
`;

const Legend = styled.div`
  padding: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
`;

const ItemDot = styled.div`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  border-radius: 50%;

  ${(props) => {
    if (props.color === "primary") {
      return css`
        background-color: var(--color-primary);
      `;
    } else if (props.color === "secondary") {
      return css`
        background-color: var(--color-secondary);
      `;
    } else if (props.color === "green") {
      return css`
        background-color: var(--color-green);
      `;
    } else {
      return css`
        background-color: var(--color-terziary);
      `;
    }
  }}
`;

const Sidebar = () => {
  return (
    <StyledSideBar>
      {/* <Calendar /> */}
      {/* TODO the div is just a placeholder, REMOVE */}
      <div style={{ height: 59, borderBottom: "var(--color-border)" }}></div>
      <Legend>
        <LegendItem>
          <ItemDot color="primary" />
          Morning
        </LegendItem>
        <LegendItem>
          <ItemDot color="secondary" />
          Evening
        </LegendItem>
        <LegendItem>
          <ItemDot color="terziary" />
          Night
        </LegendItem>
        <LegendItem>
          <ItemDot color="green" />
          Full Day
        </LegendItem>
      </Legend>
    </StyledSideBar>
  );
};

export default Sidebar;
