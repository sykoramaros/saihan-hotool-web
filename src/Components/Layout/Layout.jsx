import React from "react"
import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import "./Layout.css"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"

import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"

import CookiesModalStrapi from "../CookiesModal/CookiesModalStrapi"

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [cookiesModalIsOpen, setCookiesModalIsOpen] = useState(false)

  useEffect(() => {
    // Zkontroluj localStorage
    // const modalWasShown = localStorage.getItem("modalShown")
    const modalTimestamp = localStorage.getItem("modalShown")
    const cookiesAccepted = localStorage.getItem("cookiesAccepted")
    const currentTime = Date.now()
    const oneHour = 60 * 60 * 1000 // 1 hodina v milisekundách
    const fifteenMinutes = 15 * 60 * 1000 // 15 minut v milisekundách
    const fiveSeconds = 5 * 1000 // 5 sekund v milisekundách
    const oneWeek = 7 * 24 * 60 * 60 * 1000 // 1 týden v milisekundách

    // if (!modalWasShown) {
    //   setIsOpen(true) // modal se zobrazí
    //   localStorage.setItem("modalShown", "true") // označ, že modal už byl zobrazen
    // }

    // if (!modalTimestamp || currentTime - parseInt(modalTimestamp) > oneWeek) {
    //   setInfoModalIsOpen(true) // modal se zobrazí
    //   localStorage.setItem("modalShown", currentTime.toString()) // ulož aktuální čas
    // }
    if (!cookiesAccepted || currentTime - parseInt(cookiesAccepted) > oneWeek) {
      setCookiesModalIsOpen(true)
      localStorage.setItem("cookiesAccepted", currentTime.toString())
    }
  }, [])

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
      {cookiesModalIsOpen && (
        <div className="cookies-modal-container">
          <CookiesModalStrapi onClose={() => setCookiesModalIsOpen(false)} />
        </div>
      )}
    </>
  )
}

export default Layout
