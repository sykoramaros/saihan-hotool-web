import { useQuery, gql } from "@apollo/client"
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

interface CookiesModalStrapiProps {
  onClose: () => void
}

export const CookiesModalStrapi = ({ onClose }: CookiesModalStrapiProps) => {
  const BASE_URL = useBaseUrl()
  const { currentLocale } = useLanguage()

  const { loading, error, data } = useQuery(COOKIES_MODAL, {
    variables: { locale: currentLocale },
  })

  if (loading) return <p>Loading...</p>
  if (error) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-gray-100 p-8">
      <div className="hidden md:flex justify-center items-center">
        <img
          className="max-h-48 object-contain"
          src={`${BASE_URL}${data.cookiesModal.image.url}`}
          alt={data.cookiesModal.image.alternativeText}
        />
      </div>
      <div className="text-center md:text-start px-5 pt-3">
        <h1 className="text-2xl font-semibold">{data.cookiesModal.title}</h1>
        <p>{data.cookiesModal.text}</p>
        <button
          className="bg-success text-white text-lg mt-2 px-5 py-2 rounded"
          onClick={onClose}
        >
          {data.cookiesModal.acceptButton}
        </button>
      </div>
    </div>
  )
}
