import { createContext, useContext, useState } from "react"

interface LanguageContextType {
  currentLocale: string
  setCurrentLocale: (locale: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  currentLocale: "cs",
  setCurrentLocale: () => {},
})

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLocale, setCurrentLocale] = useState("cs")

  return (
    <LanguageContext.Provider value={{ currentLocale, setCurrentLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
