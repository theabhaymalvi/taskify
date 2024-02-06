import {ReactComponent as CrossIcon} from "../icons/cross.svg"
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useDrag } from 'react-dnd';

const BoardCard = ({data}) => {
    const {deleteTask, updateTask} = useContext(AuthContext);
    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: {taskId: data._id},
        collect: (monitor) => ({
            isDragging: !monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} className={`flex bg-[#FFF] w-60 p-1 m-1.5 border-[1px] shadow hover:bg-[#F7F7F7] cursor-pointer
        ${isDragging ? "" : " opacity-50"}`}>
            <input type="checkbox" className="mt-1 mb-6 mr-2 w-5 h-5 accent-black"
            checked={data.completed} onClick={(e) => updateTask(data._id, {"completed": true})}/>
            <div className="w-[98%] my-2.5 ml-2">
            <div className="text-base font-medium"> {data.title} </div>
            <div className="flex">
            <div className="mr-1.5 text-sm"> {data.dueDate} </div>
            <div className="ml-1.5 text-sm"> {data.dueTime} </div>
            </div>
            </div>
            <CrossIcon className="w-4 h-4 cursor-pointer" onClick={() => deleteTask(data._id)} />
        </div>
    )
};

export default BoardCard;