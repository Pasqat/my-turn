import React from "react"
import styled from "styled-components"

import SideBar from "./Sidebar"
import Calendar from "./calendar/calendar"
import StatisticsBlock from "./statistisBlock/statisticsBlock"

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
    }, [setAcceptedShift])

    return (
        <StyledMain>
            <SideBar
                acceptedShift={acceptedShift}
                setAcceptedShift={setAcceptedShift}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <Calendar
                    style={{
                        backgroundColor: "var(--gradient-background)",
                        height: "100%",
                    }}
                    acceptedShift={acceptedShift}
                />
                <StatisticsBlock acceptedShift={acceptedShift} />
            </div>
        </StyledMain>
    )
}

export default Main
