import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../Styles/Users.module.scss";
import axios from "axios";


export default function Users() {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get("https://ecommerce-be-q3ia.onrender.com/users");
      setUsers(data);
    };
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete("https://ecommerce-be-q3ia.onrender.com/users/" + id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className={`${style.users}`}>
      <div className={`${style.head}`}>
        <i className="fa-solid fa-users"></i>
        <div className={`${style.title}`}>
          <h3>Users</h3>
          <h6>List of User</h6>
        </div>
      </div>
      <div className={`${style.content}`}>
        <div className={`${style.page}`}>
          <div className={`${style.pagehead}`}>
            <h6>Users Details</h6>
          </div>
          <div className={`${style.brdr}`}></div>
          <div className={`${style.pageInfo}`}>
            <Link to="/adduser" className={`${style.butn} btn btn-danger`}>
              <i className="fa-solid fa-plus"></i> Add User
            </Link>
            <table className={`${style.myTable} table`}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Birthday</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <img
                        src={`images/${
                          user.image.split("\\")[
                            user.image.split("\\").length - 1
                          ]
                        }`}
                        alt="img"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.birthday}</td>
                    <td>{user.phone}</td>
                    <td>{user.gender}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={() => {
                          navigate("/edituser", { state: user });
                        }}
                        className={`${style.butn} btn btn-primary mx-2`}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
