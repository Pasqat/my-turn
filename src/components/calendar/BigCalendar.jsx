import React from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { MONTHS } from '../hooks/useDate/Constants';

import useDate from '../hooks/useDate/useDate';
import useLocalStorageState from '../hooks/useLocalStorageState';

import { TURNISTI } from '../../datamock2';

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  // overflow-y: none;
  // overflow-x: scroll;
  /* margin-left: 18rem; */
  height: 100%;
  width: 100%;
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
  height: 2rem;
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
  width: 100%;
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
  position: relative;
  ${(props) =>
    props.isToday &&
    css`
      background-color: var(--color-selected);
    `};
`;

const TableCellHeader = styled.td`
  width: 2.8%;
  border: var(--color-border);
  ${(props) =>
    props.isToday &&
    css`
      background-color: var(--color-selected);
    `};
  position: sticky;
  top: -2;
  background-color: var(--color-background);
  zindex: 5;
`;

const TableContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
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
  padding: 10px 20px;
  font-size: 1.5rem;
`;

const DeleteButton = styled.div`
  font-size: 1rem;
  display: none;
  color: red;
  ${Names}:hover & {
    display: block;
    cursor: pointer;
  }
`;

const workshiftItem = {
  morning: 'morning',
  afternoon: 'afternoon',
  night: 'night'
};

const acceptedShift = [
  workshiftItem.morning,
  workshiftItem.afternoon,
  workshiftItem.night,
  ''
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
    startDay
  } = useDate(); //custom hook

  const [turns, setTurns] = useLocalStorageState('turns', []);

  /**
   * Update state if year or month change. So the schedule in
   * state has only the days and not year or month as original data
   */
  React.useEffect(() => {
    let newSchedule = [];

    if (
      !TURNISTI.schedule ||
      !TURNISTI.schedule[year] ||
      !TURNISTI.schedule[year][month + 1]
    ) {
      newSchedule = [];
    } else {
      for (let userId in TURNISTI.schedule[year][month + 1]) {
        newSchedule.push(TURNISTI.schedule[year][month + 1][userId]);
      }
    }

    console.log('newSchedule', newSchedule);
    setTurns(newSchedule);
  }, [year, month, setTurns]);

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

  function deletePerson(idToDelete) {
    // I think there are better ways to write this
    let newWorkerTeam = turns.filter((worker) => worker.userId !== idToDelete);
    setTurns([...newWorkerTeam]);
  }

  /**
   * @param worker the element containing the name, id and schedule info
   * @param monthLenght integer
   */
  const putValuesToTable = (worker, monthLenght, workerIndex) => {
    const { userId, user, days } = worker;

    let children = [
      <TableCell key={userId}>
        <Names>
          {user}
          <DeleteButton onClick={() => deletePerson(userId)}>
            delete
          </DeleteButton>
        </Names>
      </TableCell>
    ];

    for (let i = 1; i < monthLenght; i++) {
      if (!days) {
        children.push(
          <TableCell
            key={i}
            onClick={() => cycleThrougShifts(workerIndex, i, days[i])}
          />
        );
      } else if (days[i]) {
        children.push(
          <TableCell
            key={i}
            onClick={() => cycleThrougShifts(workerIndex, i, days[i])}
          >
            {coloredDiv(days[i])}
          </TableCell>
        );
      } else {
        children.push(
          <TableCell
            key={i}
            onClick={() => cycleThrougShifts(workerIndex, i, days[i])}
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

    // -1 so when update newSchedule the index became 0
    if (acceptedShiftIndex === 3) {
      index = -1;
    }

    if (!turns[workerIndex].days) {
      return;
    }

    let newSchedule = turns[workerIndex].days;
    newSchedule[scheduleIndex] = acceptedShift[index + 1];

    setTurns([...turns]);
  };

  const addNewRow = () => {
    let user = prompt('Insert name');
    console.log('name', user);
    if (user === null) return;
    if (user.length === 0) return alert("Name can't be empty");
    return setTurns([...turns, { user, userId: uuidv4(), days: {} }]);
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
                    <TableCellHeader key={d} isToday={isToday(d)}>
                      <Day
                        isSelected={d === day}
                        onClick={() => newDate(year, month, d)}
                      >
                        {d > 0 ? d : ''}
                      </Day>
                    </TableCellHeader>
                  );
                })}
            </TableRow>
          </TableHead>
          <tbody>
            {turns.map((worker, index) => {
              return (
                <TableRow key={worker.userId}>
                  {putValuesToTable(worker, days[month] + 1, index)}
                </TableRow>
              );
            })}
            <TableRow key="addNewRow">
              <TableCell>
                <Names
                  onClick={() => addNewRow()}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span
                    style={{ fontSize: '1rem' }}
                    role="img"
                    aria-label="add new worker"
                  >
                    ➕
                  </span>
                </Names>
              </TableCell>
            </TableRow>
          </tbody>
        </Table>
      </Calendar>
    </Frame>
  );
};

export default BigCalendar;
