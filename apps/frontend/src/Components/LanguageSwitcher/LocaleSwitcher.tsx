import { LanguageSwitcher } from "@sykoramaros/marosh-components"
import { useLanguage } from "@/context/LanguageProvider"

const LANGUAGES = [
  { code: "cs", countryCode: "cz", label: "CS" },
  { code: "mn", countryCode: "mn", label: "MN" },
]

export const LocaleSwitcher = ({ className }: { className?: string }) => {
  const { currentLocale, setCurrentLocale } = useLanguage()

  return (
    <LanguageSwitcher
      languages={LANGUAGES}
      value={currentLocale}
      onChange={setCurrentLocale}
      {...(className ? { className } : {})}
    />
  )
}
