import React from "react"
import "./Home.css"

import { useQuery, gql } from "@apollo/client"
import { useParams } from "react-router-dom"
import { useBaseUrl } from "../../context/BaseUrlProvider"
import { useLanguage } from "../../context/LanguageProvider"

import LeftPictureArticle from "../../Components/LeftPictureArticle/LeftPictureArticle"
import RightPictureArticle from "../../Components/RightPictureArticle/RightPictureArticle"
import Carousel from "../../Components/Carousel/Carousel"
import HorizontalScrollingContainer from "../../Components/HorizontalScrollingContainer/HorizontalScrollingContainer"

import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner"

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
    horizontalScrollingContainers(locale: $locale) {
      documentId
      Image {
        url
        alternativeText
      }
      Title
      TablePersonTitle
      TableNightPriceTitle
      TableWeekPriceTitle
      TableRow {
        id
        PersonNumber
        NightPrice
        WeekPrice
      }
      BookButton
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
  console.log(data)

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <div className="container-fluid">
        <h1 className="text-center mt-5" id="top-page">
          {data.homePage.Title}
        </h1>
        <h2 className="text-center">{data.homePage.Subhead}</h2>
        <hr className="horizontal-line mx-auto w-75" />
        <section id="info">
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
        </section>
        <hr className="horizontal-line mx-auto w-50" />

        <section id="prices">
          <div
            className="d-flex flex-nowrap gap-3 hide-scrollbar justify-content-center align-items-center bg-primary py-4 px-5"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              height: "100%",
              // paddingBottom: "0rem",
              marginBottom: "13rem",
            }}
          >
            {data.horizontalScrollingContainers.map((item) => (
              <div
                key={item.documentId}
                style={{ minWidth: "250px", maxWidth: "300px" }}
              >
                <HorizontalScrollingContainer
                  image={item?.Image}
                  title={item?.Title}
                  tablePersonTitle={item?.TablePersonTitle}
                  tableNightTitle={item?.TableNightPriceTitle}
                  tableWeekTitle={item?.TableWeekPriceTitle}
                  tableRow={item?.TableRow}
                  bookButton={item?.BookButton}
                />
              </div>
            ))}
          </div>
        </section>
        {/* <hr className="horizontal-line mx-auto w-25" /> */}
        {/* <hr className="horizontal-line mx-auto w-25" /> */}

        <section id="carousel-gallery">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-sm-11">
              <Carousel picture={data.homePage.Gallery} />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
