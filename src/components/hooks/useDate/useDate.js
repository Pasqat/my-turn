import { isLeapYear, getStartDayOfMonth } from "./utility";
import { DAYS, DAYS_LEAP } from "./Constants";
import { useReducer } from "react";

function dateReducer(state, { type, initialState }) {
  switch (type) {
    case "next_month": {
      return { date: new Date(state.year, state.month + 1, state.day) };
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
}

const today = new Date();

const initialState = {
  date: today,
  day: today.getDate(),
  month: today.getMonth(),
  year: today.getFullYear(),
  startDay: getStartDayOfMonth(today),
};

function useDate({ reducer = dateReducer } = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { date, day, month, year, startDay } = state;

  console.table(state);
  console.log("date", date, "day", day);

  const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

  function isToday(day) {
    return day === today.getDate();
  }

  const nextMonth = () => {
    console.log("avanti il prossimo");
    return dispatch({ type: "next_month" });
  };

  return {
    isToday,
    days,
    nextMonth,
  };
}

export default useDate;
