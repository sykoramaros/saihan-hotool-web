import React from "react"

import { useQuery, gql } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useBaseUrl } from "../../context/BaseUrlProvider"
import { useLanguage } from "../../context/LanguageProvider"

import LeftPictureArticle from "../../Components/LeftPictureArticle/LeftPictureArticle"
import RightPictureArticle from "../../Components/RightPictureArticle/RightPictureArticle"
import Carousel from "../../Components/Carousel/Carousel"

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
      FirstHeadArticleImage {
        Head
        Paragraph
        Image {
          url
          alternativeText
        }
      }
      SecondHeadArticleImage {
        Head
        Paragraph
        Image {
          url
          alternativeText
        }
      }
      ThirdHeadArticleImage {
        Head
        Paragraph
        Image {
          url
          alternativeText
        }
      }
      Gallery {
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
      <div className="container-fluid">
        <h1 className="text-center">{data.homePage.Title}</h1>
        <h2 className="text-center">{data.homePage.Subhead}</h2>
        <hr />
        <div className="row gap-5 mx-auto mx-lg-5 mt-4 d-flex justify-content-center align-content-center p-3">
          <RightPictureArticle
            paragraph={data.homePage.FirstHeadArticleImage.Paragraph}
            src={BASE_URL + data.homePage.FirstHeadArticleImage.Image.url}
          />
          <LeftPictureArticle
            paragraph={data.homePage.SecondHeadArticleImage.Paragraph}
            src={BASE_URL + data.homePage.SecondHeadArticleImage.Image.url}
          />
          <RightPictureArticle
            paragraph={data.homePage.ThirdHeadArticleImage.Paragraph}
            src={BASE_URL + data.homePage.ThirdHeadArticleImage.Image.url}
          />
        </div>
        <hr className="mx-auto w-25" />
        <div className="mx-auto mx-lg-5 rounded-circle">
          <Carousel picture={data.homePage.Gallery} />
        </div>
        <hr className="mx-auto w-25" />
      </div>
    </>
  )
}

export default Home
