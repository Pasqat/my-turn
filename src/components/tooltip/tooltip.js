import React from "react"
import styled, { css } from "styled-components"

export const Tooltip = styled.div`
    position: relative;
`

export const TooltipText = styled.span`
    visibility: hidden;
    width: 2rem;
    background-color: var(--color-header-background);
    color: #fff;
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    left: 0;
    bottom: -2rem;
    z-index: 1;

    ${Tooltip}:hover & {
        visibility: visible;
    }
`
