import React from "react"
import { ComponentContext } from "../../context/turnsContext"
import {
    ShiftName,
    Title,
    ColoredBlock,
    Container,
    Name,
    Total,
    Grid,
    Card,
} from "./block.style"

const TotalHoursBlock = () => {
    const { state, dispatch } = React.useContext(ComponentContext)

    let totalCount = (shift, i) => {
        if (!state.turns[i].days) return 0
        let count = state.turns[i].days.reduce((counter, shiftPerDay) => {
            return shiftPerDay === shift ? (counter += 1) : counter
        }, 0)
        let hours = state.acceptedShift.find((element) => element.shiftName === shift)
            .hours
        return { count, hours: count * hours }
    }

    if (!state.acceptedShift) return <div>Loading...</div>

    const workLikeADonk = (index) => {
        let total = 0
        return [
            state.acceptedShift.map((shift) => {
                let { count, hours } = totalCount(shift.shiftName, index)
                total = total + hours
                return (
                    <ShiftName key={shift.shiftName}>
                        <div>
                            <ColoredBlock color={shift.color}>▊</ColoredBlock>
                            <span style={{ paddingRight: "4px" }}>
                                {count}
                            </span>{" "}
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
            <Title>Total hours</Title>
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
