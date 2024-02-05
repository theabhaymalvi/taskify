import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
    const {User, Jwt, logout} = useContext(AuthContext);
    if(User && Jwt)
    {
        return (
            <div className="flex items-center justify-between bg-white shadow-md shadow-[#dcdcdc]">
                <div className=" inline-block mx-[40px] my-[10px]">
                    <h1 className=" font-bold text-3xl"> Taskify </h1>
                </div>
                <div className="flex items-center">
                    <p className="text-lg font-medium"> Welcome, {User.name} </p>
                    <button className="text-white bg-[#121212] border-none rounded-md text-center px-[15px] py-[6px] mx-[14px] my-[16px] cursor-pointer hover:bg-[#333333]" onClick={logout}> Log Out </button>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className="flex items-center justify-between bg-white text-[#121212] shadow-md shadow-[#dcdcdc]">
                <div className=" inline-block mx-[40px] my-[10px]">
                    <h1 className=" font-bold text-3xl"> Taskify </h1>
                </div>
                <div>
                    <button className="text-white bg-[#121212] border-none rounded-md text-center px-[15px] py-[6px] mx-[14px] my-[16px] cursor-pointer hover:bg-[#333333]"> Log In </button>
                    <button className="text-white bg-[#121212] border-none rounded-md text-center px-[15px] py-[6px] mx-[14px] my-[16px] cursor-pointer hover:bg-[#333333]"> Sign Up </button>
                </div>
            </div>
        )
    }
};

export default Navbar;