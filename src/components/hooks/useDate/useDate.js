import { isLeapYear, getStartDayOfMonth } from "./utility"
import { DAYS, DAYS_LEAP } from "./Constants"
import { useReducer } from "react"

function updateDate(date) {
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    startDay: getStartDayOfMonth(date),
  }
}

const actionTypes = {
  nextMonth: "next_month",
  previousMonth: "previous_month",
  update: "update",
  newDate: "new_date",
}

function dateReducer(state, { type, payload }) {
  switch (type) {
    case actionTypes.nextMonth: {
      const newDate = new Date(state.year, state.month + 1, state.day)
      return {
        date: newDate,
        ...updateDate(newDate),
      }
    }
    case actionTypes.previousMonth: {
      const newDate = new Date(state.year, state.month - 1, state.day)
      return {
        ...state,
        date: newDate,
        ...updateDate(newDate),
      }
    }
    case actionTypes.update: {
      return {
        ...state,
        day: state.date.getDate(),
        month: state.date.getMonth(),
        year: state.date.getFullYear(),
        setStartday: getStartDayOfMonth(state.date),
      }
    }
    case actionTypes.newDate: {
      const { year, month, day } = payload
      const newDate = new Date(year, month, day)
      return {
        ...state,
        date: newDate,
        ...updateDate(newDate),
      }
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

const today = new Date()

const initialState = {
  date: today,
  day: today.getDate(),
  month: today.getMonth(),
  year: today.getFullYear(),
  startDay: getStartDayOfMonth(today),
}

function useDate({ reducer = dateReducer } = {}) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { date, day, month, year, startDay } = state

  const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS

  function isToday(day) {
    return day === today.getDate()
  }

  const nextMonth = () => {
    dispatch({ type: actionTypes.nextMonth })
  }

  const previousMonth = () => {
    dispatch({ type: actionTypes.previousMonth })
  }

  const newDate = (year, month, day) => {
    dispatch({
      type: actionTypes.newDate,
      payload: { year, month, day },
    })
  }

  return {
    isToday,
    days,
    nextMonth,
    previousMonth,
    newDate,
    date,
    day,
    month,
    year,
    startDay,
  }
}

export default useDate
