import React from 'react'
import { TableContent } from '../calendar/bigCalendar-style'

export const workshiftItem = {
  morning: 'morning',
  afternoon: 'afternoon',
  fullday: 'fullday',
  night: 'night',
}

export const coloredDiv = (turn) => {
  switch (turn) {
    case workshiftItem.morning:
      return <TableContent workshift={workshiftItem.morning}></TableContent>
    case workshiftItem.afternoon:
      return <TableContent workshift={workshiftItem.afternoon}></TableContent>
    case workshiftItem.night:
      return <TableContent workshift={workshiftItem.night}></TableContent>
    case workshiftItem.fullday:
      return <TableContent workshift={workshiftItem.fullday}></TableContent>
    default:
      return <TableContent workshift={workshiftItem.night}></TableContent>
    // throw new Error(`Only 'morning', 'afternoon' or 'night' are supported`);
  }
}
