import { useQuery, gql } from "@apollo/client"
import { useBaseUrl } from "../../context/BaseUrlProvider"
import { useLanguage } from "../../context/LanguageProvider"
import { LeftPictureArticle } from "../../components/LeftPictureArticle/LeftPictureArticle"
import { RightPictureArticle } from "../../components/RightPictureArticle/RightPictureArticle"
import { Carousel } from "../../components/Carousel/Carousel"
import { HorizontalScrollingContainer } from "../../components/HorizontalScrollingContainer/HorizontalScrollingContainer"
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner"

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

export const Home = () => {
  const BASE_URL = useBaseUrl()
  const { currentLocale } = useLanguage()

  const { loading, error, data } = useQuery(HOME_CONTENT, {
    variables: { locale: currentLocale },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1 className="text-center mt-20 text-shadow-black" id="top-page">
        {data.homePage.Title}
      </h1>
      <h2 className="text-center">{data.homePage.Subhead}</h2>
      <hr className="mx-auto w-3/4 my-8" />

      <section id="info" className="scroll-mt-20 my-20">
        <div className="flex flex-col gap-20 mx-auto lg:mx-20 mt-4 p-3">
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

      <br />

      <section
        id="prices"
        className="scroll-mt-20 flex justify-center"
      >
        <div
          className="flex flex-nowrap gap-3 hide-scrollbar justify-center items-center bg-primary py-4 px-5 overflow-x-auto overflow-y-hidden w-screen"
          style={{ marginBottom: "13rem" }}
        >
          {data.horizontalScrollingContainers.map(
            (item: {
              documentId: string
              Image: { url: string; alternativeText: string }
              Title: string
              TablePersonTitle: string
              TableNightPriceTitle: string
              TableWeekPriceTitle: string
              TableRow: { id: string; PersonNumber: number; NightPrice: number; WeekPrice: number }[]
              BookButton: string
            }) => (
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
            ),
          )}
        </div>
      </section>

      <section id="carousel-gallery" className="scroll-mt-20">
        <div className="flex justify-center items-center">
          <div className="w-full sm:w-11/12">
            <Carousel picture={data.homePage.Gallery} />
          </div>
        </div>
      </section>
    </div>
  )
}
