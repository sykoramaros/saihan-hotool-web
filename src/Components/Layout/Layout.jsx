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
      <div className="sticky-top">
        <Navbar />
      </div>
      <div style={{ minHeight: "100vh" }}>
        <div
          className={`language-container d-flex ${isOpen ? "open" : ""}`}
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
        <Outlet />
      </div>
      <br />
      <div className="mt-5">
        <Footer />
      </div>
    </>
  )
}

export default Layout
