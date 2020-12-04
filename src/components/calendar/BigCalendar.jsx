import React from "react";
import styled, { css } from "styled-components";
import { MONTHS } from "../hooks/useDate/Constants";

import useDate from "../hooks/useDate/useDate";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  /* margin-left: 18rem; */
  height: 100%;
  width: 100%;
  background: var(--gradient-background);
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
  overflow-y: auto;
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

// FIXME add style for cell content
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
];

const BigCalendar = () => {
  const today = new Date();

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
  } = useDate();

  return (
    <Frame>
      <Header>
        <Button onClick={() => previousMonth()}>&lt;</Button>
        <div>
          {MONTHS[month].toUpperCase()} {year}
        </div>
        <Button onClick={() => nextMonth()}>&gt;</Button>
      </Header>
      <Calendar>
        <Table>
          <TableHead>
            <TableRow>
              {Array(days[month] + 1)
                .fill(null)
                .map((_, d) => {
                  return (
                    <TableCell
                      key={d}
                      isToday={isToday(d)}
                      style={{
                        position: "sticky",
                        top: -2,
                        backgroundColor: "var(--color-background)",
                        zIndex: "5",
                      }}
                    >
                      <Day
                        isSelected={d === day}
                        onClick={() => newDate(year, month, d)}
                      >
                        {d > 0 ? d : ""}
                      </Day>
                    </TableCell>
                  );
                })}
            </TableRow>
          </TableHead>
          <tbody>
            {TURNISTI.map((t, index) => {
              return (
                <TableRow key={index}>
                  {Array(days[month] + 1)
                    .fill(null)
                    .map((_, d) => {
                      if (d === 0) {
                        return (
                          <TableCell key={d}>
                            <Names>{t}</Names>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={d} isToday={isToday(d)}>
                          <TableContent
                            isToday={isToday(d)}
                            isSelected={d === day}
                          >
                            Placeholder
                          </TableContent>
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
