import { Menu } from "lucide-react"
import { useLocaleQuery } from "@/hooks/use-locale-query"
import { NAVBAR_CONTENT } from "@/graphql/queries"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { LanguageSwitcher } from "@/Components/LanguageSwitcher/LanguageSwitcher"

interface NavbarData {
  NavbarContent: {
    logo: { url: string; alt: string } | null
    title: string | null
    home: string | null
    info: string | null
    pricing: string | null
    gallery: string | null
    contact: string | null
  }
}

const scrollTo = (id: string, offset = 0) => (e: React.MouseEvent) => {
  e.preventDefault()
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" })
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: "smooth" })
}

export const Navbar = () => {
  const { data, loading } = useLocaleQuery<NavbarData>(NAVBAR_CONTENT)

  if (loading) return <LoadingSpinner />
  if (!data) return null

  const { NavbarContent } = data

  const navItems = [
    { label: NavbarContent.home, onClick: scrollTo("top") },
    { label: NavbarContent.info, onClick: scrollTo("info", 80) },
    { label: NavbarContent.pricing, onClick: scrollTo("prices", 80) },
    { label: NavbarContent.gallery, onClick: scrollTo("carousel-gallery", 80) },
    { label: NavbarContent.contact, onClick: scrollTo("contacts") },
  ]

  return (
    <nav className="bg-primary/90 backdrop-blur-sm shadow-md rounded-b-lg flex items-center w-full py-2 px-4 relative">
      {NavbarContent.logo && (
        <img
          className="cursor-pointer drop-shadow-md mx-3"
          src={NavbarContent.logo.url}
          alt={NavbarContent.logo.alt}
          width="50"
          height="auto"
          onClick={scrollTo("top")}
        />
      )}
      <span className="text-3xl font-medium uppercase text-white text-shadow-black mr-auto">
        {NavbarContent.title}
      </span>

      <ul className="hidden md:flex gap-4 items-center mx-4 text-2xl">
        {navItems.map(({ label, onClick }) => (
          <li key={label} className="font-medium transition-transform hover:scale-110">
            <a href="#" className="text-white no-underline" onClick={onClick}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <LanguageSwitcher />

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-2 text-white hover:bg-white/20 hover:text-white"
            aria-label="Menu"
          >
            <Menu className="size-7" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-warning border-warning/50">
          <SheetHeader className="pb-2">
            <SheetTitle className="text-white text-left uppercase tracking-wide">
              Menu
            </SheetTitle>
          </SheetHeader>
          <Separator className="bg-white/30 mb-4" />
          <nav className="flex flex-col gap-1">
            {navItems.map(({ label, onClick }) => (
              <a
                key={label}
                href="#"
                className="text-white text-xl font-medium no-underline px-2 py-3 rounded-md hover:bg-white/10 transition-colors"
                onClick={onClick}
              >
                {label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
