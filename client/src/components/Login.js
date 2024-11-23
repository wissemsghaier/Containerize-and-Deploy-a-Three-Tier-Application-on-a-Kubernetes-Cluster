// import React, {useEffect, useState} from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const auth = localStorage.getItem('user');
//         if(auth){
//             navigate('/');
//         }
//     });

//     const handleLogin = async () => {
//         let result = await fetch("http://localhost:5000/login", {
//         //let result = await fetch("http://backend-service:5000/login", {
//         //const backendUrl = process.env.REACT_APP_BACKEND_URL;
//         //let result = await fetch(`${backendUrl}/login`, { 
//             method: 'post',
//             body: JSON.stringify({email, password}),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         result = await result.json();
//         if(result.name){
//             console.log(JSON.stringify(result));
//             localStorage.setItem('user', JSON.stringify(result));
//             navigate("/");
//         }
//         else{
//             alert("Enter correct email & password!");
//         }
        
//     }
//     return(
//         <div className="bodyContainer">
//             <div className="contentHeader">
//                 <h2>Login</h2>
//             </div>
//             <input className="inputBox" type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input className="inputBox" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
//             <button type="button" className="btn" onClick={handleLogin}>Login</button>

//         </div>
//     )
// }

// export default Login;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const backendUrl = process.env.REACT_APP_BACKEND_URL; //URL backend provenant de la configuration Kubernetes

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");
        }
    }, [navigate]); //Ajout de `navigate` dans les dépendances pour éviter des comportements inattendus

    const handleLogin = async () => {
        try {
            const response = await fetch(`${backendUrl}/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (result.name) {
                console.log(JSON.stringify(result));
                localStorage.setItem("user", JSON.stringify(result));
                navigate("/");
            } else {
                alert("Enter correct email & password!");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred while logging in. Please try again.");
        }
    };

    return (
        <div className="bodyContainer">
            <div className="contentHeader">
                <h2>Login</h2>
            </div>
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
            <button type="button" className="btn" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default Login;
