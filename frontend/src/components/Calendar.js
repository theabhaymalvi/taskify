import styled from "@emotion/styled";
import { DateCalendar } from "@mui/x-date-pickers";

const Calendar = styled(DateCalendar)({
    '&.MuiButtonBase-root-MuiPickersDay-root.Mui-selected':  {
        backgroundColor: '#121212'
    },
    '.MuiPickersCalendarHeader-root' : {
        backgroundColor: '#19212E',
        color: '#FFF',
        marginTop: '1px',
        padding: '14px 15px',
        maxHeight: '120px',
    },
    '&.MuiDateCalendar-root': {
        boxShadow: "0px 4px 4px 4px rgb(0, 0, 0, 0.4)",
        borderRadius: '15px',
        margin: '0',
    },
    '.MuiIconButton-root': {
        color: '#FFF'
    },
    '.MuiPickersDay-root': {
        borderRadius: '8px'
    },
    '.MuiPickersDay-root.Mui-selected': {
        backgroundColor: '#19212E',
        boxShadow: "0px 2px 2px 2px rgb(0, 0, 0, 0.4)",

    },
    '.MuiDayCalendar-weekDayLabel': {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '14px'
    },
    '.MuiPickersYear-yearButton.Mui-selected' : {
        backgroundColor: '#19212E'
    }
  });

  export default Calendar;