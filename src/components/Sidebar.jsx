import React from "react"
import styled from "styled-components"

// import Calendar from './calendar/Calendar'

import AcceptedSchiftLegend from "./acceptedShiftLegend/acceptedShiftLegend"

const StyledSideBar = styled.div`
  max-width: 18rem;
  @media (max-width: 800px) {
    max-width: inherit;
  }
`

const Spacer = styled.div`
  height: 59px;
  @media (max-width: 800px) {
    display: none;
  }
`

const Sidebar = () => {
  return (
    <StyledSideBar>
      {/* <Calendar /> */}
      {/* TODO the div is just a placeholder, REMOVE */}
      <Spacer />
      <AcceptedSchiftLegend />
    </StyledSideBar>
  )
}

export default Sidebar
