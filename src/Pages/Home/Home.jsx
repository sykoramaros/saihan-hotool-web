import React from "react"

import { useQuery, gql } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useBaseUrl } from "../../context/BaseUrlProvider"
import { useLanguage } from "../../context/LanguageProvider"

const HOME_CONTENT = gql`
  query GetHomeContent($locale: I18NLocaleCode!) {
    homePage(locale: $locale) {
      documentId
      Title
      Subhead
      InfoImage {
        url
        alternativeText
      }
      InfoParagraph
      Gallery {
        documentId
        url
        alternativeText
      }
    }
  }
`

const Home = () => {
  const BASE_URL = useBaseUrl()
  const { documentId } = useParams()
  const { currentLocale } = useLanguage()

  const { loading, error, data } = useQuery(HOME_CONTENT, {
    variables: {
      locale: currentLocale,
      documentId,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <h1 className="text-center">{data.homePage.Title}</h1>
      <h2 className="text-center">{data.homePage.Subhead}</h2>
      <hr />
      <div className="row mx-auto mt-4 d-flex justify-content-center align-content-center border border-5 p-5">
        <div className="col-6 my-auto d-flex justify-content-center align-content-center">
          <p>{data.homePage.InfoParagraph}</p>
        </div>
        <div className="col-6 my-auto d-flex justify-content-center align-content-center">
          <img
            className="img-fluid border"
            src={BASE_URL + data.homePage.InfoImage.url}
            alt={data.homePage.InfoImage.alternativeText}
          />
        </div>
      </div>
    </>
  )
}

export default Home
