import ReactCountryFlag from "react-country-flag"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/context/LanguageProvider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

const LANGUAGES = [
  { code: "cs", countryCode: "CZ", label: "CS" },
  { code: "mn", countryCode: "MN", label: "MN" },
] as const

export const LocaleSwitcher = () => {
  const { currentLocale, setCurrentLocale } = useLanguage()
  const current = LANGUAGES.find((l) => l.code === currentLocale) ?? LANGUAGES[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 px-2 py-1 rounded-md text-white hover:bg-white/20 transition-colors">
          <ReactCountryFlag countryCode={current.countryCode} svg style={{ width: "1.4em", height: "1.4em" }} />
          <span className="text-sm font-medium">{current.label}</span>
          <ChevronDown className="size-3.5 opacity-70" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-0 w-fit">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setCurrentLocale(lang.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <ReactCountryFlag countryCode={lang.countryCode} svg style={{ width: "1.4em", height: "1.4em" }} />
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
