import React, { useState } from "react"
import "./Navbar.css"

import { HashLink } from "react-router-hash-link"

import { useQuery, gql } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useBaseUrl } from "../../context/BaseUrlProvider"
import { useLanguage } from "../../context/LanguageProvider"

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"

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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const BASE_URL = useBaseUrl()
  const { documentId } = useParams()
  const { currentLocale } = useLanguage()

  const { loading, error, data } = useQuery(NAVBAR_CONTENT, {
    variables: {
      locale: currentLocale,
      documentId,
    },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error.message}</p>

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className="navbar-container bg-warning d-flex justify-content-evenly align-items-center w-100 py-2 rounded-bottom-3">
        <div>
          <img
            className="logo-img mx-3"
            style={{ color: "white" }}
            src={`${BASE_URL}${data.navbar.Logo.url}`}
            alt={data.navbar.Logo.alternativeText}
            width="50"
            height="auto"
          />
        </div>
        <span className="navbar-title fs-3 fw-medium text-white text-shadow-black">
          {data.navbar.Title}
        </span>
        <ul
          className={`navbar-menu ms-auto me-3 gap-3 gap-lg-4 my-auto d-md-flex fs-4 ${
            isOpen ? "open" : ""
          } `}
        >
          <li className="navbar-item fw-medium my-auto">
            <HashLink
              className="nav-link text-white"
              to="#top-page"
              smooth
              scroll={(el) => {
                const offset = -999
                const y =
                  el.getBoundingClientRect().top + window.pageYOffset + offset
                window.scrollTo({ top: y, behavior: "smooth" })
              }}
            >
              {data.navbar.Home}
            </HashLink>
          </li>

          <li className="navbar-item fw-medium my-auto">
            <HashLink
              className="nav-link text-white"
              to="/#info"
              smooth
              scroll={(el) => {
                const offset = -200
                const y =
                  el.getBoundingClientRect().top + window.pageYOffset + offset
                window.scrollTo({ top: y, behavior: "smooth" })
              }}
            >
              {data.navbar.Info}
            </HashLink>
          </li>

          <li className="navbar-item fw-medium my-auto">
            <HashLink
              className="text-white nav-link"
              to="/#prices"
              smooth
              scroll={(el) => {
                const offset = -100
                const y =
                  el.getBoundingClientRect().top + window.pageYOffset + offset
                window.scrollTo({ top: y, behavior: "smooth" })
              }}
            >
              {data.navbar.Pricing}
            </HashLink>
          </li>

          <li className="navbar-item fw-medium my-auto">
            <HashLink
              className="text-white nav-link"
              to="/#carousel-gallery"
              smooth
              scroll={(el) => {
                const offset = -75
                const y =
                  el.getBoundingClientRect().top + window.pageYOffset + offset
                window.scrollTo({ top: y, behavior: "smooth" })
              }}
            >
              {data.navbar.Gallery}
            </HashLink>
          </li>

          <li className="navbar-item fw-medium my-auto">
            <HashLink className="text-white nav-link" to="/#contacts" smooth>
              {data.navbar.Contact}
            </HashLink>
          </li>
        </ul>

        <button
          className="navbar-toggle bg-transparent d-md-none font-13 fw-bolder ms-auto"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          ☰
        </button>
      </nav>
    </>
  )
}

export default Navbar
