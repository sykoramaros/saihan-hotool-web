import { useState } from "react"
import { useQuery, gql } from "@apollo/client"
import { useBaseUrl } from "../../context/BaseUrlProvider"
import { useLanguage } from "../../context/LanguageProvider"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"

const NAVBAR_CONTENT = gql`
  query GetNavbarContent($locale: I18NLocaleCode!) {
    navbar(locale: $locale) {
      documentId
      Logo {
        url
        alternativeText
      }
      Title
      Home
      Info
      Pricing
      Gallery
      Contact
    }
  }
`

const scrollTo = (id: string, offset = 0) => (e: React.MouseEvent) => {
  e.preventDefault()
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" })
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: "smooth" })
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const BASE_URL = useBaseUrl()
  const { currentLocale } = useLanguage()

  const { loading, error, data } = useQuery(NAVBAR_CONTENT, {
    variables: { locale: currentLocale },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error.message}</p>

  const navItems = [
    { label: data.navbar.Home, onClick: scrollTo("top") },
    { label: data.navbar.Info, onClick: scrollTo("info", 80) },
    { label: data.navbar.Pricing, onClick: scrollTo("prices", 80) },
    { label: data.navbar.Gallery, onClick: scrollTo("carousel-gallery", 80) },
    { label: data.navbar.Contact, onClick: scrollTo("contacts") },
  ]

  return (
    <nav className="navbar-container bg-primary flex justify-evenly items-center w-full py-2 rounded-b-lg relative">
      <div>
        <img
          className="logo-img mx-3"
          src={`${BASE_URL}${data.navbar.Logo.url}`}
          alt={data.navbar.Logo.alternativeText}
          width="50"
          height="auto"
        />
      </div>
      <span className="text-3xl font-medium uppercase text-white text-shadow-black">
        {data.navbar.Title}
      </span>
      <ul
        className={`navbar-menu ms-auto me-3 gap-3 lg:gap-4 my-auto md:flex text-2xl ${
          isOpen ? "open" : ""
        }`}
      >
        {navItems.map(({ label, onClick }) => (
          <li key={label} className="navbar-item font-medium my-auto">
            <a
              href="#"
              className="nav-link text-white no-underline"
              onClick={onClick}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <button
        className="navbar-toggle md:hidden font-bold ml-auto mr-3 text-white"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        ☰
      </button>
    </nav>
  )
}
