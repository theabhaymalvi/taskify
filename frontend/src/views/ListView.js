import ListCard from "../components/ListCard";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";

const ListView = () => {
    const {User, getTask, updateTasks} = useContext(AuthContext);
    const [tasks, setTasks] = useState(null);

    const getData = async() => {
        let res = await getTask(User._id);
        console.log(res.data);
        setTasks(res.data);
    }

    useEffect(() => {
        getData();
    },[updateTasks]);

    if(User && tasks)
    {
        let completeTasks = tasks.filter(task => task.completed);
        let incompleteTasks = tasks.filter(task => !task.completed);
        console.log(tasks);
        return (
            <div className="px-[30px] flex-grow overflow-y-auto">
                <div className="">
                    <h3 className="text-2xl font-medium"> To Do </h3>
                    {incompleteTasks
                          .map((incompleteTask) => <ListCard data={incompleteTask} />)
                    }
                    {incompleteTasks.length === 0 && 
                    <div className="bg-[#EFEFEE] my-3 px-5 py-4 rounded-md flex justify-center text-base font-medium"> No Tasks </div>
                    }
                </div>
                <div className="">
                    <h3 className="text-2xl font-medium"> Completed </h3>
                    {completeTasks
                          .map((completeTask) => <ListCard data={completeTask} />)
                    }
                    {completeTasks.length === 0 && 
                    <div className="bg-[#EFEFEE] my-3 px-5 py-4 rounded-md flex justify-center text-base font-medium"> No Tasks </div>
                    }
                </div>
            </div>
        )
    }
};

export default ListView;