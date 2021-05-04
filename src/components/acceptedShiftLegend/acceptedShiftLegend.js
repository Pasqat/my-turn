import React from "react"
import styled, { css } from "styled-components"
import { Tooltip, TooltipText } from "../tooltip/tooltip"
import teamService from "../../services/teams"
import {
    ModalForm,
    ModalInput,
    ModalButtonAdd,
    ModalContainer,
    ModalBackground,
    ModalButtonClose,
    ModalSelectInput,
} from "../modal/Modal.styles"

import { useMediaQuery } from "../hooks/useMediaQuery"

const Legend = styled.div`
    padding: 20px;
    @media (max-width: 800px) {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
        padding-bottom: 0;
    }
`

const LegendItem = styled.div`
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
`

const ItemDot = styled.div`
    width: 18px;
    height: 18px;
    margin-right: 10px;
    border-radius: 50%;

    ${(props) => {
        return css`
            background-color: var(${props.color});
        `
    }}}
`

const AddItem = styled.div`
    width: 100%;
    background: var(--color-selected);
    padding: 0px 10px;
    font-weight: bold;
    font-size: 1.8rem;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
`
const AcceptedSchiftLegend = ({ acceptedShift, setAcceptedShift }) => {
    const [shiftName, setShiftName] = React.useState("")
    const [color, setColor] = React.useState("--color-blue1")
    const [hours, setHours] = React.useState("")
    const [isOpen, setIsOpen] = React.useState(false)

    let isPageWide = useMediaQuery("(min-width: 800px)")

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

        const newObject = await teamService.addAcceptedShift([
            ...acceptedShift,
            newAcceptedShift,
        ])
        console.log(newObject)
        setAcceptedShift(newObject.acceptedShift)
        setIsOpen(!isOpen)
    }

    if (!acceptedShift) return <LegendItem>Loading...</LegendItem>

    const maxAcceptedShift = acceptedShift.length === 8

    return (
        <Legend>
            {acceptedShift.map((element) => {
                console.log(element._id)
                return (
                    <LegendItem key={element._id}>
                        <ItemDot color={element.color} />
                        <Tooltip>
                            {element.shiftName}
                            {isPageWide ? (
                                <TooltipText>{element.hours}h</TooltipText>
                            ) : (
                                <span style={{ fontWeight: "initial" }}>
                                    {" "}
                                    {element.hours}h
                                </span>
                            )}
                        </Tooltip>
                    </LegendItem>
                )
            })}
            {!maxAcceptedShift ? (
                <AddItem style={{}} onClick={() => setIsOpen(!isOpen)}>
                    +
                </AddItem>
            ) : null}
            {isOpen ? (
                <ModalBackground>
                    <ModalContainer>
                        <ModalForm onSubmit={handleSubmitNewShift}>
                            <ModalInput
                                type="text"
                                name="shiftName"
                                value={shiftName}
                                placeholder="shift name"
                                onChange={({ target }) =>
                                    setShiftName(target.value)
                                }
                            />
                            <ModalSelectInput
                                value={color}
                                onChange={({ target }) =>
                                    setColor(target.value)
                                }
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
                                onChange={({ target }) =>
                                    setHours(target.value)
                                }
                            />
                            <div style={{ display: "flex" }}>
                                <ModalButtonClose
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    close
                                </ModalButtonClose>
                                <ModalButtonAdd type="submit">
                                    add
                                </ModalButtonAdd>
                            </div>
                        </ModalForm>
                    </ModalContainer>
                </ModalBackground>
            ) : null}
        </Legend>
    )
}

export default AcceptedSchiftLegend
