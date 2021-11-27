import styled, { css } from "styled-components"

export const Legend = styled.div`
    padding: 20px;
    @media (max-width: 800px) {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
        padding-bottom: 0;
    }
`

export const LegendItem = styled.div`
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
`

export const ItemDot = styled.div`
    width: 18px;
    height: 18px;
    margin-right: 10px;
    // border-radius: 50%;
    background-color: ${(props) => `var(${props.color})`};
`

export const ItemDotSelection = styled(ItemDot)`
    // box-shadow: ${(props) =>
        props.isSelected && "2px 2px 0 rgba(0 0 0 / 0.7)"};
    transform: ${(props) =>
        props.isSelected && "scale(1.5) translateY(-2px) rotate(90deg)"};
`

export const AddItem = styled.div`
    width: 100%;
    background: var(--color-selected);
    padding: 0px 10px;
    font-weight: bold;
    font-size: 1.8rem;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
`
