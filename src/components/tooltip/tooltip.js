import React from "react"
import styled, { css } from "styled-components"

export const Tooltip = styled.div`
    position: relative;
`

export const TooltipText = styled.span`
    visibility: hidden;
    background-color: var(--color-header-background);
    color: var(--color-primary);
    font-weight: bold;
    box-shadow: 0 0 1rem 1px rgba(0, 0, 0, 0.2);
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
