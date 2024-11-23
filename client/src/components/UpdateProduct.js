// import React, {useEffect, useState} from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const UpdateProduct = () => {
//     const params = useParams();
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [category, setCategory] = useState('');
//     const [company, setCompany] = useState('');
//     const [msg, setMsg] = useState(false);
//     const [msgVal, setMsgVal] = useState("");

//     const navigate = useNavigate();

//     useEffect(() => {
//         getProductData();
//     },[]);

//     const getProductData = async () => {
//         let result = await fetch(`http://localhost:5000/product/${params.id}`);
//         //let result = await fetch(`http://backend-service:5000/product/${params.id}`);

//         //const backendUrl = process.env.REACT_APP_BACKEND_URL;
//         //let result = await fetch(`${backendUrl}/product/${params.id}`);

//         const product = await result.json();
//         setName(product.name);
//         setPrice(product.price);
//         setCategory(product.category);
//         setCompany(product.company);
//         console.log("DATA: ", product);
//     }

//     const updateProductData = async () => {
//         let upResult = await fetch(`http://localhost:5000/product/${params.id}`,
//         //let upResult = await fetch(`http://backend-service:5000/product/${params.id}`,
//         //const backendUrl = process.env.REACT_APP_BACKEND_URL;
//         //let upResult = await fetch(`${backendUrl}/product/${params.id}`,   
//         {
//             method: "Put",
//             body: JSON.stringify({name, price, company, category}),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//         upResult = await upResult.json();
//         if(upResult){
//             setMsg(true);
//             setMsgVal("Record Saved Successfully!");
//             console.log("Element Clicked", upResult);
//             setTimeout(() => {
//                 navigate("/");
//             },2000);
//         }
//         else{
//             setMsgVal("Oops! the record has not een saved.");
//         }
        
        
//     }

//     return(
//         <div className="bodyContainer">
//             <div className="contentHeader">
//                 <h2>Update Product</h2>
//             </div>
            
//                 <div> 
//                     <input className="inputBox" type="text" placeholder="Enter Product Name" value={name} onChange={e => setName(e.target.value)}/>
//                     <input className="inputBox" type="text" placeholder="Enter Price" value={price} onChange={e => setPrice(e.target.value)} />
//                     <input className="inputBox" type="text" placeholder="Enter Company" value={company} onChange={e => setCompany(e.target.value)} />
//                     <input className="inputBox" type="text" placeholder="Enter Product Category" value={category} onChange={e => setCategory(e.target.value)} />
//                     <button type="button" className="btn" onClick={updateProductData}>Update Product</button>
//                 </div>
//                 {msg ? <p className="successMsg">{msgVal}</p> : <p className="errorMsg">{msgVal}</p>}
//         </div>
//     )
// }

// export default UpdateProduct;




import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const params = useParams();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [msg, setMsg] = useState(false);
    const [msgVal, setMsgVal] = useState("");

    const navigate = useNavigate();

    //URL du backend provenant d'une variable d'environnement
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    //Memoizing getProductData using useCallback
    const getProductData = useCallback(async () => {
        try {
            const response = await fetch(`${backendUrl}/product/${params.id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product data");
            }
            const product = await response.json();
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
            setCompany(product.company);
            console.log("Product data:", product);
        } catch (error) {
            console.error("Error fetching product data:", error);
            setMsgVal("Failed to load product data.");
        }
    }, [backendUrl, params.id]); //Dependencies: backendUrl and params.id

    useEffect(() => {
        getProductData();
    }, [getProductData]); //Ensure effect reruns if getProductData changes

    const updateProductData = async () => {
        try {
            const response = await fetch(`${backendUrl}/product/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({ name, price, company, category }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            if (response.ok) {
                setMsg(true);
                setMsgVal("Record saved successfully!");
                console.log("Update successful:", result);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                throw new Error(result.message || "Failed to save the record.");
            }
        } catch (error) {
            console.error("Error updating product data:", error);
            setMsg(false);
            setMsgVal("Failed to save the record.");
        }
    };

    return (
        <div className="bodyContainer">
            <div className="contentHeader">
                <h2>Update Product</h2>
            </div>
            <div>
                <input
                    className="inputBox"
                    type="text"
                    placeholder="Enter Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="inputBox"
                    type="text"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    className="inputBox"
                    type="text"
                    placeholder="Enter Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <input
                    className="inputBox"
                    type="text"
                    placeholder="Enter Product Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button type="button" className="btn" onClick={updateProductData}>
                    Update Product
                </button>
            </div>
            {msg ? (
                <p className="successMsg">{msgVal}</p>
            ) : (
                <p className="errorMsg">{msgVal}</p>
            )}
        </div>
    );
};

export default UpdateProduct;
