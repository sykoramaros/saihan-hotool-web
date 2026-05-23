import { LanguageSwitcher as MaroshLanguageSwitcher, type Language } from "@sykoramaros/marosh-components"
import { usePayloadQuery } from "@/hooks/use-payload-query"
import { useLanguage } from "@/context/LanguageProvider"
import { LANGUAGE_SWITCHER_CONTENT } from "@/graphql/queries"

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
  const { currentLocale, setCurrentLocale } = useLanguage()
  const { data } = usePayloadQuery<LanguageSwitcherData>(LANGUAGE_SWITCHER_CONTENT)

  const languages: Language[] = (data?.LanguageSwitcherContent?.languages ?? []).map((item) => ({
    code: item.languageCode,
    label: item.languageName,
    flag: item.languageImage?.url ?? "",
  }))

  if (languages.length === 0) return null

  return (
    <MaroshLanguageSwitcher
      languages={languages}
      value={currentLocale}
      onChange={setCurrentLocale}
      variant="bubble"
    />
  )
}
