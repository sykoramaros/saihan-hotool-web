import { usePayloadQuery } from "@/hooks/use-payload-query"
import { LANGUAGE_SWITCHER_CONTENT } from "@/graphql/queries"
import { useLanguage } from "@/context/LanguageProvider"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"

interface LanguageSwitcherData {
  LanguageSwitcherContent: {
    languages: {
      languageName: string
      languageCode: string
      languageImage: { url: string; alt: string } | null
    }[]
  }
}

export const LanguageSwitcher = () => {
  const { setCurrentLocale } = useLanguage()
  const { data, loading } = usePayloadQuery<LanguageSwitcherData>(LANGUAGE_SWITCHER_CONTENT)

  if (loading) return <LoadingSpinner />
  if (!data) return null

  return (
    <ul className="my-auto flex flex-col gap-3" style={{ listStyle: "none" }}>
      {data.LanguageSwitcherContent.languages.map((item, index) => (
        <li key={index}>
          <button
            onClick={() => setCurrentLocale(item.languageCode)}
            className="bg-transparent border-0 p-0 cursor-pointer"
          >
            {item.languageImage && (
              <img
                className="language-image border rounded-full shadow-sm"
                src={item.languageImage.url}
                alt={item.languageImage.alt}
                width="35"
                height="auto"
              />
            )}
          </button>
        </li>
      ))}
    </ul>
  )
}
