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
    Names,
    DeleteButton,
} from "./calendar.style"

const MobileTable = ({
    isOpen,
    setIsOpen,
    putValuesToTableMobile,
    removeRow,
}) => {
    const { state, dispatch } = React.useContext(ComponentContext)
    const { previousMonth, nextMonth, month, days, year, day } = useDate()

    React.useEffect(() => {
        scheduleService.getMonth(year, month).then((data) => {
            dispatch({ type: "SET_TURNS", payload: data })
        })
    }, [year, month])

    function renderMobileTable() {
        if (state.turns.length !== 0) {
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCellHeader />
                            {state.turns.map((worker) => {
                                return (
                                    <TableCellHeader key={worker._id}>
                                        <Names>
                                            {worker.name}
                                            <DeleteButton
                                                onClick={() =>
                                                    removeRow(
                                                        worker._id,
                                                        worker.name
                                                    )
                                                }
                                            >
                                                delete
                                            </DeleteButton>
                                        </Names>
                                    </TableCellHeader>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <tbody>
                        {Array(days[month])
                            .fill(null)
                            .map((_, d) => {
                                return (
                                    <TableRow key={d}>
                                        {putValuesToTableMobile(d)}
                                    </TableRow>
                                )
                            })}
                    </tbody>
                </Table>
            )
        }

        return (
            <div style={{ marginBottom: "40px" }}>
                Start by clicking on{" "}
                <span style={{ fontWeight: "bold" }}>edit</span> and add a new
                person
            </div>
        )
    }
    return (
        <Frame>
            <Header>
                <Button onClick={() => previousMonth()}>&lt;</Button>
                <div>
                    {MONTHS[month].toUpperCase()} {year}
                </div>
                <Button onClick={() => nextMonth()}>&gt;</Button>
            </Header>
            <div
                style={{
                    display: "flex",
                    marginLeft: "auto",
                    marginBottom: "20px",
                    justifyContent: "center",
                    alignContent: "space-around",
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
            <Container>{renderMobileTable()}</Container>
            <div
                style={{
                    display: "flex",
                    marginLeft: "auto",
                    marginBottom: "20px",
                    justifyContent: "center",
                    alignContent: "space-around",
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

export default MobileTable
