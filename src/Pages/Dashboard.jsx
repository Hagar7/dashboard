import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from "../Styles/Slider.module.scss";


export default function Dashboard() {
  const [slider,setSlider] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    const getSlider = async()=>{
     let {data}= await axios.get("https://ecommerce-be-q3ia.onrender.com/sliders");
     setSlider(data)
    }
    getSlider()
  }, [])
  
  const deleteSlider = async(id)=>{
    try {
      await axios.delete("https://ecommerce-be-q3ia.onrender.com/sliders/" + id)
      setSlider(slider.filter((slide)=>slide.id !== id))
    } catch (error) {
      
    }

  }
  return (
 <>
 <div className={`${style.slider}`}>
    <div className={`${style.head}`}>
    <i className="fa-solid fa-store"></i>
      <div className={`${style.title}`}>
        <h3>Sliders</h3>
        <h6>List of Sliders</h6>
      </div>
    </div>
    <div className={`${style.content}`}>
      <div className={`${style.page}`}>
        <div className={`${style.pagehead}`}>
          <h6>Sliders Details</h6>
        </div>
        <div className={`${style.brdr}`}></div>
        <div className={`${style.pageInfo}`}>
          <Link to="/addslider" className={`${style.butn} btn btn-danger`}>
            <i className="fa-solid fa-plus"></i> Add Slider
          </Link>
          <table className={`${style.myTable} table`}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Slider Name</th>
                <th>Slider Caption</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {slider.map((slide) => (
                <tr key={slide.id}>
                  <td>
                    <img 
                      src={`images/${
                        slide.image.split("\\")[
                          slide.image.split("\\").length - 1
                        ]
                      }`}
                      alt="img"
                    />
                  </td>
                  <td>{slide.name}</td>
                  <td>{slide.caption}</td>
                  <td>
                    <button
                     onClick={()=>{
                      navigate('/editslider', {state:slide})
                    }}
                      className={`${style.butn} btn btn-primary mx-2`}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteSlider(slide.id);
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
 </>
  )
}
