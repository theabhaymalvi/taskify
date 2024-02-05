import { useContext, useRef, useState } from "react"
import {ReactComponent as ListIcon} from "../icons/list.svg"
import {ReactComponent as CalendarIcon} from "../icons/calendar.svg"
import {ReactComponent as BoardIcon} from "../icons/board.svg"
import {ReactComponent as AddIcon} from "../icons/add.svg"
import ListView from "../views/ListView";
import CalendarView from "../views/CalendarView";
import BoardView from "../views/BoardView";
import AddTask from "../components/AddTask";
import AuthContext from "../context/AuthContext"

const Home = () => {
    const {User, Jwt} = useContext(AuthContext);

    const [view, setView] = useState("list");
    const [show, setShow] = useState(false);
    const openForm = () => {
        setShow(true);
    }

    const closeForm = () => {
        setShow(false);
    }

    if(User && Jwt)
    {
        return (
            <div className="flex mt-[14px] h-[90vh]">
                <div className="bg-[#FBFBFA] w-1/6 flex justify-center -mt-3">
                <ul className="w-full">
                              
                    <li className="cursor-pointer p-[20px] flex flex-col mt-3 items-center justify-center">
                     <h5 className=" text-2xl font-semibold">Dashboard</h5>
                     {/* <span className="h-1 w-24 bg-black mt-0"></span> */}
                    </li> 
                    <li className={`cursor-pointer p-[20px] flex gap-[15px] mt-12 ${view == 'list' ? 'bg-[#E2E2E1]' : ''}`} 
                    onClick={() => setView("list")}>
                    <ListIcon className=" w-9 h-9 my-auto"/>
                    <h5 className=" text-lg font-normal my-auto">List</h5>
                    </li>
                    <li className={`cursor-pointer p-[20px] flex gap-[15px] ${view == 'calendar' ? 'bg-[#E2E2E1]' : ''}`} 
                    onClick={() => setView("calendar")}>
                    <CalendarIcon className=" w-9 h-9 my-auto" />
                    <h5 className=" text-lg font-normal my-auto">Calendar</h5>
                    </li>
                    <li className={`cursor-pointer p-[20px] flex gap-[15px] ${view == 'board' ? 'bg-[#E2E2E1]' : ''}`} 
                    onClick={() => setView("board")}>
                    <BoardIcon className=" w-9 h-9 my-auto" />
                    <h5 className=" text-lg font-normal my-auto">Board</h5>
                    </li>
    
                </ul>
                </div>
                <div className="pl-[30px] w-[80vw] flex flex-col">
                    <AddIcon className="pt-[15px] h-12 w-12 cursor-pointer ml-[74vw]" onClick={() => openForm()}/> 
                    <AddTask show={show} closeForm={closeForm}/>
                    {view=="list" && <ListView />}
                    {view=="calendar" && <CalendarView />}
                    {view=="board" && <BoardView />}
                </div>
            </div>
        )
    }
};

export default Home;