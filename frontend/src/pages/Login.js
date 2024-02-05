import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const Login = () => {
    const {loginUser, signUp, logout} = useContext(AuthContext);
    const [show, setShow] = useState(false);
    useEffect(() => {
        logout();
    },[]);

    return (
        <div className=" flex flex-col items-center justify-center">
          <div className={` grid grid-cols-2 w-[800px] h-[400px] rounded-sm overflow-hidden mx-auto my-40 shadow-xl shadow-slate-500 
          ${show ? 'bg-gradient-to-b from-black-1 to-black-2 ...' : 'bg-gradient-to-t from-black-1 to-black-2 ...'}`}>
      <div class="box-1">
          <div className=" text-center text-white text-md mt-5 p-[50px]">
              <h2 className=" text-5xl mx-auto my-[25px]">Hello!</h2> 
             
              <button className={` text-xl p-[10px] bg-white w-[150px] mx-auto my-[20px] rounded-lg text-black border-none 
              ${show ? 'hidden' : ''}`} onClick={() => setShow(!show)}>Sign up</button>
              <button className={` text-xl p-[10px] bg-white w-[150px] mx-auto my-[20px] rounded-lg text-black border-none
              ${show ? '' : 'hidden'} `} onClick={() => setShow(!show)}>Login</button>
          </div>
      </div>

    
      <div className="bg-white m-[5px]">
          <form className={`text-center mt-8 ${show ? 'hidden': ''} `} onSubmit={loginUser}>
              <h1 className="text-black text-2xl font-semibold p-[15px]">Login Form</h1>
              <input type="email" name="email" placeholder="Email" className="text-lg p-[10px] rounded-md w-[250px] outline-none box-border border-solid border-slate-500 border-2 mb-3"/>
              <input type="password" name="password" placeholder="Password" className="text-lg p-[10px] rounded-md w-[250px] outline-none box-border border-solid border-slate-500 border-2 my-3"/>
              <button type="submit" className=" box-border text-white text-lg bg-[#2383E2] outline-none w-[250px] p-[13px] border-none rounded-md">Login</button>
          </form>

          <form className={` relative text-center mt-8 font-semibold ${show ? '' : 'hidden'}`} onSubmit={signUp}>
              <h1 className="text-black text-2xl p-[15px]">Sign Up Form</h1>
              <input type="text" name="name" placeholder="Name" className="text-lg p-[10px] rounded-md w-[250px] outline-none box-border border-solid border-slate-500 border-2 mb-2"/>
              <input type="email" name="email" placeholder="Email" className="text-lg p-[10px] rounded-md w-[250px] outline-none box-border border-solid border-slate-500 border-2 my-2"/>
              <input type="password" name="password" placeholder="Password" className="text-lg p-[10px] rounded-md w-[250px] outline-none box-border border-solid border-slate-500 border-2 my-2"/>
              <button type="submit" className="p-[13px] text-lg box-border w-[250px] border-none rounded-md outline-none bg-[#2383E2] text-white">Sign Up</button>
          </form>



      </div>
      </div>
        </div>
    )
};

export default Login;