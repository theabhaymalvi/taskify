import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Calendar from '../components/Calendar';
import CalendarCard from '../components/CalendarCard';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import React from 'react';


const CalendarView = () => {
      
      const ServerDay = (props) => {
        const { tasks = [], day, outsideCurrentMonth, ...other } = props;
      
        const isSelected =
          !props.outsideCurrentMonth && tasks.some(task => task.dueDate === day.format("DD-MM-YYYY"));
      
        return (
          <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? <span style={{fontSize: '5px'}}>⚫</span> : undefined}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            sx={{
                '& .MuiBadge-badge': {
                    right: '50%'
                }
            }}
          >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
          </Badge>
        );
      }

    const [date, setDate] = useState(dayjs(new Date()));
    const {User, getTask, updateTasks} = useContext(AuthContext);
    const [tasks, setTasks] = useState(null);

    const getData = async() => {
        let res = await getTask(User._id);
        setTasks(res.data);
    }

    useEffect(() => {
        getData();
    },[updateTasks]);

    if(User && tasks)
    {
        let preTasks = tasks.filter(task => task.dueDate === date.format("DD-MM-YYYY"));

        return (
            <div className="flex mt-5 overflow-y-auto h-full">
                <div className='flex ml-2 mr-14'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <Calendar value={date} onChange={(date) => setDate(date)} /> */}
                    <Calendar value={date} onChange={(date) => setDate(date)}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                    day: ServerDay,
                    }}
                    slotProps={{
                    day: {
                        tasks,
                    },
                    }} />
                    </LocalizationProvider>
                </div>
                <div className='w-full p-4 flex flex-col overflow-y-auto'>
                    {preTasks.map(task => <CalendarCard data={task} />)}
                    {preTasks.length === 0 && 
                    <div className="flex bg-[#EFEFEE] rounded-md m-3 w-[95%] h-32 items-center justify-center">
                        <h1 className='text-xl font-medium'> No Tasks </h1>
                    </div>}
                </div>
            </div>
        );
    }
}

export default CalendarView;