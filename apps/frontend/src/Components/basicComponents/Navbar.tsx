import { Menu } from "lucide-react"
import { useLocaleQuery } from "@/hooks/use-locale-query"
import { NAVBAR_CONTENT } from "@/graphql/queries"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"

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
    <nav className="navbar-container bg-primary flex justify-evenly items-center w-full py-2 rounded-b-lg relative">
      {NavbarContent.logo && (
        <div>
          <img
            className="logo-img mx-3"
            src={NavbarContent.logo.url}
            alt={NavbarContent.logo.alt}
            width="50"
            height="auto"
          />
        </div>
      )}
      <span className="text-3xl font-medium uppercase text-white text-shadow-black">
        {NavbarContent.title}
      </span>
      <ul className="navbar-menu ms-auto me-3 gap-3 lg:gap-4 my-auto md:flex text-2xl">
        {navItems.map(({ label, onClick }) => (
          <li key={label} className="navbar-item font-medium my-auto">
            <a href="#" className="nav-link text-white no-underline" onClick={onClick}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-auto mr-3 text-white hover:bg-white/20 hover:text-white"
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
                className="navbar-item nav-link text-white text-xl font-medium no-underline px-2 py-3 rounded-md hover:bg-white/10 transition-colors"
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
