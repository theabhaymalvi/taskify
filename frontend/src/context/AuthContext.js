import { useState, useContext, createContext, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = (props) => {
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);
    const [updateTasks, setUpdateTasks] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("authToken");
        if(localStorage && token && token!="undefined")
        {
            setAuthToken(JSON.parse(token));
            setUser(jwtDecode(token));
        }
    },[]);

    const signUp = async(e) => {
        e.preventDefault();
        try {
          const res = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
          },
          body: JSON.stringify({
            "name": e.target.name.value,
            "email": e.target.email.value,
            "password": e.target.password.value
          }),
        });

        let data = await res.json();

        if(res.ok)
        {
            localStorage.setItem('authToken', JSON.stringify(data.authToken));
            setAuthToken(data.authToken);
            setUser(jwtDecode(data.authToken));
            navigate("/home");
        }
        else
        {
          alert(data.error);
        }

        } catch (err) {
          console.log("Error: ", err.message);
        }
      };

    const loginUser = async(e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers if needed
                },
                body: JSON.stringify({
                    "email": e.target.email.value,
                    "password": e.target.password.value
                }),
            });

            let data = await res.json();

            if(res.ok)
            {
                localStorage.setItem('authToken', JSON.stringify(data.authToken));
                setAuthToken(data.authToken);
                setUser(jwtDecode(data.authToken));
                navigate("/home");
            }

        } catch (err) {
            console.log("Error:", err.message);
        }
      };

      const logout = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.clear();
        navigate("/");
      }

      // Task Crud Operations
      const getTask = async(userId) => {
        try {
            const res = await fetch(`http://localhost:8080/api/tasks/?userId=${userId}`, {
            method: 'GET'
          });

          let data = await res.json();
          console.log(data);

          if(res.ok)
          {
            return data;
          }
        } catch (err) {
          alert("Error Occured:", err.message);
        }
      }

      const addTask = async(formData) => {

        try {
            const res = await fetch('http://localhost:8080/api/tasks/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
  
          let data = await res.json();
          console.log(data);

          if(res.ok)
          {
            setUpdateTasks(!updateTasks);
            alert("Task Added Successfully");
          }
  
          } catch (err) {
            console.log("Error: ", err.message);
          }
      }

      const deleteTask = async(taskId) => {
          try {
            const res = await fetch(`http://localhost:3002/api/tasks/?taskId=${taskId}`, {
            method: 'DELETE'
          });

          let data = await res.json();
          console.log(data);

          if(res.ok)
          {
            setUpdateTasks(!updateTasks);
            alert("Task deleted successfully");
            return data;
          }
        } catch (err) {
          alert("Error Occured:", err.message);
        }
      }

      const updateTask = async(taskId, updatedData) => {
        try {
          const res = await fetch(`http://localhost:3002/api/tasks/?taskId=${taskId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if needed
          },
          body: JSON.stringify({
            ...updatedData,
          }),
        });

        let data = await res.json();
        console.log(data);

        if(res.ok)
        {
          setUpdateTasks(!updateTasks);
          // alert("Task updated successfully");
          return data;
        }
      } catch (err) {
        alert("Error Occured:", err.message);
      }
      }

      const contextData = {
        User: user,
        Jwt: authToken,
        updateTasks: updateTasks,
        signUp: signUp,
        loginUser: loginUser,
        logout: logout,
        getTask: getTask,
        addTask: addTask,
        deleteTask: deleteTask,
        updateTask: updateTask
      }

    return (
        <AuthContext.Provider value = {contextData} >
            {props.children}
        </AuthContext.Provider>
    )
}