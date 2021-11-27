import styled from "styled-components"

export const Tooltip = styled.div`
    position: relative;
`

export const TooltipText = styled.span`
    visibility: hidden;
    background-color: var(--color-header-background);
    color: var(--color-primary);
    font-weight: bold;
    box-shadow: 2px 2px 1px rgb(0 0 0 / 30%);
    text-align: center;
    border-radius: 6px;
    padding: 5px 10px;
    position: absolute;
    top: -2rem;
    z-index: 9999;

    ${Tooltip}:hover & {
        visibility: visible;
    }
`
