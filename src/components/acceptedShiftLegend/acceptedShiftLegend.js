import React from "react"
import styled, { css } from "styled-components"
import { Tooltip, TooltipText } from "../tooltip/tooltip"

const Legend = styled.div`
    padding: 20px;
    @media (max-width: 800px) {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding-bottom: 0;
    }
`

const LegendItem = styled.div`
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

const AcceptedSchiftLegend = ({ acceptedShift }) => {
    console.log("on legend", acceptedShift)

    if (!acceptedShift) return <LegendItem>Loading...</LegendItem>

    return (
        <Legend>
            {acceptedShift.map((element) => (
                <LegendItem key={element.shiftName}>
                    <ItemDot color={element.color} />
                    <Tooltip>
                        {element.shiftName}
                        <TooltipText>{element.hours}hrs</TooltipText>
                    </Tooltip>
                </LegendItem>
            ))}
        </Legend>
    )
}

export default AcceptedSchiftLegend
