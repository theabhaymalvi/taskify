import {ReactComponent as CalendarCheck} from "../icons/calendar-check.svg"
import {ReactComponent as ClockIcon} from "../icons/clock.svg"
import {ReactComponent as MessageIcon} from "../icons/message.svg"

const CalendarCard = ({data}) => {
    if(data.completed)
    {
        return (
            <div className="flex bg-[#EFEFEE] rounded-md m-3 w-[95%]">
                <div className="w-1.5 h-auto bg-[#1A212E] mr-4"></div>
                <div className="mx-2 my-1 w-[90%]">
                    <h1 className="text-lg font-medium"> {data.title} </h1>
                    <div className="flex items-center my-0.5 w-full">
                    <CalendarCheck className="w-4 h-4"/> 
                    <p className="ml-4 text-base"> {data.dueDate} </p>
                    </div>
                    <div className="flex items-center my-0.5 w-full">
                    <ClockIcon className="w-4 h-4"/>
                    <p className="ml-4 text-base"> {data.dueTime} </p>
                    </div>
                    <div className="flex items-center my-0.5 w-full">
                    <MessageIcon className="w-4 h-4"/>
                    <p className="ml-4 text-base w-[98%]"> {data.description} </p>
                    </div>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className="flex bg-[#EFEFEE] rounded-md m-3 w-[95%]">
                <div className="w-1.5 h-auto bg-[#7D7D7D] mr-4"></div>
                <div className="mx-2 my-1 w-[90%]">
                    <h1 className="text-lg font-medium"> {data.title} </h1>
                    <div className="flex items-center my-0.5 w-full">
                    <CalendarCheck className="w-4 h-4"/> 
                    <p className="ml-4 text-base"> {data.dueDate} </p>
                    </div>
                    <div className="flex items-center my-0.5 w-full">
                    <ClockIcon className="w-4 h-4"/>
                    <p className="ml-4 text-base"> {data.dueTime} </p>
                    </div>
                    <div className="flex items-center my-0.5 w-full">
                    <MessageIcon className="w-4 h-4"/>
                    <p className="ml-4 text-base w-[98%]"> {data.description} </p>
                    </div>
                </div>
            </div>
        )
    }
};

export default CalendarCard;