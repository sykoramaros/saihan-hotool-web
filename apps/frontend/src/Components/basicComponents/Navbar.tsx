import { Menu } from "lucide-react"
import { useLocaleQuery } from "@/hooks/use-locale-query"
import { NAVBAR_CONTENT } from "@/graphql/queries"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { LocaleSwitcher } from "@/Components/LanguageSwitcher/LocaleSwitcher"

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
  if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return }
  const el = document.getElementById(id)
  if (!el) return
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" })
}

export const Navbar = () => {
  const { data } = useLocaleQuery<NavbarData>(NAVBAR_CONTENT)
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
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-primary/30 flex items-center w-full py-2 px-4 relative">
      {NavbarContent.logo && (
        <img
          className="cursor-pointer mx-3"
          src={NavbarContent.logo.url}
          alt={NavbarContent.logo.alt}
          width="50"
          onClick={scrollTo("top")}
        />
      )}

      <ul className="hidden md:flex gap-6 items-center text-lg font-medium absolute left-1/2 -translate-x-1/2">
        {navItems.map(({ label, onClick }) => (
          <li key={label}>
            <a
              href="#"
              className="text-foreground no-underline hover:text-primary transition-colors pb-0.5 border-b-2 border-transparent hover:border-primary"
              onClick={onClick}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      <LocaleSwitcher className="ml-auto [&_button]:text-foreground [&_button]:hover:bg-primary/10" />

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden ml-2 text-foreground hover:bg-primary/10" aria-label="Menu">
            <Menu className="size-7" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="bg-dark border-dark">
          <SheetHeader className="pb-2">
            <SheetTitle className="text-white text-left uppercase tracking-wide">Menu</SheetTitle>
          </SheetHeader>
          <Separator className="bg-white/30 mb-4" />
          <nav className="flex flex-col gap-1">
            {navItems.map(({ label, onClick }) => (
              <a key={label} href="#" className="text-white text-xl font-medium no-underline px-2 py-3 rounded-md hover:bg-white/10 transition-colors" onClick={onClick}>
                {label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
