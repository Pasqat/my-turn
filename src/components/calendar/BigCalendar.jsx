import React from "react";
import styled, { css } from "styled-components";
import { MONTHS } from "../hooks/useDate/Constants";

import useDate from "../hooks/useDate/useDate";

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: none;
  overflow-x: scroll;
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

const TableContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 80%;
  width: 100%;
  cursor: pointer;
  background-color: yellow;
  cursor: pointer;
  ${(props) => {
    switch (props.workshift) {
      case workshiftItem.morning:
        return css`
          background-color: var(--color-primary);
        `;
      case workshiftItem.afternoon:
        return css`
          background-color: var(--color-secondary);
        `;
      case workshiftItem.night:
        return css`
          background-color: var(--color-terziary);
        `;
      default:
        throw new Error(
          `workshift must be one of this: 'morning', 'afternoon', 'night'. Use \`${workshiftItem}\``
        );
    }
  }}
`;

const Names = styled.div`
  padding: 20px;
  font-size: 1.5rem;
`;

const TURNISTI = [
  {
    name: "Alessia",
    id: "alessia_01",
    schedule: {
      1: "morning",
      4: "afternoon",
      6: "night",
      9: "morning",
      10: "morning",
    },
  },
  {
    name: "Melissa",
    id: "melissa_01",
    schedule: {
      1: "afternoon",
      5: "morning",
      6: "morning",
      8: "afternoon",
      10: "night",
    },
  },
  {
    name: "Martina",
    id: "martina_08",
    schedule: {
      1: "morning",
      3: "night",
      4: "morning",
      7: "night",
      9: "afternoon",
      12: "night",
    },
  },
  {
    name: "Maria",
    id: "maria_04",
    schedule: {},
  },
  {
    name: "Giovanni",
    id: "giovanni_01",
    schedule: {},
  },
  {
    name: "Ciccio",
    id: "ciccio_23",
    schedule: {},
  },
];

const workshiftItem = {
  morning: "morning",
  afternoon: "afternoon",
  night: "night",
};

const acceptedShift = [
  workshiftItem.morning,
  workshiftItem.afternoon,
  workshiftItem.night,
  "",
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

  const [turns, setTurns] = React.useState(TURNISTI);

  const coloredDiv = (turns) => {
    switch (turns) {
      case workshiftItem.morning:
        return <TableContent workshift={workshiftItem.morning}></TableContent>;
      case workshiftItem.afternoon:
        return (
          <TableContent workshift={workshiftItem.afternoon}></TableContent>
        );
      case workshiftItem.night:
        return <TableContent workshift={workshiftItem.night}></TableContent>;
      default:
        throw new Error(`Only 'morning', 'afternoon' or 'night' are supported`);
    }
  };

  /**
   * @param worker the element containing the name, id and schedule info
   * @param monthLenght integer
   */
  const putValuesToTable = (worker, monthLenght, workerIndex) => {
    const { id, name, schedule } = worker;

    let children = [
      <TableCell key={id}>
        <Names>{name}</Names>
      </TableCell>,
    ];

    for (let i = 1; i < monthLenght; i++) {
      if (!schedule) {
        children.push(
          <TableCell
            key={i}
            onClick={() => cycleThrougShifts(workerIndex, i, schedule[i])}
          />
        );
      } else if (schedule[i]) {
        children.push(
          <TableCell
            key={i}
            onClick={() => cycleThrougShifts(workerIndex, i, schedule[i])}
          >
            {coloredDiv(schedule[i])}
          </TableCell>
        );
      } else {
        children.push(
          <TableCell
            key={i}
            onClick={() => cycleThrougShifts(workerIndex, i, schedule[i])}
          ></TableCell>
        );
      }
    }
    return children;
  };

  const cycleThrougShifts = (workerIndex, scheduleIndex, schedule) => {
    const acceptedShiftIndex = acceptedShift.findIndex(
      (shift) => shift === schedule
    );

    let index = acceptedShiftIndex;

    if (acceptedShiftIndex === 3) {
      index = -1;
    }

    if (!turns[workerIndex].schedule) {
      return;
    }

    let newSchedule = turns[workerIndex].schedule;
    newSchedule[scheduleIndex] = acceptedShift[index + 1];

    setTurns([...turns]);
  };

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
            {turns.map((worker, index) => {
              return (
                <TableRow key={worker.id}>
                  {putValuesToTable(worker, days[month] + 1, index)}
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
