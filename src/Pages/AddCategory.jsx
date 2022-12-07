import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from "../Styles/AddCategories.module.scss";

export default function AddCategory() {
    const [loadmsg,setLoadMsg] = useState(false)
    const [category,setCategory] = useState({
     image: "",
     name: "",
    })
    let navigate = useNavigate()
//joi valid
  let CatForm = ()=>{
    let schema =  Joi.object({
        image:Joi.required(),
        name:Joi.string().required()
      })
      return schema.validate(category)
  }
 
    //onchange
    let changeHandler = (e)=>{
        let categoryData = {...category}
        categoryData[e.target.name] = e.target.value;
        setCategory(categoryData)
    }
  //submit
  let submitHandeler = async (e)=>{
    e.preventDefault()
    let validForm = CatForm()
    if(validForm.error){
        alert('try again');
    }
    else {
        try {
            const { data } = await axios.post(
                "http://localhost:3002/categories",
                category
              );
              setLoadMsg(true)

              const timer = setTimeout(()=>{
                navigate('/Categories')

              },2000);  
             } catch (error) {
           console.log(error); 
        }

    }

   
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
            <h6>Category Created Successfuly</h6>
            <i className="fa-solid fa-check-double"></i>
             </div>
             :""}
            </div>
            <div className={`${style.brdr}`}></div>
            <div className={`${style.pageInfo}`}>
              <Link to="/categories" className={`${style.butn} btn btn-danger`}>
              <i className="fa-solid fa-shop"></i> Categories
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
                    placeholder="Enter Your Name"
                    className="form-control "
                    onChange={changeHandler}
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
