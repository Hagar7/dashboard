import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import style from "../Styles/AddCategories.module.scss";

export default function EditCategory() {
    const [loadmsg,setLoadMsg] = useState(false)
    let navigate = useNavigate()
    const [category,setCategory] = useState({
        image: "",
        name: "",
       })
       const { state } = useLocation();
       useEffect(() => {
        setCategory(state)
       }, [])
       
    const submitHandeler =async (e)=>{
        e.preventDefault();
        try {
          const { data } = await axios.put(
            "http://localhost:3002/categories/" +state.id,
            category
          );
          setLoadMsg(true)
          const timer = setTimeout(() => {
            navigate("/categories");         
          }, 2000);
        } catch (error) {
          console.log(error);
        } 
    }
     

    const changeHandler = (e)=>{
        let mycategory = { ...category };
        mycategory[e.target.name] = e.target.value;
        setCategory(mycategory);
    }
  return (
    <div className={`${style.category}`}>
    <div className={`${style.head}`}>
    <i className="fa-solid fa-shop"></i>
      <div className={`${style.title}`}>
        <h3>Add Category</h3>
        <h6>Category Register</h6>
      </div>
      
    </div>
    <div className={`${style.content}`}>
      <div className={`${style.page}`}>
        <div className={`${style.pagehead}`}>
          <h6>Category Details</h6>
          {loadmsg===true ?
          <div className={`${style.msgBox}`}>
        <h6>Category Updated Successfuly</h6>
        <i className="fa-solid fa-check-double"></i>
         </div>
         :""}
        </div>
        <div className={`${style.brdr}`}></div>
        <div className={`${style.pageInfo}`}>
          <Link to="/categories" className={`${style.butn} btn btn-danger`}>
          <i className="fa-solid fa-store"></i> Categories
          </Link>
          <form onSubmit={submitHandeler}>
            <div className={`${style.inputData} py-4`}>
                <label htmlFor="myImg">
                <img
                      src={`images/${
                        category.image.split("\\")[
                            category.image.split("\\").length - 1
                        ]
                      }`}
                      alt="img"
                      style={{ width: "100px" }}
                    />
                </label>
              <input
              hidden
                type="file"
                onChange={changeHandler}
                name="image"
                className="form-control "
                id='myImg'
              />
            </div>
            <div className={`${style.inputData} my-3`}>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="form-control "
                onChange={changeHandler}
                value={category.name}
              />
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
