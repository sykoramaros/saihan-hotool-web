import { createRootRoute, Outlet } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/basicComponents/Navbar"
import { Footer } from "@/components/basicComponents/Footer"
import { LanguageSwitcher } from "@/components/LanguageSwitcher/LanguageSwitcher"
import { CookiesModalStrapi } from "@/components/CookiesModal/CookiesModalStrapi"

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [cookiesModalIsOpen, setCookiesModalIsOpen] = useState(false)

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted")
    const currentTime = Date.now()
    const oneWeek = 7 * 24 * 60 * 60 * 1000
    if (!cookiesAccepted || currentTime - parseInt(cookiesAccepted) > oneWeek) {
      setCookiesModalIsOpen(true)
      localStorage.setItem("cookiesAccepted", currentTime.toString())
    }
  }, [])

  return (
    <>
      <div className="app-container" />
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div
        className={`language-container bg-info flex ${isLangOpen ? "open" : ""}`}
        onMouseEnter={() => setIsLangOpen(true)}
        onMouseLeave={() => setIsLangOpen(false)}
      >
        <img
          className="language-arrow"
          style={{
            position: "absolute",
            top: "50%",
            left: "15px",
            transform: "translate(-50%, -50%)",
          }}
          src={
            isLangOpen
              ? "/img/arrow-right-svgrepo-com.svg"
              : "/img/arrow-left-svgrepo-com.svg"
          }
          alt="toggle language"
          width="35"
        />
        <LanguageSwitcher />
      </div>
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
      <br />
      <div style={{ marginTop: "8vw" }} id="contacts">
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
