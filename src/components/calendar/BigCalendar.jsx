import React from 'react';
import {Frame, Calendar, Header, Button, Day,
        Table, TableCell, TableCellHeader, TableContent,
        TableHead, TableRow, Names, DeleteButton,
        } from './bigCalendar-style'

import { MONTHS } from '../hooks/useDate/Constants';

import useDate from '../hooks/useDate/useDate';
import useLocalStorageState from '../hooks/useLocalStorageState';

import scheduleService from '../../services/scheduledTime'
import { coloredDiv, workshiftItem } from '../utils/calendar'


// TODO fetch acceptedShift from server using
// scheduleService.getAll(data => data[acceptedShift])
// do this on parent level to use data on sidebar too

const acceptedShift = [
  workshiftItem.morning,
  workshiftItem.afternoon,
  workshiftItem.night,
  ''
];

const BigCalendar = () => {
  // const today = new Date();

  const {
    isToday,
    nextMonth,
    previousMonth,
    newDate,
    days,
    // date,
    day,
    month,
    year,
    // startDay
  } = useDate(); //custom hook

  const [turns, setTurns] = useLocalStorageState('turns', []);


  React.useEffect(() => {
    scheduleService.getMonth(year, month)
      .then(data => {

        console.log('data', data, 'month', month, 'year', year)

        setTurns(data)
      })

  }, [year, month, setTurns]);


  const putValuesToTable = (worker, monthLenght, workerIndex) => {
    const { userId, name, days, _id } = worker;

    let children = [
      <TableCell key={userId || `is-unique-enough ${Math.floor(Math.random() * 100 )}`}>
        <Names>
          {name}
          <DeleteButton onClick={() => removeRow(_id)}>
            delete
          </DeleteButton>
        </Names>
      </TableCell>
    ];

    for (let i = 0; i < monthLenght - 1; i++) {
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
    console.log(acceptedShift, acceptedShift.length)
    if (acceptedShiftIndex === acceptedShift.length - 1) {
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
    let name = prompt('Insert name');

    if (name === null) return;
    if (name.length === 0) return alert("Name can't be empty");

    const newPerson = {
      // TODO hardcoded, the best way to screw up 🍾
      teamName: 'CovidUTI',
      teamId: "733326af-6d26-49f4-8204-3f944f20c34d",
      name
    }

    scheduleService.addNewMember(newPerson, year, month).then(
      data => setTurns([...turns, data]))

  };

  function removeRow(idToDelete) {
    let newWorkerTeam = tu_id.filter((worker) => worker._id !== idToDelete);

    scheduleService.removeTeamMember(year, idToDelete)

    setTurns([...newWorkerTeam]);
  }

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
