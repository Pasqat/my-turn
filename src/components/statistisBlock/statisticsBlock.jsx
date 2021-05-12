import React from "react"
import { ComponentContext } from "../../context/turnsContext"
import styled, { css } from "styled-components"

const Container = styled.div`
    padding: 40px 0;
`
const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
`
const Card = styled.div`
    padding: 1rem;
    background: var(--color-header-background);
    box-shadow: 5px 5px 0 0 rgba(0 0 0 / 0.5);
`

const Name = styled.div`
    font-size: 1.4rem;
    padding-bottom: 10px;
`

const ShiftName = styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 1.2rem;
    padding-top: 15px;
    border-bottom: 1px solid var(--color-text);
`

const ColoredBlock = styled.span`
    padding-right: 5px;
    ${(props) => {
        return css`
            color: var(${props.color});
        `
    }}}
`

const Total = styled(ShiftName)`
    border: none;
    color: var(--color-secondary);
    marign-left: auto;
    &:before {
        content: "";
    }
`

const StatisticsBlock = ({ acceptedShift }) => {
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
                    fontSize: "1.8rem",
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

export default StatisticsBlock
