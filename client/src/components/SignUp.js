// import React,{useState, useEffect} from "react";
// import { useNavigate } from "react-router-dom";


// const SignUp = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const navigate = useNavigate();

//     useEffect(() => {
//         const auth = localStorage.getItem("user");
//         if(auth){
//             navigate('/');
//         }
//     });




    



//     const getUserData = async ()=> {
//         console.log(name,email,password);
//         let result = await fetch('http://localhost:5000/register/',
//         //let result = await fetch('http://backend-service:5000/register/',
//         //const backendUrl = process.env.REACT_APP_BACKEND_URL;
//         //let result = await fetch(`${backendUrl}/register/`,
//     {
//         method: 'post',
//         body: JSON.stringify({name,email,password}),
//         headers: {
//             'Content-type': 'application/json'
//         },
//     });
//         result = await result.json();
//         console.log(result);
//         localStorage.setItem('user',JSON.stringify(result));
//         if(result){
//             navigate('/');
//         }
//     }

//     return(
//         <div className="bodyContainer">
//             <div className="contentHeader">
//                 <h2>Register</h2>
//             </div>
//             <input className="inputBox" type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
//             <input className="inputBox" type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
//             <input className="inputBox" type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
//             <button type="button" className="btn" onClick={getUserData}>Submit</button>

//         </div>
//     )
// };

// export default SignUp;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    }, [navigate]);  //Ensure navigate is the only dependency

    const getUserData = async () => {
        try {
            const response = await fetch(`${backendUrl}/register/`, {
                method: 'POST',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (result) {
                localStorage.setItem('user', JSON.stringify(result));
                navigate('/');
            } else {
                alert("Registration failed! Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="bodyContainer">
            <div className="contentHeader">
                <h2>Register</h2>
            </div>
            <input
                className="inputBox"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="inputBox"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                className="inputBox"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="btn" onClick={getUserData}>
                Submit
            </button>
        </div>
    );
};

export default SignUp;
