import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import SideBar from "../SideBar/SideBar";
import TopNav from "../TopNav/TopNav";
import style from './MasterLayout.module.scss';

export default function MasterLayout() {
  return (
    <>
      <div className={`${style.main}`}>
      <SideBar/>
      <div className={`${style.contentPage} `}>
      <TopNav/>
      <Outlet></Outlet>
      <Footer/>
      </div>
      </div>
    </>
  );
}
