import React from 'react'
import { Link } from 'react-router-dom'
import style from './TopNav.module.scss'

export default function TopNav() {
  return (
   <div className={`${style.topnav} py-3` }>
    <div className="container">
        <div className="row">
            <div className="col-md-6">
            <div className={`${style.searchForm} input-group`}>
             <div className={`${style.formLine} form-outline`}>
                <input type="search" name='search' className={`${style.inputSearch} form-control`} placeholder="Search" />
             </div>
               <button type="button" className={`${style.myBtn} btn btn-primary`}>
                 <i className="fas fa-search"></i>
              </button>
            </div>
            </div>
            <div className="col-md-6">
            <div className={`${style.topRight}`}>
            <div className={`${style.drop} btn-group`}>
             <button type="button" className={`${style.menu} btn btn-danger dropdown-toggle `} data-bs-toggle="dropdown" aria-expanded="false">
             <i className="fa-solid fa-cart-shopping position-relative"><span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>5</span></i>
             </button>

               <ul className={`${style.menuDown} dropdown-menu`}>
                <li><Link className="dropdown-item" to="">Action</Link></li>
                <li><Link className="dropdown-item" to>Another action</Link></li>
               <li><Link className="dropdown-item" to="">Something else here</Link></li>
               <li><Link className="dropdown-item" to="">Separated link</Link></li>
               </ul>
                </div>
                <div className={`${style.drop} btn-group`}>
             <button type="button" className={`${style.menu} btn btn-danger dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
             <i className="fa-solid fa-bell position-relative"><span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>5</span></i>
             </button>
               <ul className={`${style.menuDown} dropdown-menu`}>
                <li><Link className="dropdown-item" to="">Action</Link></li>
                <li><Link className="dropdown-item" to>Another action</Link></li>
               <li><Link className="dropdown-item" to="">Something else here</Link></li>
               <li><Link className="dropdown-item" to="">Separated link</Link></li>
               </ul>
                </div>
                <div className={`${style.dropImg} btn-group`}>
             <button type="button" className={`${style.menu} btn btn-danger dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
             <img src='./images/avatar5.png' alt='avatar'/>
             </button>
               <ul className={`${style.menuDown} dropdown-menu`}>
                <li><Link className="dropdown-item" to="">Profile</Link></li>
                <li><Link className="dropdown-item" to>Inbox</Link></li>
               <li><Link className="dropdown-item" to="">Log Out</Link></li>
               
               </ul>
            
                </div>
            </div>
            </div>
        </div>
    

 


  </div>
   </div>
  )
}
