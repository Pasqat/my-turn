import React from "react"
import AddNewRowModal from "../calendar/addNewRowModal.jsx"

import {
    Frame,
    Container,
    Header,
    Button,
    ButtonPrimary,
    ButtonSecondary,
    Day,
    Table,
    TableCell,
    TableCellHeader,
    TableHead,
    TableRow,
    Names,
    DeleteButton,
} from "./calendar.style"

const DesktopTable = ({ turns, isEditable, isOpen, setIsOpen }) => {
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
                        {turns.map((worker) => {
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
                    isEditable={isEditable}
                >
                    Add new
                </ButtonPrimary>
                <ButtonSecondary onClick={() => setIsEditable(!isEditable)}>
                    {isEditable ? "Done" : "Edit"}
                </ButtonSecondary>
            </div>
            {isOpen ? (
                <AddNewRowModal
                    setTurns={setTurns}
                    turns={turns}
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
