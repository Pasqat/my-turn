import { isToday } from "date-fns";
import React from "react";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { DAYS, DAYS_LEAP, MONTHS } from "../Constants";
import { getStartDayOfMonth, isLeapYear } from "./utility";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  /* overflow: scroll; */
  margin-left: 18rem;
  height: 100%;
  width: 100%;
  background: var(--gradient-background)
`;

const Calendar = styled.div`
  /* flex: 1 1 auto; */
  /* display: flex; */
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 15px;
  color: var(--color-primary);
  letter-spacing: 2px;
  /* background: var(--background-main); */
  /* overflow-y: auto; */
`;

const Button = styled.div`
  cursor: pointer;
  margin: 0 15px;
`;

const Day = styled.div`
  /* width: 14.2%; */
  width: 6rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  /* border-left: var(--color-border) */

  ${(props) =>
    props.isToday &&
    css`
      background-color: var(--color-selected);
    `}

  ${(props) =>
    props.isSelected &&
    css`
      background-color: var(--color-selected);
    `}
`;

const Table = styled.table`
  border-collapse: collapse;
  /* background: var(--background-main); */
`;

const TableHead = styled.thead`
  /* 🤖 Are you sure this is needed? */
`;

const TableRow = styled.tr`
  border: var(--color-border);
`;

const TableCell = styled.td`
  border: var(--color-border);
  font-weight: normal;
  position: sticky;
  ${(props) =>
    props.isToday &&
    css`
      background-color: var(--color-selected);
    `};
`;

const TableContent = styled.div``;

const Names = styled.div`
  padding: 20px;
  font-size: 1.5rem;
`;

const TURNISTI = [
  "Alessia",
  "Melissa",
  "Martina",
  "Maria",
  "Giovanni",
  "Ciccio",
  "Alessia",
  "Melissa",
  "Martina",
  "Maria",
  "Giovanni",
  "Ciccio",
];

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
      <Calendar >
        <Table>
          <TableHead>
            <TableRow>
              {Array(days[month] + 1)
                .fill(null)
                .map((_, d) => {
                  const isToday = d === today.getDate();
                  return (
                    <TableCell key={d} isToday={isToday} style={{position: 'sticky', top: 0}}>
                      <Day
                        isSelected={d === day}
                        onClick={() => setDate(new Date(year, month, d))}
                      >
                        {d > 0 ? d : ""}
                      </Day>
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          <tbody>
            {TURNISTI.map((t,index) => {
              return (
                <TableRow key={index}>
                  {Array(days[month] + 1)
                    .fill(null)
                    .map((_, d) => {
                      const isToday = d === today.getDate();
                      if (d === 0) {
                        return (
                          <TableCell key={d}>
                            <Names>{t}</Names>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={d} isToday={isToday}>
                          <TableContent
                            isToday={d === today.getDate()}
                            isSelected={d === day}
                            onClick={() => setDate(new Date(year, month, d))}
                          ></TableContent>
                        </TableCell>
                      );
                    })}
                </TableRow>
              );
            })}
          </tbody>
        </Table>
      </Calendar>
    </Frame>
  );
};

export default BigCalendar;

// <Calendar>
//   <Body>
//     {Array(days[month] + 1)
//       .fill(null)
//       .map((_, index) => {
//         const d = index ;
//         return (
//           <Day
//             key={index}
//             isToday={d === today.getDate()}
//             isSelected={d === day}
//             onClick={() => setDate(new Date(year, month, d))}
//           >
//             {d > 0 ? d : ""}
//           </Day>
//         );
//       })}{" "}
//   </Body>
//   <NamesRow>
//     <br />
//     {TURNISTI.map((t) => (
//       <Names>{t}</Names>
//     ))}
//   </NamesRow>
// </Calendar>
