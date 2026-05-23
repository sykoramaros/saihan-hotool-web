import { createRootRoute, Outlet } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { Navbar } from "@/Components/basicComponents/Navbar"
import { Footer } from "@/Components/basicComponents/Footer"
import { LanguageSwitcher } from "@/Components/LanguageSwitcher/LanguageSwitcher"
import { CookiesModalStrapi } from "@/Components/CookiesModal/CookiesModalStrapi"
import { Dialog, DialogContent } from "@/Components/ui/dialog"

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
      <Dialog open={cookiesModalIsOpen} onOpenChange={(open) => !open && setCookiesModalIsOpen(false)}>
        <DialogContent showCloseButton={false} className="overflow-hidden p-0 rounded-[10rem_10rem_0_0] sm:max-w-[500px] md:max-w-[700px]">
          <CookiesModalStrapi onClose={() => setCookiesModalIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}
