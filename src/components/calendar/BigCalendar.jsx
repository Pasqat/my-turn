import React from "react";
import {
  Frame,
  Calendar,
  Header,
  Button,
  ButtonPrimary,
  ButtonSecondary,
  Day,
  Table,
  TableCell,
  TableCellHeader,
  TableHead,
  TableRow,
  Names,
  DeleteButton,
} from "./bigCalendar-style";

import { MONTHS } from "../hooks/useDate/Constants";

import useDate from "../hooks/useDate/useDate";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { useMediaQuery } from "../hooks/useMediaQuery";

import scheduleService from "../../services/scheduledTime";
import { coloredDiv, workshiftItem } from "../utils/calendar";

const acceptedShift = [
  workshiftItem.morning,
  workshiftItem.afternoon,
  workshiftItem.night,
  workshiftItem.fullday,
  "",
];

const BigCalendar = () => {
  // const today = new Date();
  const [isEditable, setIsEditable] = React.useState(false);
  let isPageWide = useMediaQuery("(min-width: 800px)");
  const {
    isToday,
    nextMonth,
    previousMonth,
    // newDate,
    days,
    // date,
    day,
    month,
    year,
    // startDay
  } = useDate(); //custom hook

  const [turns, setTurns] = useLocalStorageState("turns", []);
  // const [turns, setTurns] = React.useState([]);

  React.useEffect(() => {
    scheduleService.getMonth(year, month).then((data) => {
      setTurns(data);
    });
  }, [year, month, setTurns]);

  const putValuesToTable = (worker, monthLenght) => {
    const { name, days, _id } = worker;

    let children = [
      <TableCell
        key={
          _id + "tr" || `is-unique-enough ${Math.floor(Math.random() * 100)}`
        }
      >
        <Names>
          {name}
          <DeleteButton onClick={() => removeRow(_id, name)}>
            delete
          </DeleteButton>
        </Names>
      </TableCell>,
    ];

    for (let i = 0; i < monthLenght - 1; i++) {
      if (!days) {
        children.push(
          <TableCell
            key={_id + i}
            onClick={() => cycleThrougShifts(_id, i, days[i])}
          />
        );
      } else if (days[i]) {
        children.push(
          <TableCell
            key={_id + i}
            onClick={() => cycleThrougShifts(_id, i, days[i])}
          >
            {coloredDiv(days[i])}
          </TableCell>
        );
      } else {
        children.push(
          <TableCell
            key={_id + i}
            onClick={() => cycleThrougShifts(_id, i, days[i])}
          ></TableCell>
        );
      }
    }
    return children;
  };

  const putValuesToTableMobile = (d) => {
    let children = [
      <TableCell key={"dayTCell" + d}>
        <Day isSelected={d + 1 === day}>{d + 1}</Day>
      </TableCell>,
    ];

    for (let worker of turns) {
      if (!worker.days) {
        children.push(
          <TableCell
            key={worker._id + d}
            onClick={() => cycleThrougShifts(worker._id, d, worker.days[d])}
          />
        );
      } else if (worker.days[d]) {
        children.push(
          <TableCell
            key={worker._id + d}
            onClick={() => cycleThrougShifts(worker._id, d, worker.days[d])}
          >
            {coloredDiv(worker.days[d])}
          </TableCell>
        );
      } else {
        children.push(
          <TableCell
            key={worker._id + d}
            onClick={() => cycleThrougShifts(worker._id, d, worker.days[d])}
          ></TableCell>
        );
      }
    }
    return children;
  };

  const cycleThrougShifts = (workerId, scheduleIndex, schedule) => {
    if (!isEditable) return;
    const acceptedShiftIndex = acceptedShift.findIndex(
      (shift) => shift === schedule
    );

    let index = acceptedShiftIndex;

    // -1 so when update newSchedule the index became 0
    if (acceptedShiftIndex === acceptedShift.length - 1) {
      index = -1;
    }

    let newSchedule = turns.find((worker) => worker._id === workerId).days;

    if (newSchedule === null) newSchedule = [];

    newSchedule[scheduleIndex] = acceptedShift[index + 1];

    scheduleService.update(year, workerId, newSchedule);

    setTurns([...turns]);
  };

  const addNewRow = async () => {
    let name = prompt("Insert name");

    if (name === null) return;
    if (name.length === 0) return alert("Name can't be empty");

    const newMember = {
      name,
    };
    const addedMember = await scheduleService.addNewMember(
      newMember,
      year,
      month
    );
    setTurns([...turns, addedMember]);
  };

  function removeRow(idToDelete, name) {
    let newWorkerTeam = turns.filter((worker) => worker._id !== idToDelete);
    const ok = window.confirm(`Remove ${name}?`);
    if (ok) {
      scheduleService.removeTeamMember(year, idToDelete);
      setTurns([...newWorkerTeam]);
    }
  }

  if (isPageWide) {
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
                        <Day isSelected={d === day}>{d > 0 ? d : ""}</Day>
                      </TableCellHeader>
                    );
                  })}
              </TableRow>
            </TableHead>
            <tbody>
              {turns.map((worker) => {
                return (
                  <TableRow key={worker._id}>
                    {putValuesToTable(worker, days[month] + 1)}
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
        </Calendar>
        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            justifyContent: "center",
            alignContent: "space-around",
            marginTop: "40px",
          }}
        >
          <ButtonPrimary onClick={() => addNewRow()} isEditable={isEditable}>
            Add new
          </ButtonPrimary>
          <ButtonSecondary onClick={() => setIsEditable(!isEditable)}>
            {isEditable ? "Done" : "Edit"}
          </ButtonSecondary>
        </div>
      </Frame>
    );
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
      <div
        style={{
          display: "flex",
          marginLeft: "auto",
          marginBottom: "20px",
          justifyContent: "center",
          alignContent: "space-around",
        }}
      >
        <ButtonPrimary onClick={() => addNewRow()} isEditable={isEditable}>
          Add new
        </ButtonPrimary>
        <ButtonSecondary onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? "Done" : "Edit"}
        </ButtonSecondary>
      </div>
      <Calendar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCellHeader></TableCellHeader>
              {turns.map((worker) => {
                return (
                  <TableCellHeader key={worker._id}>
                    <Names>
                      {worker.name}
                      <DeleteButton
                        onClick={() => removeRow(worker._id, worker.name)}
                      >
                        delete
                      </DeleteButton>
                    </Names>
                  </TableCellHeader>
                );
              })}
            </TableRow>
          </TableHead>
          <tbody>
            {Array(days[month])
              .fill(null)
              .map((_, d) => {
                return <TableRow key={d}>{putValuesToTableMobile(d)}</TableRow>;
              })}
          </tbody>
        </Table>
      </Calendar>
      <div
        style={{
          display: "flex",
          marginLeft: "auto",
          marginBottom: "20px",
          justifyContent: "center",
          alignContent: "space-around",
        }}
      >
        <ButtonPrimary onClick={() => addNewRow()} isEditable={isEditable}>
          Add new
        </ButtonPrimary>
        <ButtonSecondary onClick={() => setIsEditable(!isEditable)}>
          {isEditable ? "Done" : "Edit"}
        </ButtonSecondary>
      </div>
    </Frame>
  );
};

export default BigCalendar;
