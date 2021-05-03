import React from "react"
import styled, { css } from "styled-components"
import { Tooltip, TooltipText } from "../tooltip/tooltip"
import teamService from "../../services/teams"

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
    background: var(--color-header-background);
    padding: 0px 10px;
    font-weight: bold;
    font-size: 1.8rem;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
`

const AddItemContainer = styled.div`
    background-color: var(--color-header-background);
    padding: 1rem;
    border-radius: 5px;
    position: absolute;
    display: flex;
    z-index: 200;
    box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.3);
    -o-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.3);
    -ms-box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.3);
`

const AddItemForm = styled.form`
    display: flex;
    flex-direction: column;
`

const AddItemInput = styled.input`
    width: 100%;
    padding: 0 1rem;
    display: block;
    background: 0 0;
    color: var(--color-text);
    line-height: 1.2;
    outline: none;
    border: none;
    border-bottom: var(--color-border);
    font-size: 1rem;
    margin-bottom: 1rem;
`

const AddItemSelect = styled.select`
    width: 100%;
    padding: 0 1rem;
    display: block;
    background: 0 0;
    color: var(--color-text);
    line-height: 1.2;
    outline: none;
    border: none;
    border-bottom: var(--color-border);
    font-size: 1rem;
    margin-bottom: 1rem;
`

const Button = styled.button`
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

const ButtonAdd = styled(Button)`
    color: var(--color-green1);
    :hover {
        color: var(--color-primary);
    }
`

const ButtonClose = styled(Button)`
    color: var(--color-text);
    :hover {
        color: var(--color-secondary);
    }
`

const AcceptedSchiftLegend = ({ acceptedShift }) => {
    const [state, setState] = React.useState()
    const [shiftName, setShiftName] = React.useState("")
    const [color, setColor] = React.useState("--color-blue1")
    const [hours, setHours] = React.useState("")
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        if (!acceptedShift) return
        setState(acceptedShift)
    }, [acceptedShift])

    const handleSubmitNewShift = async (event) => {
        event.preventDefault()

        const newAcceptedShift = {
            shiftName,
            color,
            hours,
        }

        await teamService.addAcceptedShift([...state, newAcceptedShift])
        setState(state.concat(newAcceptedShift))
    }

    if (!state) return <LegendItem>Loading...</LegendItem>

    const maxAcceptedShift = state.length === 8

    return (
        <Legend>
            {state.map((element) => (
                <LegendItem key={element.shiftName}>
                    <ItemDot color={element.color} />
                    <Tooltip>
                        {element.shiftName}
                        <TooltipText>{element.hours}hrs</TooltipText>
                    </Tooltip>
                </LegendItem>
            ))}
            {!maxAcceptedShift ? (
                <AddItem style={{}} onClick={() => setIsOpen(!isOpen)}>
                    +
                </AddItem>
            ) : null}
            {isOpen ? (
                <AddItemContainer>
                    <AddItemForm onSubmit={handleSubmitNewShift}>
                        <AddItemInput
                            type="text"
                            name="shiftName"
                            value={shiftName}
                            placeholder="shift name"
                            onChange={({ target }) =>
                                setShiftName(target.value)
                            }
                        />
                        <AddItemSelect
                            value={color}
                            onChange={({ target }) => setColor(target.value)}
                            required
                        >
                            <option value="--color-blue1">Blue</option>
                            <option value="--color-yellow1">Yellow</option>
                            <option value="--color-orange1">Orange</option>
                            <option value="--color-green1">Green</option>
                            <AddItemInput
                                type="text"
                                name="color"
                                value={color}
                                placeholder="color"
                                onChange={({ target }) =>
                                    setColor(target.value)
                                }
                            />
                        </AddItemSelect>
                        <AddItemInput
                            type="number"
                            name="hours"
                            min="0"
                            max="24"
                            value={hours}
                            placeholder="hours"
                            onChange={({ target }) => setHours(target.value)}
                        />
                        <div style={{ display: "flex" }}>
                            <ButtonClose onClick={() => setIsOpen(!isOpen)}>
                                close
                            </ButtonClose>
                            <ButtonAdd type="submit">add</ButtonAdd>
                        </div>
                    </AddItemForm>
                </AddItemContainer>
            ) : null}
        </Legend>
    )
}

export default AcceptedSchiftLegend
