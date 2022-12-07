import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../Styles/AddUser.module.scss";
import axios from "axios";
import Joi from "joi";

export default function AddUser() {
  const navigate = useNavigate();
  const [loadmsg,setLoadMsg] = useState(false)
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    password: "",
    birthday: "",
    phone: "",
    gender: "",
    role: "",
  });

//joi valid

let validForm = ()=>{
  let schema = Joi.object({
    image: Joi.any().required(),
    name:Joi.string().required().min(4).messages({ "string.empty": "Enter a file title." }),
    email: Joi.string().required().email({tlds:{allow:['com','net']}}),
    password: Joi.string().required().pattern(new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/)),
    birthday:Joi.required(),
    phone:Joi.string().length(11).pattern(/^[0-9]+$/),
    gender:Joi.required(),
    role:Joi.required()
    
  })
  return schema.validate(formData)
}
  const submitHandeler = async (e) => {
    e.preventDefault();
    let validation = validForm()
    if(validation.error){
     alert('sorry try again')
    }
    else{
      try {
        const { data } = await axios.post(
          "http://localhost:3002/users",
          formData
        );
        setLoadMsg(true)
        const timer = setTimeout(() => {
          navigate("/users");         
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
   
  };
 
  const changeHandler = (e) => {
    let myForm = { ...formData };
    myForm[e.target.name] = e.target.value;
    setFormData(myForm);
  };
  return (
    <>
      <div className={`${style.users}`}>
        <div className={`${style.head}`}>
          <i className="fa-solid fa-user-plus"></i>
          <div className={`${style.title}`}>
            <h3>Add User</h3>
            <h6>User Register</h6>
          </div>
          
        </div>
        <div className={`${style.content}`}>
          <div className={`${style.page}`}>
            <div className={`${style.pagehead}`}>
              <h6>Users Details</h6>
              {loadmsg===true ?
              <div className={`${style.msgBox}`}>
            <h6>User Created Successfuly</h6>
            <i className="fa-solid fa-check-double"></i>
             </div>
             :""}
            </div>
            <div className={`${style.brdr}`}></div>
            <div className={`${style.pageInfo}`}>
              <Link to="/users" className={`${style.butn} btn btn-danger`}>
              <i className="fa-solid fa-users"></i> Users
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
                <div className={`${style.inputData} my-3`}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="form-control "
                    onChange={changeHandler}
                  />
                </div>
                <div className={`${style.inputData} my-3`}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Your password"
                    className="form-control "
                    onChange={changeHandler}
                  />
                </div>
                <div className={`${style.inputData} my-3`}>
                  <input
                    type="date"
                    name="birthday"
                    placeholder="Enter Your Birthday"
                    className="form-control "
                    onChange={changeHandler}
                  />
                </div>
                <div className={`${style.inputData} my-3`}>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Enter Your Phone"
                    className="form-control "
                    onChange={changeHandler}
                  />
                </div>
                <div className={`${style.inputData} my-3`}>
                  <label className="my-2">Gneder</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={changeHandler}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={changeHandler}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
                <div className={`${style.inputData} my-3`}>
                  <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="userType">
                      Options
                    </label>
                    <select
                      className="form-select"
                      id="userType"
                      name="role"
                      onChange={changeHandler}
                    >
                      <option value="DEFAULT">Choose...</option>
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                      <option value="client">Client</option>
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
    </>
  );
}
