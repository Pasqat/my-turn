import React from 'react'
import styled, { css } from 'styled-components'
import { DAYS_OF_THE_WEEK, MONTHS } from '../hooks/useDate/Constants'

import useDate from '../hooks/useDate/useDate'

const Frame = styled.div`
  width: 18rem;
  position: sticky;
  top: 0;
  background: var(--color-background);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
  border-bottom: var(--color-border);
  color: var(--color-primary);
`

const Button = styled.div`
  cursor: pointer;
`

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const Day = styled.div`
  width: 14.2%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  ${(props) =>
    props.isToday &&
    css`
      color: var(--color-primary);
    `}

  ${(props) =>
    props.isSelected &&
    css`
      background-color: var(--color-selected);
    `}
`

const Calendar = () => {
  const today = new Date()

  const {
    isToday,
    nextMonth,
    previousMonth,
    newDate,
    days,
    date,
    day,
    month,
    year,
    startDay,
  } = useDate()

  return (
    <Frame>
      <Header>
        <Button onClick={() => previousMonth()}>&lt;</Button>
        <div>{MONTHS[month].toUpperCase()}</div>
        <Button onClick={() => nextMonth()}>&gt;</Button>
      </Header>
      <Body>
        {DAYS_OF_THE_WEEK.map((d) => (
          <Day key={d}>{d}</Day>
        ))}
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2)
            return (
              <Day
                key={index}
                isToday={isToday(d)}
                isSelected={d === day}
                onClick={() => newDate(year, month, d)}
              >
                {d > 0 ? d : ''}
              </Day>
            )
          })}
      </Body>
    </Frame>
  )
}

export default Calendar
