import React from "react"
import { ComponentContext } from "../../context/turnsContext"
import teamService from "../../services/teams"
import styled from "styled-components"
import {
    ModalBackground,
    ModalContainer,
    ModalButtonClose,
    ModalButtonDelete,
} from "../modal/modal.styles"

const RemoveIcon = styled.div`
    font-size: 0.8rem;
    padding-left: 10px;
    cursor: pointer;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const RemoveAcceptedShift = ({ shiftName }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const { state, dispatch } = React.useContext(ComponentContext)

    const removeItem = async (shiftName) => {
        const newAcceptedShifts = state.acceptedShift.filter(
            (shift) => shift.shiftName !== shiftName
        )

        const newObject = await teamService.updateAcceptedShift(
            newAcceptedShifts
        )
        setIsOpen(!isOpen)
        return dispatch({
            type: "UPDATE_SHIFT",
            payload: newObject.acceptedShift,
        })
    }
    return (
        <>
            <RemoveIcon onClick={() => setIsOpen(!isOpen)}>❌</RemoveIcon>
            {isOpen && (
                <ModalBackground>
                    <ModalContainer
                        style={{ flexDirection: "column", textAlign: "center" }}
                    >
                        ⚠️
                        <div
                            style={{
                                fontSize: "1.2rem",
                                lineHeight: "1.2",
                                padding: "1rem 0",
                                marginBottom: "1rem",
                                color: "var(--color-primary)",
                            }}
                        >
                            Are you sure to delete {shiftName}?
                        </div>
                        <div
                            style={{ display: "flex", justifyItems: "center" }}
                        >
                            <ModalButtonClose
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                close
                            </ModalButtonClose>
                            <ModalButtonDelete
                                onClick={() => removeItem(shiftName)}
                            >
                                delete
                            </ModalButtonDelete>
                        </div>
                    </ModalContainer>
                </ModalBackground>
            )}
        </>
    )
}

export default RemoveAcceptedShift
