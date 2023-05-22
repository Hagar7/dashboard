import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from "../Styles/AddUser.module.scss";


export default function AddSlider() {
let navigate = useNavigate();
const [loadmsg,setLoadMsg] = useState(false)
const [slidersForm,GetSlidersForm] = useState({
    image:"",
    name:"",
    caption:"",
})

const submitHandeler = async(e)=>{
    e.preventDefault();
    try {
       const {data} = await axios.post('https://ecommerce-be-q3ia.onrender.com/sliders',slidersForm)
       setLoadMsg(true)
       const timer = setTimeout(() => {
         navigate("/");         
       }, 2000);
    } catch (error) {
        console.log(error);
    }
}

const changeHandler = (e)=>{
 let sliders = {...slidersForm}
 sliders[e.target.name] = e.target.value;
 GetSlidersForm(sliders);
}


  return (
    <div className={`${style.users}`}>
        <div className={`${style.head}`}>
        <i className="fa-solid fa-sliders"></i>
          <div className={`${style.title}`}>
            <h3>Add Slider</h3>
            <h6>Slider Register</h6>
          </div>
          
        </div>
        <div className={`${style.content}`}>
          <div className={`${style.page}`}>
            <div className={`${style.pagehead}`}>
              <h6>Slider Details</h6>
              {loadmsg===true ?
              <div className={`${style.msgBox}`}>
            <h6>Slider Added Successfuly</h6>
            <i className="fa-solid fa-check-double"></i>
             </div>
             :""}
            </div>
            <div className={`${style.brdr}`}></div>
            <div className={`${style.pageInfo}`}>
              <Link to="/users" className={`${style.butn} btn btn-danger`}>
              <i className="fa-solid fa-sliders"></i> sliders
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
                    placeholder="Enter Slide Name"
                    className="form-control "
                    onChange={changeHandler}
                  />
                </div>
                <div className={`${style.inputData} my-3`}>
                  <input
                    type="text"
                    name="caption"
                    placeholder="Enter Slide Caption"
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
