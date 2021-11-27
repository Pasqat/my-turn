import React from "react"
import {
    ModalContainer,
    ModalBackground,
    ModalForm,
    ModalInput,
    ModalButtonAdd,
    ModalButtonClose,
} from "../modal/modal.styles"
import scheduleService from "../../services/scheduledTime"
import { ComponentContext } from "../../context/turnsContext"

const AddNewRowModal = ({ year, month, isOpen, setIsOpen }) => {
    const [name, setName] = React.useState("")
    const { state, dispatch } = React.useContext(ComponentContext)

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (name === "" || name === null) return
        if (name.length === 0) return alert("Name can't bi empty")

        const newMember = {
            name,
        }
        const addedMember = await scheduleService.addNewMember(
            newMember,
            year,
            month
        )
        dispatch({ type: "ADD_NEW_MEMBER", payload: addedMember })
        setIsOpen(!isOpen)
    }

    return (
        <ModalBackground>
            <ModalContainer>
                <ModalForm onSubmit={handleSubmit}>
                    <ModalInput
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Name"
                        onChange={({ target }) => setName(target.value)}
                    />
                    <div style={{ display: "flex" }}>
                        <ModalButtonClose onClick={() => setIsOpen(!isOpen)}>
                            close
                        </ModalButtonClose>
                        <ModalButtonAdd type="submit">add</ModalButtonAdd>
                    </div>
                </ModalForm>
            </ModalContainer>
        </ModalBackground>
    )
}

export default AddNewRowModal
