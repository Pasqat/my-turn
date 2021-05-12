import styled, { css } from "styled-components"

export const Container = styled.div`
    padding: 40px 0;
`
export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
`
export const Card = styled.div`
    padding: 1rem;
    background: var(--color-header-background);
    box-shadow: 5px 5px 0 0 rgba(0 0 0 / 0.5);
`

export const Name = styled.div`
    font-size: 1.4rem;
    padding-bottom: 10px;
`

export const ShiftName = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 1.2rem;
    padding-top: 15px;
    border-bottom: 1px solid var(--color-text);
`

export const ColoredBlock = styled.span`
    padding-right: 5px;
    ${(props) => {
        return css`
            color: var(${props.color});
        `
    }}}
`

export const Total = styled(ShiftName)`
    border: none;
    color: var(--color-secondary);
    marign-left: auto;
    &:before {
        content: "";
    }
`
