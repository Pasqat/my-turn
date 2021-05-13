import React from "react"
import styled, { css } from "styled-components"
import { Tooltip, TooltipText } from "../tooltip/tooltip"

import { useMediaQuery } from "../../hooks/useMediaQuery"
import { ComponentContext } from "../../context/turnsContext"
import AddAcceptedShift from "./addItem"
import RemoveAcceptedShift from "./removeAcceptedShift"

const Legend = styled.div`
    padding: 20px;
    @media (max-width: 800px) {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
        padding-bottom: 0;
    }
`

const LegendItem = styled.div`
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
`

const ItemDot = styled.div`
    width: 18px;
    height: 18px;
    margin-right: 10px;
    border-radius: 50%;

    ${(props) => {
        return css`
            background-color: var(${props.color});
        `
    }}}
`

const AddItem = styled.div`
    width: 100%;
    background: var(--color-selected);
    padding: 0px 10px;
    font-weight: bold;
    font-size: 1.8rem;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
`
const AcceptedSchiftLegend = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const { state, dispatch } = React.useContext(ComponentContext)
    let isPageWide = useMediaQuery("(min-width: 800px)")

    if (!state.acceptedShift) return <LegendItem>Loading...</LegendItem>

    const maxAcceptedShift = state.acceptedShift.length === 8

    const removeItem = (shiftName) => {
        const newAcceptedShifts = state.acceptedShift.filter(
            (shift) => shift.shiftName !== shiftName
        )

        dispatch({ type: "UPDATE_SHIFT", payload: newAcceptedShifts })
        console.log(newAcceptedShifts)
    }

    return (
        <Legend>
            {state.acceptedShift.map((element) => {
                return (
                    <LegendItem key={element._id}>
                        <ItemDot color={element.color} />
                        <Tooltip>
                            {element.shiftName}
                            {isPageWide ? (
                                <TooltipText>{element.hours}h</TooltipText>
                            ) : (
                                <span style={{ fontWeight: "initial" }}>
                                    {" "}
                                    {element.hours}h
                                </span>
                            )}
                        </Tooltip>
                        {state.isEditable && (
                            <RemoveAcceptedShift
                                shiftName={element.shiftName}
                            />
                        )}
                    </LegendItem>
                )
            })}
            {!maxAcceptedShift && state.isEditable ? (
                <>
                    <AddItem onClick={() => setIsOpen(!isOpen)}>+</AddItem>
                </>
            ) : null}
            {isOpen ? (
                <AddAcceptedShift isOpen={isOpen} setIsOpen={setIsOpen} />
            ) : null}
        </Legend>
    )
}

export default AcceptedSchiftLegend
