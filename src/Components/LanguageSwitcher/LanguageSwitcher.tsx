import { useQuery, gql } from "@apollo/client"
import { useBaseUrl } from "../../context/BaseUrlProvider"
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

export const LanguageSwitcher = () => {
  const BASE_URL = useBaseUrl()
  const { setCurrentLocale } = useLanguage()

  const { loading, error, data } = useQuery(LANGUAGE_SWITCHER, {
    fetchPolicy: "no-cache",
  })

  if (loading) return <div>Loading...</div>
  if (error) return null

  return (
    <ul className="my-auto flex flex-col gap-3" style={{ listStyle: "none" }}>
      {data?.languageSwitcher?.LanguageSwitcher?.map(
        (
          item: {
            id: number
            LanguageCode: string
            LanguageImage: { url: string; alternativeText: string }
          },
          index: number,
        ) => (
          <li key={index}>
            <button onClick={() => setCurrentLocale(item.LanguageCode)} className="bg-transparent border-0 p-0 cursor-pointer">
              <img
                className="language-image border rounded-full shadow-sm"
                src={`${BASE_URL}${item?.LanguageImage?.url}`}
                alt={item?.LanguageImage?.alternativeText}
                width="35"
                height="auto"
              />
            </button>
          </li>
        ),
      )}
    </ul>
  )
}
