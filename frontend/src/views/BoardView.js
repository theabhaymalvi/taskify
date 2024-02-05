import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import BoardCard from "../components/BoardCard";
import { useDrop } from "react-dnd";
import {ReactComponent as Tick1} from "../icons/tick1.svg"
import {ReactComponent as Tick2} from "../icons/tick2.svg"
import {ReactComponent as Tick3} from "../icons/tick3.svg"
import {ReactComponent as Tick4} from "../icons/tick4.svg"

const BoardView = () => {
    const {User, getTask, updateTasks, updateTask} = useContext(AuthContext);
    const [tasks1, setTasks1] = useState([]);
    const [tasks2, setTasks2] = useState([]);
    const [tasks3, setTasks3] = useState([]);
    const [tasks4, setTasks4] = useState([]);
  

    const getData = async() => {
        let res = await getTask(User._id);
        setTasks1(res.data.filter(task => !task.completed && task.important && task.urgent));
        setTasks2(res.data.filter(task => !task.completed && task.important && !task.urgent));
        setTasks3(res.data.filter(task => !task.completed && !task.important && task.urgent));
        setTasks4(res.data.filter(task => !task.completed && !task.important && !task.urgent));
    }

    useEffect(() => {
        getData();
    },[updateTasks]);

    const [{isOver1}, drop1] = useDrop({
        accept: 'TASK',
        drop: (item) => {
          updateTask(item.taskId, {
            "important": true,
            "urgent": true,
          });
          console.log(`Dropped task ${item.taskId} into completed tasks`);
        },
        collect: (monitor) => ({
            isOver1: monitor.isOver(),
        }),
      });
    
      const [{isOver2}, drop2] = useDrop({
        accept: 'TASK',
        drop: (item) => {
          updateTask(item.taskId, {
            "important": true,
            "urgent": false,
          });
          console.log(`Dropped task ${item.taskId} into incomplete tasks`);
        },
        collect: (monitor) => ({
            isOver2: monitor.isOver(),
        }),
      });

      const [{isOver3}, drop3] = useDrop({
        accept: 'TASK',
        drop: (item) => {
          updateTask(item.taskId, {
            "important": false,
            "urgent": true,
          });
          console.log(`Dropped task ${item.taskId} into incomplete tasks`);
        },
        collect: (monitor) => ({
            isOver3: monitor.isOver(),
        }),
      });

      const [{isOver4}, drop4] = useDrop({
        accept: 'TASK',
        drop: (item) => {
          updateTask(item.taskId, {
            "important": false,
            "urgent": false,
          });
          console.log(`Dropped task ${item.taskId} into incomplete tasks`);
        },
        collect: (monitor) => ({
            isOver4: monitor.isOver(),
        }),
      });

    return (
        <div>
            <div className="flex h-6 w-[100%] justify-evenly">
            <h1 className="text-xl font-medium mb-6"> URGENT </h1>
            <h1 className="text-xl font-medium mb-6"> NOT URGENT </h1>
            </div>
            <div>
                <div className="flex m-4">
                    <h1 className="text-xl font-medium mt-4">IMPORTANT</h1>
                    <div ref={drop1} className={`flex flex-col border-[1.5px] mx-4 w-80 p-4 bg-[#F7FAF7] min-h-40 ${isOver1 ? "bg-[#DBE6F4]":""}`}>
                        <div className="flex items-center mb-2"><Tick1 className="w-5 h-5 mr-2"/><p className=" font-medium">DO FIRST</p></div>
                        {
                            tasks1.map(task => <BoardCard data={task} />)
                        }
                    </div>
                    <div ref={drop2} className={`flex flex-col border-[1.5px] mx-4 w-80 p-4 bg-[#f9f3ea] min-h-40 ${isOver2 ? "bg-[#DBE6F4]":""}`}>
                        <div className="flex items-center mb-2"><Tick2 className="w-5 h-5 mr-2"/><p className=" font-medium">SCHEDULE</p></div>
                        {
                            tasks2.map(task => <BoardCard data={task} />)
                        }
                    </div>
                </div>
                <div className="flex m-4">
                    <h1 className="text-xl font-medium mt-4">NOT <br/> IMPORTANT</h1>
                    <div ref={drop3} className={`flex flex-col border-[1.5px] mx-4 w-80 p-4 bg-[#F5FAFC] min-h-40 ${isOver3 ? "bg-[#DBE6F4]":""}`}>
                        <div className="flex items-center mb-2"><Tick3 className="w-5 h-5 mr-2"/><p className=" font-medium">DELEGATE</p></div>
                        {
                            tasks3.map(task => <BoardCard data={task} />)
                        }
                    </div>
                    <div ref={drop4} className={`flex flex-col border-[1.5px] mx-4 w-80 p-4 bg-[#FEF8F7] min-h-40 ${isOver4 ? "bg-[#DBE6F4]":""}`}>
                        <div className="flex items-center mb-2"><Tick4 className="w-5 h-5 mr-2"/><p className=" font-medium">ELIMINATE</p></div>
                        {
                            tasks4.map(task => <BoardCard data={task} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BoardView;