import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import style from "../Styles/AddCategories.module.scss";


export default function EditSlider() {
    let navigate = useNavigate()
    const [loadmsg,setLoadMsg] = useState(false)
    const [editSlider,setEditSlider] = useState({
        image:"",
        name:"",
         caption:"",
    })

    const { state } = useLocation();
    useEffect(() => {
        setEditSlider(state)
    }, [])
    const submitHandeler = async(e)=>{
        e.preventDefault();
        try {
            const { data } = await axios.put(
              "https://ecommerce-be-q3ia.onrender.com/sliders/" +state.id,
              editSlider
            );
            setLoadMsg(true)
            const timer = setTimeout(() => {
              navigate("/");         
            }, 2000);
          } catch (error) {
            console.log(error);
          } 
    }
    const changeHandler = (e)=>{
        let myEdit = {...editSlider}
        myEdit[e.target.name] = e.target.value
        setEditSlider(myEdit)
    }
  return (
    <div className={`${style.category}`}>
    <div className={`${style.head}`}>
    <i className="fa-solid fa-shop"></i>
      <div className={`${style.title}`}>
        <h3>Edit Slider</h3>
        <h6>Slider Register</h6>
      </div>
      
    </div>
    <div className={`${style.content}`}>
      <div className={`${style.page}`}>
        <div className={`${style.pagehead}`}>
          <h6>Slider Details</h6>
          {loadmsg===true ?
          <div className={`${style.msgBox}`}>
        <h6>Slider Updated Successfuly</h6>
        <i className="fa-solid fa-check-double"></i>
         </div>
         :""}
        </div>
        <div className={`${style.brdr}`}></div>
        <div className={`${style.pageInfo}`}>
          <Link to="/" className={`${style.butn} btn btn-danger`}>
          <i className="fa-solid fa-sliders"></i> Sliders
          </Link>
          <form onSubmit={submitHandeler}>
            <div className={`${style.inputData} py-4`}>
                <label htmlFor="myImg">
                <img
                      src={`images/${
                        editSlider.image.split("\\")[
                            editSlider.image.split("\\").length - 1
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
                placeholder="Enter Slider Name"
                className="form-control "
                onChange={changeHandler}
                value={editSlider.name}
              />
            </div>  
            <div className={`${style.inputData} my-3`}>
              <input
                type="text"
                name="caption"
                placeholder="Enter Slider caption"
                className="form-control "
                onChange={changeHandler}
                value={editSlider.caption}
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
