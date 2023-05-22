import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import style from '../Styles/AddProduct.module.scss'


export default function EditProduct() {
    const [loadmsg,setLoadMsg] = useState(false)
    const { state } = useLocation();
    let navigate = useNavigate()
    const [category,setCategory] = useState([])
    const [product,setProduct] = useState({
        image:"",
        name:"",
        price:"",
        category:"",
       })
       let changeHandler =(e)=>{
        let myProduct = {...product}
        myProduct[e.target.name] = e.target.value;
        setProduct(myProduct)
        console.log(myProduct);
    }
    useEffect(() => {
    setProduct(state);
     getCategory();
     
    }, [])
    const submitHandeler = (e)=>{
        e.preventDefault()
        try {
         let {data} = axios.put(
              `https://ecommerce-be-q3ia.onrender.com/products/` +state.id,
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
    
  return (
    <div className={`${style.product}`}>
    <div className={`${style.head}`}>
    <i className="fa-solid fa-cart-shopping"></i>
      <div className={`${style.title}`}>
        <h3>Edit Product</h3>
        <h6>Product Edition</h6>
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
          <Link to="/products" className={`${style.butn} btn btn-danger`}>
          <i className="fa-solid fa-cart-shopping"></i> Products
          </Link>

          <form onSubmit={submitHandeler}>
          <div className={`${style.inputData} py-4`}>
                  <label htmlFor="proPic">
                    <img
                      src={`images/${
                        product.image.split("\\")[
                            product.image.split("\\").length - 1
                        ]
                      }`}
                      alt=""
                      style={{ width: "100px" }}
                    />
                  </label>
                  <input
                    hidden
                    type="file"
                    onChange={changeHandler}
                    name="image"
                    className="form-control "
                    id="proPic"
                  />
                </div>
            <div className={`${style.inputData} my-3`}>
              <input
              value={product.name}
                type="text"
                name="name"
                placeholder="Enter Product Name"
                className="form-control "
                onChange={changeHandler}
              />
            </div>
            <div className={`${style.inputData} my-3`}>
              <input
              value={product.price}
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
                value={product.category}
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
