import React from "react"
import styled, { css } from "styled-components"

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
        if (props.color === "primary") {
            return css`
                background-color: var(--color-primary);
            `
        } else if (props.color === "secondary") {
            return css`
                background-color: var(--color-secondary);
            `
        } else if (props.color === "green") {
            return css`
                background-color: var(--color-green);
            `
        } else {
            return css`
                background-color: var(--color-terziary);
            `
        }
    }}
`

const AcceptedSchiftLegend = () => {
    return (
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
    )
}

export default AcceptedSchiftLegend
