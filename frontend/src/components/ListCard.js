import { useContext, useState } from "react";
import {ReactComponent as CaretIcon} from "../icons/caret-down.svg"
import {ReactComponent as EditIcon} from "../icons/edit.svg"
import {ReactComponent as DeleteIcon} from "../icons/delete.svg"
import {ReactComponent as CalendarCheck} from "../icons/calendar-check.svg"
import {ReactComponent as ClockIcon} from "../icons/clock.svg"
import {ReactComponent as MessageIcon} from "../icons/message.svg"
import EditTask from "./EditTask";
import AuthContext from "../context/AuthContext";
import { useDrag } from "react-dnd";

const ListCard = ({data}) => {
    const [show, setShow] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const {deleteTask, updateTask} = useContext(AuthContext);
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: {taskId: data._id},
        collect: (monitor) => ({
            isDragging: !monitor.isDragging(),
        }),
    });

    const closeForm = () => setShow(false);

    return (
        <div ref={drag} className="bg-[#EFEFEE] my-3 px-5 py-2 rounded-md flex border-1 shadow">
            {show && <EditTask closeForm={closeForm} data={data} />}
            <input type="checkbox" className="mt-1 mb-6 mr-2 w-5 h-5 accent-black"
            checked={data.completed} onClick={(e) => updateTask(data._id, {"completed": e.target.checked})}/>
            <div className="w-full">
            <div className="flex justify-between h-8">
                <h5 className=" text-lg"> {data.title} </h5>
                <CaretIcon className=" w-5 h-5" onClick={() => setShowDetails(!showDetails)} />
            </div>
            {showDetails && (
                <div className="flex flex-col">
                    <div className="flex items-center my-0.5">
                    <CalendarCheck className="w-4 h-4"/> 
                    <p className="ml-4 text-base"> {data.dueDate} </p>
                    </div>
                    <div className="flex items-center my-0.5">
                    <ClockIcon className="w-4 h-4"/>
                    <p className="ml-4 text-base"> {data.dueTime} </p>
                    </div>
                    <div className="flex items-center my-0.5">
                    <MessageIcon className="w-4 h-4"/>
                    <p className="ml-4 text-base"> {data.description} </p>
                    </div>
                </div>
            )}
            <div className="flex justify-between">
                <EditIcon className="w-5 h-5" onClick={() => setShow(true)} />
                <DeleteIcon className="w-5 h-5" onClick={() => deleteTask(data._id)}/>
            </div>
            </div>
        </div>
    )
};

export default ListCard;