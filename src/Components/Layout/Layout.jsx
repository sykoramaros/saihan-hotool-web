import React from "react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import "./Layout.css"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"

import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className="app-container"
        // style={{
        //   minHeight: "100vh",
        //   width: "100%",
        //   backgroundImage: `url(${
        //     process.env.PUBLIC_URL + "/img/gradient-background.svg"
        //   })`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        // }}
      ></div>
      <div className="sticky-top">
        <Navbar />
      </div>
      <div style={{ minHeight: "100vh" }}>
        <div
          className={`language-container bg-info d-flex ${
            isOpen ? "open" : ""
          }`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <img
            className="language-arrow"
            style={{
              fontSize: "30px",
              position: "absolute",
              top: "50%",
              left: "15px",
              transform: "translate(-50%, -50%)",
            }}
            // src={process.env.PUBLIC_URL + "/img/arrow-left-svgrepo-com.svg"}
            src={
              isOpen
                ? process.env.PUBLIC_URL + "/img/arrow-right-svgrepo-com.svg"
                : process.env.PUBLIC_URL + "/img/arrow-left-svgrepo-com.svg"
            }
            alt="left arrow"
            width={"35px"}
          />

          <LanguageSwitcher />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
      <br />
      <div style={{ marginTop: "21vw" }} id="contacts">
        <Footer />
      </div>
    </>
  )
}

export default Layout
