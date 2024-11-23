// import React, {useState, useEffect} from "react";
// import { Link } from "react-router-dom";

// const ProductList = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         getProducts();
//     },[]);

//     const getProducts = async () => {

//         let result =  await fetch('http://localhost:5000/products');
         
//         //let result =  await fetch('http://backend-service:5000/products');
//         //const backendUrl = process.env.REACT_APP_BACKEND_URL;
//         //let result = await fetch(`${backendUrl}/products`);
//         result = await result.json();
//         setProducts(result);
//         if(result){
//             console.log(result);
//         }
//         else{
//             console.log('No records found!');
//         }
//         //console.log("RESULT: "+JSON.stringify(products));
//     }

//     const deleteProduct = async(productId) => {
//         console.log("PID: "+productId);

//         let result = await fetch(`http://localhost:5000/products/${productId}`,
//         //let result = await fetch(`http://backend-service:5000/products/${productId}`,
//         //const backendUrl = process.env.REACT_APP_BACKEND_URL;
//         //let result = await fetch(`${backendUrl}/products/${productId}`,     
//             {
//             method: 'Delete'
//         });
//         result = await result.json();
//         if(result){
//             alert('record deleted!');
//             getProducts();
//         }
//         else{
//             alert('something went wrong!');
//         }
//     }

//     const searchHandle = async (e) => {
//         let key = e.target.value;
//         if(key){

//             let result = await fetch(`http://localhost:5000/search/${key}`);
//             //let result = await fetch(`http://backend-service:5000/search/${key}`);
//             //const backendUrl = process.env.REACT_APP_BACKEND_URL;
//             //let result = await fetch(`${backendUrl}/search/${key}`);
            
//             result = await result.json();
//             if(result){
//                 setProducts(result)
//             }
//         }
//         else{
//             getProducts();
//         }
        
//     }

//     return(
//         <div className="bodyContainer">
//             <div className="contentHeader">
//                 <h2>Product List</h2>
//             </div>
//             <input type="text" placeholder="Search" className="searchTB" onChange={searchHandle}/>
//             <ul>
//                 <li className="listHeading">Sl. No.</li>
//                 <li className="listHeading">Product Name</li>
//                 <li className="listHeading">Price</li>
//                 <li className="listHeading">Company</li>
//                 <li className="listHeading">Category</li>
//                 <li className="listHeading">Actions</li>
//             </ul>
//             {
//                 products.length>0 ? 
//                 products.map((item,index) => 
//                     <ul key={index}>
//                         <li>{index}</li>
//                         <li>{item.name}</li>
//                         <li>{item.price}</li>
//                         <li>{item.company}</li>
//                         <li>{item.category}</li>
//                         <li>
//                             <Link to={`/update/${item._id}`}>
//                                 <img 
//                                     className="icons"
//                                     src="https://cdn-icons-png.flaticon.com/512/7398/7398464.png"
//                                     alt="edit icon"
//                                 />
//                             </Link>
                            
//                             <img
//                                 className="icons"
//                                 src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
//                                 alt="delete icon"
//                                 onClick={() => deleteProduct(item._id)}
//                             />
//                         </li>
//                     </ul>
//                 )
//                 : <p className="noProduct">No Products Found!</p>   
//             }

//         </div>
//     );

// }

// export default ProductList;



import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    //Use a backend URL from environment variables
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    //Wrap getProducts in useCallback to make it stable
    const getProducts = useCallback(async () => {
        try {
            const response = await fetch(`${backendUrl}/products`);
            const result = await response.json();
            setProducts(result);
            if (result) {
                console.log(result);
            } else {
                console.log("No records found!");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [backendUrl]); //Add backendUrl as a dependency

    //Fetch products on component mount
    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`${backendUrl}/products/${productId}`, {
                method: "DELETE",
            });
            const result = await response.json();
            if (result) {
                alert("Record deleted!");
                getProducts();
            } else {
                alert("Something went wrong!");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const searchHandle = async (e) => {
        const key = e.target.value;
        if (key) {
            try {
                const response = await fetch(`${backendUrl}/search/${key}`);
                const result = await response.json();
                if (result) {
                    setProducts(result);
                }
            } catch (error) {
                console.error("Error searching products:", error);
            }
        } else {
            getProducts();
        }
    };

    return (
        <div className="bodyContainer">
            <div className="contentHeader">
                <h2>Product List</h2>
            </div>
            <input
                type="text"
                placeholder="Search"
                className="searchTB"
                onChange={searchHandle}
            />
            <ul>
                <li className="listHeading">Sl. No.</li>
                <li className="listHeading">Product Name</li>
                <li className="listHeading">Price</li>
                <li className="listHeading">Company</li>
                <li className="listHeading">Category</li>
                <li className="listHeading">Actions</li>
            </ul>
            {products.length > 0 ? (
                products.map((item, index) => (
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.company}</li>
                        <li>{item.category}</li>
                        <li>
                            <Link to={`/update/${item._id}`}>
                                <img
                                    className="icons"
                                    src="https://cdn-icons-png.flaticon.com/512/7398/7398464.png"
                                    alt="edit icon"
                                />
                            </Link>
                            <img
                                className="icons"
                                src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                                alt="delete icon"
                                onClick={() => deleteProduct(item._id)}
                            />
                        </li>
                    </ul>
                ))
            ) : (
                <p className="noProduct">No Products Found!</p>
            )}
        </div>
    );
};

export default ProductList;
