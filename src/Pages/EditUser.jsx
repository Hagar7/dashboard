import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "../Styles/AddUser.module.scss";
import axios from "axios";


export default function EditUser() {
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
 

  const { state } = useLocation();
  useEffect(() => {
    setFormData(state);
  }, []);
  const submitHandeler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "https://ecommerce-be-q3ia.onrender.com/users/" +state.id,
        formData
      );
      setLoadMsg(true)
      const timer = setTimeout(() => {
        navigate("/users");         
      }, 2000);
    } catch (error) {
      console.log(error);
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
            <h6>User Updated Successfuly</h6>
            <i className="fa-solid fa-check-double"></i>
             </div>
             :""}
            </div>
            <div className={`${style.brdr}`}></div>
            <div className={`${style.pageInfo}`}>


              <form onSubmit={submitHandeler}>
                <div className={`${style.inputData} py-4`}>
                  <label htmlFor="userPic">
                    <img
                      src={`images/${
                        formData.image.split("\\")[
                          formData.image.split("\\").length - 1
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
                    id="userPic"
                  />
                </div>
                <div className={`${style.inputData} my-3`}>
                  <input
                    value={formData.name}
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    className="form-control "
                    onChange={changeHandler}
                  />
                </div>
                <div className={`${style.inputData} my-3`}>
                  <input
                    value={formData.email}
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="form-control "
                    onChange={changeHandler}
                  />
                </div>
                <div className={`${style.inputData} my-3`}>
                  <input
                    value={formData.password}
                    type="password"
                    name="password"
                    placeholder="Enter Your password"
                    className="form-control "
                    onChange={changeHandler}
                  />
                </div>
                <div className={`${style.inputData} my-3`}>
                  <input
                    value={formData.birthday}
                    type="date"
                    name="birthday"
                    placeholder="Enter Your Birthday"
                    className="form-control "
                    onChange={changeHandler}
                  />
                </div>
                <div className={`${style.inputData} my-3`}>
                  <input
                    value={formData.phone}
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
                      checked={formData.gender === "male"}
                      onChange={changeHandler}
                      value="male"
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
                      onChange={changeHandler}
                      value="female"
                      checked={formData.gender === "female"}
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
                      value={formData.role}
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
