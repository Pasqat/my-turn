import React from "react"
import { TableContent } from "../calendar/calendar.style"

export const coloredDiv = (turn, acceptedShift) => {
    if (!acceptedShift) return <TableContent />

    acceptedShift = acceptedShift.find((shift) => shift.shiftName === turn)

    if (acceptedShift)
        return <TableContent color={acceptedShift.color}></TableContent>
}
