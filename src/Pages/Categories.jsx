import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from "../Styles/Categories.module.scss";



export default function Categories() {
    const [categories, setCategories] = useState([]);
    const navigate =useNavigate()

    useEffect(() => {
      const getCategories = async() =>{
        const { data } = await axios.get("http://localhost:3002/categories");
        setCategories(data)
      }
      getCategories()
    }, [])
    
    const deleteUser = async (id)=>{

      try {
       await axios.delete("http://localhost:3002/categories/" + id)
       setCategories(categories.filter((category)=>category.id !==id))
      } catch (error) {
        console.log();
      }
    }
  return (
    <div className={`${style.categories}`}>
    <div className={`${style.head}`}>
    <i className="fa-solid fa-store"></i>
      <div className={`${style.title}`}>
        <h3>Categories</h3>
        <h6>List of Categories</h6>
      </div>
    </div>
    <div className={`${style.content}`}>
      <div className={`${style.page}`}>
        <div className={`${style.pagehead}`}>
          <h6>Categories Details</h6>
        </div>
        <div className={`${style.brdr}`}></div>
        <div className={`${style.pageInfo}`}>
          <Link to="/addcategory" className={`${style.butn} btn btn-danger`}>
            <i className="fa-solid fa-plus"></i> Add Category
          </Link>
          <table className={`${style.myTable} table`}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <img
                      src={`images/${
                        category.image.split("\\")[
                          category.image.split("\\").length - 1
                        ]
                      }`}
                      alt="img"
                    />
                  </td>
                  <td>{category.name}</td>


                  <td>
                    <button
                      onClick={()=>{
                        navigate('/editcategory', {state:category})
                      }}
                      className={`${style.butn} btn btn-primary mx-2`}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteUser(category.id);
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
  )
}
