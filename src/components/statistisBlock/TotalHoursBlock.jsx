import React from "react"
import { ComponentContext } from "../../context/turnsContext"
import {
    ShiftName,
    ColoredBlock,
    Container,
    Name,
    Total,
    Grid,
    Card,
} from "./block.style"

const TotalHoursBlock = ({ acceptedShift }) => {
    const { state, dispatch } = React.useContext(ComponentContext)

    let totalCount = (shift, i) => {
        if (!state.turns[i].days) return 0
        let count = state.turns[i].days.reduce((counter, shiftPerDay) => {
            return shiftPerDay === shift ? (counter += 1) : counter
        }, 0)
        let hours = acceptedShift.find((element) => element.shiftName === shift)
            .hours
        return count * hours
    }

    if (!acceptedShift) return <div>Loading...</div>

    const workLikeADonk = (index) => {
        let total = 0
        return [
            acceptedShift.map((shift) => {
                let hours = totalCount(shift.shiftName, index)
                total = total + hours
                return (
                    <ShiftName key={shift.shiftName}>
                        <div>
                            <ColoredBlock color={shift.color}>▊</ColoredBlock>
                            {shift.shiftName}
                        </div>
                        <div>{hours}</div>
                    </ShiftName>
                )
            }),
            <Total key={index}>Total: {total}</Total>,
        ]
    }

    return (
        <Container>
            <h3
                style={{
                    fontSize: "1.6rem",
                    color: "var(--color-primary)",
                    paddingBottom: "1rem",
                }}
            >
                Total hours
            </h3>
            <Grid>
                {state.turns.map((member, index) => {
                    return (
                        <Card key={member.name}>
                            <Name>{member.name}</Name>
                            {workLikeADonk(index)}
                        </Card>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default TotalHoursBlock
