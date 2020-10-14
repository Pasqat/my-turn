import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { DAYS, DAYS_LEAP, DAYS_OF_THE_WEEK, MONTHS } from "../Constants";
import { getStartDayOfMonth, isLeapYear } from "./utility";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  /* overflow: scroll; */
  margin-left: 18rem;
  height: 100%;
`;

const Calendar = styled.div`
  background: var(--background-main);
  flex: 1 1 auto;
  display: flex;
  flex-direction: column
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 15px;
  border-bottom: var(--color-border);
  color: var(--color-primary);
  letter-spacing: 2px;
`;

const Button = styled.div`
  cursor: pointer;
  margin: 0 15px;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  /* flex-wrap: wrap; */
`;

const NamesRow = styled.div`
  flex-grow: 0;
  height: 80px;
`;

const Names = styled.div`
  font-size: 1.5rem;
  padding: 10px 20px;
  border-bottom: var(--color-border);
`;

const Day = styled.div`
  /* width: 14.2%; */
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  /* border-left: var(--color-border) */

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
`;

const TURNISTI = [
  "Alessia",
  "Melissa",
  "Martina",
  "Maria",
  "Giovanni",
  "Ciccio",
];

// 🤖 start from the calendar view in Sidebare, than try to replicate here
const BigCalendar = () => {
  const today = new Date();
  const [date, setDate] = useState(() => today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));

  console.log(
    "date",
    startDay,
    "day",
    day,
    "month",
    month,
    "year",
    year,
    "startday",
    startDay
  );

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;
  console.log("days", days);

  return (
    <Frame>
      <Header>
        <Button onClick={() => setDate(new Date(year, month - 1, day))}>
          &lt;
        </Button>
        <div>
          {MONTHS[month].toUpperCase()} {year}
        </div>
        <Button onClick={() => setDate(new Date(year, month + 1, day))}>
          &gt;
        </Button>
      </Header>
      <Calendar>
        <Body>
          {Array(days[month])
            .fill(null)
            .map((_, index) => {
              const d = index + 1;
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
            })}{" "}
        </Body>
          <NamesRow>
            <br />
            {TURNISTI.map((t) => (
              <Names>{t}</Names>
            ))}
          </NamesRow>
      </Calendar>
    </Frame>
  );
};

export default BigCalendar;
