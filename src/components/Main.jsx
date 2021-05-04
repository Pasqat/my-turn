import React from "react"
import styled from "styled-components"

import SideBar from "./Sidebar"
import BigCalendar from "./calendar/BigCalendar"

import teamService from "../services/teams"

const StyledMain = styled.div`
    width: 100vw;
    display: flex;
    @media (max-width: 800px) {
        flex-direction: column;
    }
`

const Main = () => {
    const [acceptedShift, setAcceptedShift] = React.useState()

    React.useEffect(() => {
        teamService.getAcceptedShift().then((data) => {
            return setAcceptedShift(data.acceptedShift)
        })
    }, [setAcceptedShift, acceptedShift])

    return (
        <StyledMain>
            <SideBar acceptedShift={acceptedShift} />
            <BigCalendar
                style={{
                    backgroundColor: "var(--gradient-background)",
                    height: "100%",
                }}
                acceptedShift={acceptedShift}
            />
        </StyledMain>
    )
}

export default Main
