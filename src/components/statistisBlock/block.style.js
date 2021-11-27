import styled, { css } from "styled-components"

export const Container = styled.div`
    padding: 40px 0;
    max-width: 100vw;
`
export const Title = styled.h3`
    font-size: 1.6rem;
    color: var(--color-primary);
    padding-bottom: 1rem;
    @media (max-width: 800px) {
        font-size: 1.4rem;
        padding-left: 0.5em;
    } ;
`

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    @media (min-width: 2100px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
        padding: 0 0.5em;
        gap: 10px;
    }
    @media (max-width: 360px) {
        grid-template-columns: 1fr;
    }
`
export const Card = styled.div`
    padding: 1rem;
    background: var(--color-header-background);
    box-shadow: 5px 5px 0 0 rgba(0 0 0 / 0.5);
`

export const Name = styled.div`
    font-size: 1.4rem;
    padding-bottom: 10px;
    color: var(--color-text);
`

export const ShiftName = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 1.2rem;
    padding-top: 15px;
    border-bottom: 1px solid var(--color-text-light);
    @media (max-width: 800px) {
        font-size: 1rem;
    }
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
    margin-left: auto;
    &:before {
        content: "";
    }
`
