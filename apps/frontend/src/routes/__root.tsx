import { createRootRoute, Outlet } from "@tanstack/react-router"
import { useCallback, useEffect, useState } from "react"
import { Navbar } from "@/Components/basicComponents/Navbar"
import { Footer } from "@/Components/basicComponents/Footer"
import { useLocaleQuery } from "@/hooks/use-locale-query"
import { COOKIES_MODAL_CONTENT } from "@/graphql/queries"
import { Button } from "@/Components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/Components/ui/dialog"
import { Separator } from "@/Components/ui/separator"
import { OrderModalProvider } from "@/context/OrderModalContext"

interface CookiesData {
  CookiesModalContent: {
    image: { url: string; alt: string } | null
    title: string | null
    text: string | null
    acceptButton: string | null
  }
}

export const Route = createRootRoute({
  component: Root,
})

function CookiesBanner({ onClose }: { onClose: () => void }) {
  const { data } = useLocaleQuery<CookiesData>(COOKIES_MODAL_CONTENT)
  if (!data) return null
  const c = data.CookiesModalContent
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center p-6 gap-4">
      {c.image && (
        <div className="hidden md:flex justify-center items-center">
          <img className="max-h-40 object-contain" src={c.image.url} alt={c.image.alt} />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <DialogHeader>
          <DialogTitle className="text-xl">{c.title}</DialogTitle>
          <DialogDescription>{c.text}</DialogDescription>
        </DialogHeader>
        <Separator />
        <Button variant="success" className="self-start" onClick={onClose}>
          {c.acceptButton}
        </Button>
      </div>
    </div>
  )
}

function Root() {
  const [cookiesOpen, setCookiesOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [orderRoom, setOrderRoom] = useState<string | undefined>(undefined)
  const [orderKey, setOrderKey] = useState(0)

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted")
    const now = Date.now()
    if (!accepted || now - parseInt(accepted) > 7 * 24 * 60 * 60 * 1000) {
      setCookiesOpen(true)
    }
  }, [])

  const handleCookiesClose = useCallback(() => {
    localStorage.setItem("cookiesAccepted", Date.now().toString())
    setCookiesOpen(false)
  }, [])

  const handleOpenOrder = useCallback((room?: string) => {
    setOrderRoom(room)
    setOrderKey((k) => k + 1)
    setOrderOpen(true)
  }, [])

  return (
    <OrderModalProvider onOpen={handleOpenOrder}>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
      <div className="mt-16 md:mt-24" id="contacts">
        <Footer orderOpen={orderOpen} setOrderOpen={setOrderOpen} orderRoom={orderRoom} orderKey={orderKey} />
      </div>
      <Dialog open={cookiesOpen} onOpenChange={(open) => !open && handleCookiesClose()}>
        <DialogContent
          showCloseButton={false}
          className="overflow-y-auto max-h-[90vh] p-0 rounded-3xl sm:max-w-[500px] md:max-w-[700px]"
        >
          <CookiesBanner onClose={handleCookiesClose} />
        </DialogContent>
      </Dialog>
    </OrderModalProvider>
  )
}
