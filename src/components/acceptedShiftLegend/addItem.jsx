import React from "react"
import { ComponentContext } from "../../context/turnsContext"
import {
    ModalForm,
    ModalInput,
    ModalButtonAdd,
    ModalContainer,
    ModalBackground,
    ModalButtonClose,
    ModalSelectInput,
} from "../modal/modal.styles"
import teamService from "../../services/teams"

const AddAcceptedShift = ({ isOpen, setIsOpen }) => {
    const [shiftName, setShiftName] = React.useState("")
    const [color, setColor] = React.useState("--color-blue1")
    const [hours, setHours] = React.useState("")
    const { state, dispatch } = React.useContext(ComponentContext)
    const { acceptedShift } = state

    const handleSubmitNewShift = async (event) => {
        event.preventDefault()

        if (shiftName.length <= 0 || color.length <= 0 || hours === 0)
            return alert("You need to choose a name a color and a duration")

        if (
            acceptedShift.findIndex(
                (element) => element.shiftName === shiftName
            ) !== -1
        )
            return alert("name must be unique")

        const newAcceptedShift = {
            shiftName,
            color,
            hours,
        }

        const newObject = await teamService.updateAcceptedShift([
            ...acceptedShift,
            newAcceptedShift,
        ])
        dispatch({ type: "UPDATE_SHIFT", payload: newObject.acceptedShift })
        setIsOpen(!isOpen)
    }

    return (
        <ModalBackground>
            <ModalContainer>
                <ModalForm onSubmit={handleSubmitNewShift}>
                    <ModalInput
                        type="text"
                        name="shiftName"
                        value={shiftName}
                        placeholder="shift name"
                        onChange={({ target }) => setShiftName(target.value)}
                    />
                    <ModalSelectInput
                        value={color}
                        onChange={({ target }) => setColor(target.value)}
                        required
                        placeholder="select color"
                    >
                        <option value="--color-blue1">Blue</option>
                        <option value="--color-yellow1">Yellow</option>
                        <option value="--color-orange1">Orange</option>
                        <option value="--color-green1">Green</option>
                    </ModalSelectInput>
                    <ModalInput
                        type="number"
                        name="hours"
                        min="0"
                        max="24"
                        value={hours}
                        placeholder="duration in hours"
                        onChange={({ target }) => setHours(target.value)}
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

export default AddAcceptedShift
