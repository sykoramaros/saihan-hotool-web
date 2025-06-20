import React from "react"
import "./Footer.css"
import { Link } from "react-router-dom"

import { useQuery, gql } from "@apollo/client"
import { useParams } from "react-router-dom"
// import { useBaseUrl } from "../../context/BaseUrlProvider"
import { useLanguage } from "../../context/LanguageProvider"

const FOOTER_CONTENT = gql`
  query GetFooterContent($locale: I18NLocaleCode!) {
    footer(locale: $locale) {
      ButtonTitle
      Name
      AddressLine1
      AddressLine2
      DataProtections
      Copyright
      AllRights
    }
  }
`

const Footer = () => {
  // const BASE_URL = useBaseUrl()
  const { documentId } = useParams()
  const { currentLocale } = useLanguage()

  const { loading, error, data } = useQuery(FOOTER_CONTENT, {
    variables: {
      locale: currentLocale,
      documentId,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <div className="container-fluid shadow">
        <div className="footer-container row p-4">
          <div className="d-block d-sm-none col-sm-12 d-flex justify-content-center align-items-center mb-3">
            <Link
              to="/contacts"
              className="text-white text-center d-block text-decoration-none fs-1 bg-green py-2 px-3"
            >
              {data.footer.ButtonTitle}
            </Link>
          </div>
          <div className="col-6 col-sm-4 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center py-1 gray roounded-1 fs-5 h-100">
              <address className="text-end mb-0 text-uppercase">
                {data.footer.Name}
              </address>
              <address className="text-end mb-0 ">
                {data.footer.AddressLine1}
              </address>
              <address className="text-end mb-0 ">
                {data.footer.AddressLine2}
              </address>
            </div>
          </div>
          <div className="d-none d-sm-block col-sm-4 d-flex justify-content-center align-items-center">
            <Link
              to="/contacts"
              className="text-white text-center d-block text-decoration-none bg-green p-2 rounded-1 fs-1"
            >
              {data.footer.ButtonTitle}
            </Link>
          </div>
          <div className="col-6 col-sm-4 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center py-1 gray rounded-1 fs-5 h-100">
              <Link
                to="/data-protections"
                className="text-start green mb-0 text-decoration-none"
              >
                {data.footer.DataProtections}
              </Link>
              <p className="text-start mb-0">{data.footer.Copyright}</p>
              <p className="text-start mb-0">{data.footer.AllRights}</p>
            </div>
          </div>
          <hr className="mx-auto my-4 w-75" />
          {/* OPEN STREET MAP */}
          <div className="">
            <iframe
              title="map"
              className="w-100 border border-2 shadow-sm rounded-2"
              width="auto"
              height="350"
              src="https://www.openstreetmap.org/export/embed.html?bbox=106.09213829040529%2C50.26542380510805%2C106.17917060852052%2C50.3075420423598&amp;layer=hot&amp;marker=50.28648758311509%2C106.13565444946289"
              style={{ border: "none" }}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  )
}
// <iframe src="https://embed.waze.com/iframe?zoom=17&lat=50.308166&lon=106.154097&ct=livemap" width="600" height="450" allowfullscreen></iframe>

export default Footer
