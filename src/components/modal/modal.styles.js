import styled from "styled-components"

export const ModalContainer = styled.div`
    background-color: var(--color-selected);
    padding: 1rem;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    z-index: 200;
    box-shadow: 8px 8px 2px rgb(0 0 0 / 30%);
`

export const ModalForm = styled.form`
    display: flex;
    flex-direction: column;
`

export const ModalInput = styled.input`
    width: 100%;
    padding: 0.5rem 1rem;
    display: block;
    background: 0 0;
    color: var(--color-primary);
    line-height: 1.2;
    outline: none;
    border: none;
    border-bottom: 1px solid var(--color-background);
    font-size: 1rem;
    margin-bottom: 1rem;

    &::placeholder {
        color: var(--color-primary);
    }
`

export const ModalSelectInput = styled.select`
    width: 100%;
    padding: 0.5rem 1rem;
    display: block;
    background: 0 0;
    color: var(--color-primary);
    line-height: 1.2;
    outline: none;
    border: none;
    border-bottom: 1px solid var(--color-background);
    font-size: 1rem;
    margin-bottom: 1rem;
`

export const ModalButton = styled.button`
    background: 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1.2rem;
    width: 40%;
    font-size: 1rem;
    text-transform: uppercase;
    cursor: pointer;
    margin: 0 15px;
    font-weight: bold;
    transition: all 200ms;
    border: none;
`

export const ModalButtonAdd = styled(ModalButton)`
    color: var(--color-green1);
    :hover {
        color: var(--color-primary);
    }
`

export const ModalButtonClose = styled(ModalButton)`
    color: var(--color-text);
    :hover {
        color: var(--color-secondary);
    }
`

export const ModalButtonDelete = styled(ModalButton)`
    color: var(--color-orange1);
    :hover {
        color: var(--color-primary);
    }
`

export const ModalBackground = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: var(--gradient-background);
    backdrop-filter: blur(5px);
    z-index: 199;
    transition: all 500ms;
`

export const ModalColorsGroup = styled.div`
    display: flex;
    width: 100%;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--color-background);
    font-size: 1rem;
    margin-bottom: 1rem;
`
