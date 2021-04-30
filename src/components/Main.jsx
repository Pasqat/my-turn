import React from "react"
import styled from "styled-components"

import SideBar from "./Sidebar"
import BigCalendar from "./calendar/BigCalendar"

const StyledMain = styled.div`
    width: 100vw;
    display: flex;
    @media (max-width: 800px) {
        flex-direction: column;
    }
`

const Main = () => {
    return (
        <StyledMain>
            <SideBar />
            <BigCalendar
                style={{
                    backgroundColor: "var(--gradient-background)",
                    height: "100%",
                }}
            />
        </StyledMain>
    )
}

export default Main
