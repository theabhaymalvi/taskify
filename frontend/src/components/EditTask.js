import { useContext, useState } from "react";
import {ReactComponent as CloseIcon} from "../icons/close.svg"
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import AuthContext from "../context/AuthContext";

const EditTask = ({closeForm, data}) => {
    const {User, updateTask} = useContext(AuthContext);
    const [formData, setFormData] = useState(data);
    const [isImportant, setIsImportant] = useState(data.important);
    const [isUrgent, setIsUrgent] = useState(data.urgent);

    const [selectedDateTime, setSelectedDateTime] = useState(dayjs(new Date()));
    const handleDateTimeChange = (dateTime) => {
        setSelectedDateTime(dateTime);
        setFormData({
            ...formData,
            dueDate: selectedDateTime.format("DD-MM-YYYY"),
            dueTime: selectedDateTime.format("HH:mm")
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(User)
        formData.userId = User._id;
        formData.urgent = isUrgent;
        formData.important = isImportant;
        console.log(formData);
        updateTask(data._id, formData);
    };

    console.log(data);
    
    return(
        <div className={`absolute bg-[#BFBFBF] bg-opacity-50 top-0 bottom-0 right-0 left-0 justify-center items-center
         flex`} onClick={(e) => {
            // console.log(e.target.classList);
            if(e.target.classList[0] === "absolute") closeForm();
        }}>
            <div className="flex items-center relative w-[70%] h-[70%] bg-white rounded-xl justify-evenly shadow-2xl z-10">
                <CloseIcon className="flex cursor-pointer w-[30px] h-[30px] rounded-full absolute top-[-15px] right-[-15px]" onClick={() => closeForm()} />
                <div className="calendar">
                    {/* <Calendar
                        // onChange={setStartDate()}
                        // value={taskDetails.date}
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDateTimePicker orientation="landscape" className="datetime-picker" 
                    value={selectedDateTime}
                    onChange={handleDateTimeChange}
                    />
                    </LocalizationProvider>
                </div>
                <form className="p-[20px] flex flex-col" onSubmit={handleSubmit}>
                    <h5 className="text-lg font-medium"> Task Name </h5>
                    <input type="text" name="title" className="border-solid border-slate-500 border-2 rounded-md px-2" value={formData.title} onChange={handleChange}></input>
                    <div className="flex mt-2">
                    <h5 className="text-lg font-medium mr-3"> Is Important? </h5>
                    <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={isImportant} onChange={() => setIsImportant(!isImportant)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                    </div>
                    
                    <div className="flex mt-2">
                    <h5 className="text-lg font-medium mr-3"> Is Urgent? </h5>
                    <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={isUrgent} onChange={() => setIsUrgent(!isUrgent)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                    </label>
                    </div>
                    
                    <h5 className="text-lg font-medium"> Date </h5>
                    <div > {formData.dueDate} </div>
                    <h5 className="text-lg font-medium"> Time </h5>
                    <div > {formData.dueTime} </div>
                    <h5 className="text-lg font-medium"> Description </h5>
                    <textarea  cols={25} rows={10} name="description" value={formData.description}
                    className="border-solid border-slate-500 border-2 rounded-md px-2" onChange={handleChange}>
                    </textarea>
                    <button type="submit" className="text-white bg-black rounded-md w-34 h-8 mt-3"> Update Task </button>
                </form>
            </div>
        </div>
    )
};

export default EditTask;