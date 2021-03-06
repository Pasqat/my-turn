import styled, { css } from "styled-components"

export const Frame = styled.div`
    display: flex;
    flex-direction: column;
    /* margin-left: 18rem; */
    height: 100%;
    width: 100%;
    padding-right: 30px;
    @media (max-width: 800px) {
        padding: 0 10px;
    }
`

export const Container = styled.div`
    @media (max-width: 800px) {
        overflow-x: scroll;
    }
`
export const Header = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 15px;
    color: var(--color-primary);
    letter-spacing: 2px;
    /* background: var(--background-main); */
    /* overflow-y: auto; */
`

export const Button = styled.div`
    cursor: pointer;
    margin: 0 15px;
`

export const ButtonPrimary = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    margin-left: 20px;
    padding: 10px 20px;
    color: var(--color-primary);
    font-weight: bold;
    font-size: 1.3rem;
    border: var(--color-border);
    cursor: pointer;
    :hover {
        background: var(--color-primary);
        color: var(--color-background);
        border: 2px solid var(--color-primary);
    }
    display: none;
    ${(props) =>
        props.isEditable &&
        css`
            display: inherit;
        `}
`

export const ButtonSecondary = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    margin-left: 20px;
    padding: 10px 20px;
    color: var(--color-green1);
    font-weight: bold;
    font-size: 1.3rem;
    border: var(--color-border);
    cursor: pointer;
    :hover {
        background: var(--color-green1);
        color: #ededed;
        border: 2px solid var(--color-green1);
    }
`
export const Day = styled.div`
    /* width: 14.2%; */
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    /* border-left: var(--color-border) */

    ${(props) =>
        props.isToday &&
        css`
            background-color: var(--color-selected);
        `}

    ${(props) =>
        props.isSelected &&
        css`
            background-color: var(--color-selected);
        `}
`

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    /* background: var(--background-main); */
    @media (max-width: 800px) {
        margin-bottom: 20px;
    }
`

export const TableHead = styled.thead``

export const TableRow = styled.tr`
    border: var(--color-border);
    overflow: inherit;
`

export const TableCell = styled.td`
    border: var(--color-border);
    font-weight: normal;
    position: relative;
    ${(props) =>
        props.isToday &&
        css`
            background-color: var(--color-selected);
        `};
`

export const TableCellHeader = styled.th`
    width: 2.8%;
    border: var(--color-border);
    ${(props) =>
        props.isToday &&
        css`
            background-color: var(--color-selected);
        `};
    position: sticky;
    position: -webkit-sticky; /* safari */
    top: -2px;
    background-color: var(--color-background);
    z-index: 5;
`

export const TableContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    background-color: yellow;
    cursor: pointer;
    ${(props) => {
        return css`
            background-color: var(${props.color});
        `
    }}}
`

export const Names = styled.div`
    padding: 10px 20px;
    font-size: 1.5rem;
    @media (max-width: 768px) {
        font-size: 1rem;
    }
`

export const DeleteButton = styled.div`
    font-size: 1rem;
    display: none;
    color: red;
    ${Names}:hover & {
        display: block;
        cursor: pointer;
    }
`
