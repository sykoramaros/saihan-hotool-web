import React from "react"
import "./LanguageSwitcher.css"

import { Link } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import { useBaseUrl } from "../../context/BaseUrlProvider"
import { useParams } from "react-router-dom"
import { useLanguage } from "../../context/LanguageProvider"

const LANGUAGE_SWITCHER = gql`
  query LanguageSwitcherQuery {
    languageSwitcher {
      documentId
      LanguageSwitcher {
        id
        LanguageName
        LanguageCode
        LanguageImage {
          url
          alternativeText
        }
      }
    }
  }
`

const LanguageSwitcher = () => {
  const BASE_URL = useBaseUrl()
  const { documentId } = useParams()
  const { currentLocale, setCurrentLocale, availableLanguages } = useLanguage()

  const { loading, error, data } = useQuery(LANGUAGE_SWITCHER, {
    // variables: {
    //   locale: currentLocale,
    // },
    fetchPolicy: "no-cache",
    documentId,
  })

  if (loading) return <div>Loading...</div>
  if (error) return null

  return (
    <>
      <ul
        className="my-auto d-flex flex-column gap-3"
        style={{
          listStyle: "none",
          // borderStartStartRadius: "50%",
          // borderBottomLeftRadius: "50%",
          // padding: "25px 100px 25px 35px",
        }}
      >
        {data?.languageSwitcher?.LanguageSwitcher?.map((item, index) => (
          <li key={index}>
            <Link onClick={() => setCurrentLocale(item.LanguageCode)}>
              {/* <span>{item.LanguageName}</span> */}
              {/* <br /> */}
              {/* <span>{item.LanguageCode}</span> */}
              <img
                className="language-image border rounded-5 shadow-sm"
                src={`${BASE_URL}${item?.LanguageImage?.url}`}
                alt={item?.LanguageImage?.alternativeText}
                width="35"
                height="auto"
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default LanguageSwitcher
