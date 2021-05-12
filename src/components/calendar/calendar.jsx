import React from "react"
import { Day, TableCell, Names, DeleteButton } from "./calendar.style"

import useDate from "../../hooks/useDate/useDate"
// import useLocalStorageState from "../../hooks/useLocalStorageState"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { ComponentContext } from "../../context/turnsContext.jsx"

import scheduleService from "../../services/scheduledTime"
import { coloredDiv } from "../utils/calendar"
import DesktopTable from "./calendar-desktopTable.jsx"
import MobileTable from "./calendar-mobileTable.jsx"

const Calendar = ({ acceptedShift }) => {
    const { day, year } = useDate()

    const { state, dispatch } = React.useContext(ComponentContext)
    const [isOpen, setIsOpen] = React.useState(false)
    let isPageWide = useMediaQuery("(min-width: 800px)")

    if (!state.turns) return <div>Loading</div>

    const putValuesToTable = (worker, monthLenght) => {
        const { name, days, _id } = worker

        let children = [
            <TableCell
                key={
                    _id + "tr" ||
                    `is-unique-enough ${Math.floor(Math.random() * 100)}`
                }
            >
                <Names>
                    {name}
                    <DeleteButton onClick={() => removeRow(_id, name)}>
                        delete
                    </DeleteButton>
                </Names>
            </TableCell>,
        ]
        for (let i = 0; i < monthLenght - 1; i++) {
            if (!days) {
                children.push(
                    <TableCell
                        key={_id + i}
                        onClick={() => cycleThrougShifts(_id, i, days[i])}
                    />
                )
            } else if (days[i]) {
                children.push(
                    <TableCell
                        key={_id + i}
                        onClick={() => cycleThrougShifts(_id, i, days[i])}
                    >
                        {coloredDiv(days[i], acceptedShift)}
                    </TableCell>
                )
            } else {
                children.push(
                    <TableCell
                        key={_id + i}
                        onClick={() => cycleThrougShifts(_id, i, days[i])}
                    ></TableCell>
                )
            }
        }
        return children
    }

    const putValuesToTableMobile = (d) => {
        let children = [
            <TableCell key={"dayTCell" + d}>
                <Day isSelected={d + 1 === day}>{d + 1}</Day>
            </TableCell>,
        ]

        for (let worker of state.turns) {
            if (!worker.days) {
                children.push(
                    <TableCell
                        key={worker._id + d}
                        onClick={() =>
                            cycleThrougShifts(worker._id, d, worker.days[d])
                        }
                    />
                )
            } else if (worker.days[d]) {
                children.push(
                    <TableCell
                        key={worker._id + d}
                        onClick={() =>
                            cycleThrougShifts(worker._id, d, worker.days[d])
                        }
                    >
                        {coloredDiv(worker.days[d], acceptedShift)}
                    </TableCell>
                )
            } else {
                children.push(
                    <TableCell
                        key={worker._id + d}
                        onClick={() =>
                            cycleThrougShifts(worker._id, d, worker.days[d])
                        }
                    ></TableCell>
                )
            }
        }
        return children
    }

    // need to take the shiftNames array and add an empty string to have the
    // empty cell onto the calendar
    let shiftNames = []
    if (acceptedShift)
        shiftNames = acceptedShift.map((shift) => shift.shiftName)
    shiftNames = shiftNames.concat("")

    const cycleThrougShifts = (workerId, scheduleIndex, schedule) => {
        if (!state.isEditable) return
        const acceptedShiftIndex = shiftNames.findIndex(
            (shift) => shift === schedule
        )

        let index = acceptedShiftIndex

        // -1 so when update newSchedule the index became 0
        if (acceptedShiftIndex === shiftNames.length - 1) {
            index = -1
        }

        let newScheduledDays = state.turns.find(
            (worker) => worker._id === workerId
        ).days

        if (newScheduledDays === null) newScheduledDays = []

        newScheduledDays[scheduleIndex] = shiftNames[index + 1]
        scheduleService.update(year, workerId, newScheduledDays)

        dispatch({ type: "SET_TURNS", payload: [...state.turns] })
    }

    function removeRow(idToDelete, name) {
        let newWorkerTeam = state.turns.filter(
            (worker) => worker._id !== idToDelete
        )
        const ok = window.confirm(`Remove ${name}?`)
        if (ok) {
            scheduleService.removeTeamMember(year, idToDelete)
            dispatch({ type: "SET_TURNS", payload: [...newWorkerTeam] })
        }
    }

    if (isPageWide) {
        return (
            <DesktopTable
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                putValuesToTable={putValuesToTable}
            />
        )
    }

    return (
        <MobileTable
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            putValuesToTableMobile={putValuesToTableMobile}
            removeRow={removeRow}
        />
    )
}

export default Calendar
