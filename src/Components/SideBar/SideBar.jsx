
import { useState } from 'react'
import { NavLink} from 'react-router-dom'
import style from './SideBar.module.scss'

export default function SideBar() {
    const [isopen,setIsopen] = useState(false);
    const toggle =()=>{
        setIsopen(!isopen)  
    }
    const menuItem = [
        {
            path:'/',
            name:'Dashboard',
            icon: <i className="fa fa-dashboard"></i>
        },
        {
            path:'users',
            name:'Users',
            icon: <i className="fa-solid fa-users"></i>
        },
        {
            path:'adduser',
            name:'Add Users',
            icon: <i className="fa-solid fa-user-plus"></i>
        },
        {
            path:'categories',
            name:'Categories',
            icon: <i className="fa-solid fa-store"></i>
        },
        {
            path:'addcategory',
            name:'Add Category',
            icon: <i className="fa-solid fa-shop"></i>
        },
        {
            path:'products',
            name:'Products',
            icon: <i className="fa-solid fa-cart-shopping"></i>
        },
        {
            path:'addproduct',
            name:'Add Product',
            icon: <i className="fa-solid fa-cart-plus"></i>
        },
    ]
  return (
    <>

        <div className={`${style.sidebar} py-5`} style={{width: isopen? "200px" :"50px",transition:"all 0.5s ease"}}>
            <div className="container">
            <div className={`${style.topbar}`}>
                <h2 style={{display: isopen? "block" :"none"}}  className={`${style.logo}`}>Dashboard</h2>
                <div className={`${style.bars}`} onClick={toggle}>
                <i className="fa-solid fa-bars"></i>
                </div>
            </div>
            <div className={`${style.list} py-5`}>
                {menuItem.map((item,index)=>
                <NavLink to={item.path} className= {({ isActive })=>isActive?" nav-link mylinks activelinks":"nav-link mylinks"} key={index}>
                   <div className={`${style.icon}`}  >
                    {item.icon}
                    </div>
                    <div className={`${style.linkText}`}>
                        {item.name}
                    </div>
                </NavLink>
                )}
            </div>
            </div>
        </div>
   
    </>
  )
}
