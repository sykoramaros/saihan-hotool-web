import React from "react"
import { useState } from "react"
import "./CookiesModalStrapi.css"

import { useQuery, gql } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useBaseUrl } from "../../context/BaseUrlProvider"
import { useLanguage } from "../../context/LanguageProvider"

const COOKIES_MODAL = gql`
  query GetCookiesModal($locale: I18NLocaleCode!) {
    cookiesModal(locale: $locale) {
      documentId
      image {
        url
        alternativeText
      }
      title
      text
      acceptButton
    }
  }
`
const CookiesModalStrapi = ({ onClose }) => {
  const BASE_URL = useBaseUrl()
  const { documentId } = useParams()
  const { currentLocale } = useLanguage()

  const { loading, error, data } = useQuery(COOKIES_MODAL, {
    variables: {
      locale: currentLocale,
      documentId,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  // console.log(data)

  return (
    <>
      {/* <div className="cookies-modal-overlay" onClick={onClose}> */}
      <div className="row d-flex justify-content-between align-items-center bg-light p-4">
        <div className="d-none d-md-block col-sm-6 cookies-img-container">
          <img
            className="cookies-img img-fluid"
            src={`${BASE_URL}${data.cookiesModal.image.url}`}
            alt={data.cookiesModal.image.alternativeText}
          />
        </div>
        <div className="col-12 col-md-6 text-center text-md-start px-5 pt-3">
          <h1 className="fs-2">{data.cookiesModal.title}</h1>
          <p className="">{data.cookiesModal.text}</p>
          <button className="btn btn-lg bg-success text-white mt-2" onClick={onClose}>
            {data.cookiesModal.acceptButton}
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default CookiesModalStrapi
