import React from "react"
import { Tooltip, TooltipText } from "../tooltip/tooltip"
import { Legend, LegendItem, ItemDot, AddItem } from "./legend.style"

import { useMediaQuery } from "../../hooks/useMediaQuery"
import { ComponentContext } from "../../context/turnsContext"
import AddAcceptedShift from "./addItem"
import RemoveAcceptedShift from "./removeAcceptedShift"
import UpdateAcceptedShift from "./updateItem"

const AcceptedSchiftLegend = () => {
    const [isAdding, setIsAdding] = React.useState(false)
    const [isUpdating, setIsUpdating] = React.useState(false)
    const [oldAcceptedShidt, setOldAcceptedShift] = React.useState({})
    const { state, dispatch } = React.useContext(ComponentContext)
    let isPageWide = useMediaQuery("(min-width: 800px)")

    if (!state.acceptedShift) return <LegendItem>Loading...</LegendItem>

    const maxAcceptedShift = state.acceptedShift.length === 8

    return (
        <Legend>
            {state.acceptedShift.map((element) => {
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
                        {state.isEditable && (
                            <div
                                style={{
                                    display: "flex",
                                    marginLeft: "auto",
                                    padding: "0 5px",
                                }}
                            >
                                <div
                                    style={{
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setOldAcceptedShift({
                                            shiftName: element.shiftName,
                                            color: element.color,
                                            hours: element.hours,
                                        })
                                        setIsUpdating(!isUpdating)
                                    }}
                                >
                                    ✏️
                                </div>
                                {isUpdating && (
                                    <UpdateAcceptedShift
                                        isOpen={isUpdating}
                                        setIsOpen={setIsUpdating}
                                        oldShift={oldAcceptedShidt.shiftName}
                                        oldColor={oldAcceptedShidt.color}
                                        oldHours={oldAcceptedShidt.hours}
                                    />
                                )}
                                <RemoveAcceptedShift
                                    shiftName={element.shiftName}
                                />
                            </div>
                        )}
                    </LegendItem>
                )
            })}
            {!maxAcceptedShift && state.isEditable ? (
                <>
                    <AddItem onClick={() => setIsAdding(!isAdding)}>+</AddItem>
                </>
            ) : null}
            {isAdding ? (
                <AddAcceptedShift isOpen={isAdding} setIsOpen={setIsAdding} />
            ) : null}
        </Legend>
    )
}

export default AcceptedSchiftLegend
