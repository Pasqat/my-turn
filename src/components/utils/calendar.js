import { TableContent } from '../calendar/bigCalendar-style'

export const workshiftItem = {
  morning: 'morning',
  afternoon: 'afternoon',
  night: 'night'
};

export const coloredDiv = (turn) => {

    switch (turn) {
      case workshiftItem.morning:
        return <TableContent workshift={workshiftItem.morning}></TableContent>;
      case workshiftItem.afternoon:
        return (
          <TableContent workshift={workshiftItem.afternoon}></TableContent>
        );
      case workshiftItem.night:
        return <TableContent workshift={workshiftItem.night}></TableContent>;
      default:
        return <TableContent workshift={workshiftItem.night}></TableContent>;
        // throw new Error(`Only 'morning', 'afternoon' or 'night' are supported`);
    }
  };
