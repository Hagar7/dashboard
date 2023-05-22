import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import style from "../Styles/Products.module.scss";

export default function Products() {
  const [products, setProducts] = useState([])
  let navigate = useNavigate()

  let getCategories = async()=>{
    let {data} = await axios.get("http://localhost:3002/products");
    setProducts(data)
  }

  useEffect(() => {
    try {
      getCategories()
    } catch (error) {
      console.log(error);
    }
  }, [])
  

  //delete
  const deleteProduct = async(id)=>{
    const {data} = await axios.delete("https://ecommerce-be-q3ia.onrender.com/products" + id)
    setProducts(products.filter((product)=>product.id !== id))
  }

  return (
    <>
      <div className={`${style.products}`}>
        <div className={`${style.head}`}>
          <i className="fa-solid fa-cart-shopping"></i>
          <div className={`${style.title}`}>
            <h3>Products</h3>
            <h6>List of products</h6>
          </div>
        </div>
        <div className={`${style.content}`}>
          <div className={`${style.page}`}>
            <div className={`${style.pagehead}`}>
              <h6>Products Details</h6>
            </div>
            <div className={`${style.brdr}`}></div>
            <div className={`${style.pageInfo}`}>
              <Link to="/addproduct" className={`${style.butn} btn btn-danger`}>
                <i className="fa-solid fa-plus"></i> Add Products
              </Link>
              <table className={`${style.myTable} table`}>
                <thead>
                  <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Product category</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  {products.map((product)=>
                  <tr>
                      <td>
                      <img
                        src={`images/${
                          product.image.split("\\")[
                            product.image.split("\\").length - 1
                          ]
                        }`}
                        alt="img"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price} $</td>
                    <td>{product.category}</td>
                    <td>
                      <button
                        onClick={()=>{
                          navigate("/editproduct", { state: product })
                        }}
                        className={`${style.butn} btn btn-primary mx-2`}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                      onClick={()=>{
                        deleteProduct(product.id)
                      }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  )}
               
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
