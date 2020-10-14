import React from "react";
import styled, { css } from "styled-components";

import Calendar from "./calendar/Calendar";

const StyledSideBar = styled.div`
  max-width: 18rem;
  border-right: var(--color-border);
  height: 75vh; /* TODO delete me!!! */
  position: fixed
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
      <Calendar />
      <Legend>
        <LegendItem>
          <ItemDot color="primary" />
          Mattina
        </LegendItem>
        <LegendItem>
          <ItemDot color="secondary" />
          Pomeriggio
        </LegendItem>
        <LegendItem>
          <ItemDot color="terziary" />
          Sera
        </LegendItem>
      </Legend>
    </StyledSideBar>
  );
};

export default Sidebar;
