import React from "react"
import AddNewRowModal from "../calendar/addNewRowModal.jsx"
import { ComponentContext } from "../../context/turnsContext"
import useDate from "../../hooks/useDate/useDate.js"
import { MONTHS } from "../../hooks/useDate/Constants.js"
import scheduleService from "../../services/scheduledTime"

import {
    Frame,
    Container,
    Header,
    Button,
    ButtonPrimary,
    ButtonSecondary,
    Day,
    Table,
    TableCellHeader,
    TableHead,
    TableRow,
} from "./calendar.style"

const DesktopTable = ({ isOpen, setIsOpen, putValuesToTable }) => {
    const { state, dispatch } = React.useContext(ComponentContext)
    const {
        previousMonth,
        nextMonth,
        month,
        days,
        year,
        isToday,
        day,
    } = useDate()

    React.useEffect(() => {
        scheduleService.getMonth(year, month).then((data) => {
            dispatch({ type: "SET_TURNS", payload: data })
        })
    }, [year, month, dispatch])

    return (
        <Frame>
            <Header>
                <Button onClick={() => previousMonth()}>&lt;</Button>
                <div>
                    {MONTHS[month].toUpperCase()} {year}
                </div>
                <Button onClick={() => nextMonth()}>&gt;</Button>
            </Header>
            <Container>
                <Table>
                    <TableHead>
                        <TableRow>
                            {Array(days[month] + 1)
                                .fill(null)
                                .map((_, d) => {
                                    return (
                                        <TableCellHeader
                                            key={d}
                                            isToday={isToday(d)}
                                        >
                                            <Day isSelected={d === day}>
                                                {d > 0 ? d : ""}
                                            </Day>
                                        </TableCellHeader>
                                    )
                                })}
                        </TableRow>
                    </TableHead>
                    <tbody>
                        {state.turns.map((worker) => {
                            return (
                                <TableRow key={worker._id}>
                                    {putValuesToTable(worker, days[month] + 1)}
                                </TableRow>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
            <div
                style={{
                    display: "flex",
                    marginLeft: "auto",
                    justifyContent: "center",
                    alignContent: "space-around",
                    marginTop: "40px",
                }}
            >
                <ButtonPrimary
                    onClick={() => setIsOpen(!isOpen)}
                    isEditable={state.isEditable}
                >
                    Add new
                </ButtonPrimary>
                <ButtonSecondary
                    onClick={() => dispatch({ type: "TOGGLE_EDITABLE" })}
                >
                    {state.isEditable ? "Done" : "Edit"}
                </ButtonSecondary>
            </div>
            {isOpen ? (
                <AddNewRowModal
                    year={year}
                    month={month}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            ) : null}
        </Frame>
    )
}

export default DesktopTable
