import React from "react"
import { ComponentContext } from "../../context/turnsContext"
import teamService from "../../services/teams"
import styled from "styled-components"

const RemoveIcon = styled.div`
    font-size: 0.8rem;
    padding-left: 10px;
    cursor: pointer;
`

const RemoveAcceptedShift = ({ shiftName }) => {
    const { state, dispatch } = React.useContext(ComponentContext)

    const removeItem = async (shiftName) => {
        const newAcceptedShifts = state.acceptedShift.filter(
            (shift) => shift.shiftName !== shiftName
        )

        const newObject = await teamService.updateAcceptedShift(
            newAcceptedShifts
        )
        dispatch({ type: "UPDATE_SHIFT", payload: newObject.acceptedShift })
        console.log(newAcceptedShifts)
        console.log("newObject", newObject.acceptedShift)
    }
    return <RemoveIcon onClick={() => removeItem(shiftName)}>❌</RemoveIcon>
}

export default RemoveAcceptedShift
