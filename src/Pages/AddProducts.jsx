import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from '../Styles/AddProduct.module.scss'

export default function AddProducts() {
   const [category,setCategory] = useState([])
   const [loadmsg,setLoadMsg] = useState(false)
   const [product,setProduct] = useState({
    image:"",
    name:"",
    price:"",
    category:"",
   })

 const navigate = useNavigate()
  const changeHandler =(e)=>{
    let myProduct = {...product}
    myProduct[e.target.name] = e.target.value;
    setProduct(myProduct)
   

  }
 
  const submitHandeler = (e)=>{
    e.preventDefault()
    try {
    
     let {data} = axios.post(
          "https://ecommerce-be-q3ia.onrender.com/products",
          product
        );
        setLoadMsg(true)
        const timer = setTimeout(() => {
          navigate('/products')        
        }, 2000);
      
      
    } catch (error) {
      console.log(error);
    }

  }
  let getCategory =async()=>{
    const { data } = await axios.get(
      "https://ecommerce-be-q3ia.onrender.com/categories",
      category
    );
    setCategory(data)
  }
 useEffect(() => {
  getCategory()
  
 }, [])
 

  return (
    <div className={`${style.product}`}>
    <div className={`${style.head}`}>
    <i className="fa-solid fa-cart-plus"></i>
      <div className={`${style.title}`}>
        <h3>Add Product</h3>
        <h6>Product Register</h6>
      </div>
      
    </div>
    <div className={`${style.content}`}>
      <div className={`${style.page}`}>
        <div className={`${style.pagehead}`}>
          <h6>Product Details</h6>
           {loadmsg===true ?
          <div className={`${style.msgBox}`}>
        <h6>Product Created Successfuly</h6>
        <i className="fa-solid fa-check-double"></i>
         </div> 
         :""} 
        </div>
        <div className={`${style.brdr}`}></div>
        <div className={`${style.pageInfo}`}>
          <Link to="/users" className={`${style.butn} btn btn-danger`}>
          <i className="fa-solid fa-cart-shopping"></i> Products
          </Link>

          <form onSubmit={submitHandeler}>
            <div className={`${style.inputData} py-4`}>
              <input
                type="file"
                onChange={changeHandler}
                name="image"
                className="form-control "
              />
            </div>
            <div className={`${style.inputData} my-3`}>
              <input
                type="text"
                name="name"
                placeholder="Enter Product Name"
                className="form-control "
                onChange={changeHandler}
              />
            </div>
            <div className={`${style.inputData} my-3`}>
              <input
                type="number"
                name="price"
                placeholder="Enter Product Price"
                className="form-control "
                onChange={changeHandler}
              />
            </div>
            <div className={`${style.inputData} my-3`}>
              <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="userType">
                  Options
                </label>
                <select
                  className="form-select"
                  id="userType"
                  name="category"
                  onChange={changeHandler}
                >
                  <option value="DEFAULT">Choose...</option>
                  {category.map((item)=>
                  <option value={item.name} key={item.id}>{item.name}</option>
                  )}
                </select>
              </div>
            </div>
            <button
              type="reset"
              className={`${style.butn} myBtn btn btn-primary my-3 float-start`}
            >
              Reset
            </button>
            <button className="myBtn btn btn-danger my-3 float-end">
              Submit
            </button>
            <div className="clear-fix"></div>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}
