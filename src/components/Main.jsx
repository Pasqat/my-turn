import React from "react"
import styled from "styled-components"

import SideBar from "./Sidebar"
import Calendar from "./calendar/calendar"
import TotalHoursBlock from "./statistisBlock/TotalHoursBlock"

import teamService from "../services/teams"
import { ComponentContext } from "../context/turnsContext"

const StyledMain = styled.div`
    width: 100vw;
    display: flex;
    @media (max-width: 800px) {
        flex-direction: column;
    }
`

const Main = () => {
    const [acceptedShift, setAcceptedShift] = React.useState()
    const { state, dispatch } = React.useContext(ComponentContext)

    React.useEffect(() => {
        teamService.getAcceptedShift().then((data) => {
            dispatch({ type: "GET_SHIFT", payload: data.acceptedShift })
        })
    }, [dispatch])

    console.log(state)

    return (
        <StyledMain>
            <SideBar />
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
                />
                <TotalHoursBlock/>
            </div>
        </StyledMain>
    )
}

export default Main
