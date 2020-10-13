import React, { useState, useEffect } from "react";
import dateFns from "date-fns";
import styled, { css } from "styled-components";
import { DAYS, DAYS_LEAP, DAYS_OF_THE_WEEK, MONTHS } from "./Constants";

const Frame = styled.div`
  width: 18rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 15px;
  border-bottom: var(--color-border);
  color: var(--color-primary);
`;

const Button = styled.div`
  cursor: pointer;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const Day = styled.div`
  width: 14.2%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${(props) =>
    props.isToday &&
    css`
      color: var(--color-primary);
    `}

  ${(props) =>
    props.isSelected &&
    css`
      background-color: var(--background-main);
    `}
`;

function getStartDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState(() => today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

  return (
    <Frame>
      <Header>
        <Button onClick={() => setDate(new Date(year, month - 1, day))}>
          &lt;
        </Button>
        <div>{MONTHS[month].toUpperCase()}</div>
        <Button onClick={() => setDate(new Date(year, month + 1, day))}>
          &gt;
        </Button>
      </Header>
      <Body>
        {DAYS_OF_THE_WEEK.map((d) => (
          <Day key={d}>
            <strong>{d}</strong>
          </Day>
        ))}
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const d = index - (startDay - 2);
            return (
              <Day
                key={index}
                isToday={d === today.getDate()}
                isSelected={d === day}
                onClick={() => setDate(new Date(year, month, d))}
              >
                {d > 0 ? d : ""}
              </Day>
            );
          })}
      </Body>
    </Frame>
  );
};

export default Calendar;
