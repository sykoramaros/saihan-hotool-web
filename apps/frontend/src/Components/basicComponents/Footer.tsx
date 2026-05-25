import { useState } from "react"
import { useLocaleQuery } from "@/hooks/use-locale-query"
import { FOOTER_CONTENT, ORDER_MODAL_CONTENT } from "@/graphql/queries"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Separator } from "@/Components/ui/separator"

interface FooterData {
  FooterContent: {
    buttonTitle: string | null
    name: string | null
    addressLine1: string | null
    addressLine2: string | null
    dataProtections: string | null
    copyright: string | null
    allRights: string | null
  }
}

interface OrderData {
  OrderModalContent: {
    email: string | null
    address: string | null
    city: string | null
    country: string | null
    checkInDate: string | null
    checkOutDate: string | null
    roomType: string | null
    economy: string | null
    superior: string | null
    deluxe: string | null
    checkMeOut: string | null
    bookButton: string | null
  }
}

function OrderForm() {
  const { data } = useLocaleQuery<OrderData>(ORDER_MODAL_CONTENT)
  const [step, setStep] = useState(1)
  const [room, setRoom] = useState("superior")

  if (!data) return (
    <DialogHeader>
      <DialogTitle>Rezervace</DialogTitle>
    </DialogHeader>
  )
  const o = data.OrderModalContent

  const rooms = [
    { value: "economy", label: o.economy ?? "Economy", price: "od 75 $", img: "🏕️" },
    { value: "superior", label: o.superior ?? "Superior", price: "od 105 $", img: "⛺" },
    { value: "deluxe", label: o.deluxe ?? "Deluxe", price: "od 155 $", img: "🛕" },
  ]

  return (
    <>
      {/* Progress */}
      <DialogHeader className="pb-0">
        <div className="flex items-center gap-0 bg-muted/40 rounded-xl px-6 py-3 mb-2">
          <div className={`flex items-center gap-2 text-sm font-semibold ${step === 1 ? "text-primary" : "text-muted-foreground"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? "bg-primary text-dark" : "bg-muted-foreground/30 text-muted-foreground"}`}>1</span>
            <DialogTitle className="text-sm font-semibold">{o.roomType ?? "Výběr jurty"}</DialogTitle>
          </div>
          <div className="flex-1 h-px bg-border mx-4" />
          <div className={`flex items-center gap-2 text-sm font-semibold ${step === 2 ? "text-primary" : "text-muted-foreground"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? "bg-primary text-dark" : "bg-muted-foreground/30 text-muted-foreground"}`}>2</span>
            Kontakt
          </div>
        </div>
      </DialogHeader>

      <Separator />

      {step === 1 ? (
        <div className="pt-2">
          {/* Room cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {rooms.map(r => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRoom(r.value)}
                className={`rounded-xl border-2 p-4 text-center transition-all cursor-pointer ${room === r.value ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"}`}
              >
                <div className="text-3xl mb-2">{r.img}</div>
                <div className="font-bold text-sm">{r.label}</div>
                <div className="text-xs text-muted-foreground">{r.price}</div>
              </button>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-1.5">
              <Label htmlFor="checkin">{o.checkInDate}</Label>
              <Input type="date" id="checkin" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="checkout">{o.checkOutDate}</Label>
              <Input type="date" id="checkout" />
            </div>
          </div>

          <Button className="w-full bg-primary text-dark hover:bg-primary/80 font-bold" onClick={() => setStep(2)}>
            Pokračovat →
          </Button>
        </div>
      ) : (
        <div className="pt-2">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-full space-y-1.5">
              <Label htmlFor="email">{o.email}</Label>
              <Input type="email" id="email" placeholder="@" />
            </div>
            <div className="col-span-full space-y-1.5">
              <Label htmlFor="address">{o.address}</Label>
              <Input type="text" id="address" placeholder={o.address ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city">{o.city}</Label>
              <Input type="text" id="city" placeholder={o.city ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="country">{o.country}</Label>
              <Input type="text" id="country" placeholder={o.country ?? ""} />
            </div>
            <div className="col-span-full flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="font-normal cursor-pointer">{o.checkMeOut}</Label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>← Zpět</Button>
            <Button type="submit" className="flex-1 bg-primary text-dark hover:bg-primary/80 font-bold">{o.bookButton}</Button>
          </div>
        </div>
      )}
    </>
  )
}

export const Footer = ({ orderOpen, setOrderOpen }: { orderOpen: boolean; setOrderOpen: (v: boolean) => void }) => {
  const { data } = useLocaleQuery<FooterData>(FOOTER_CONTENT)
  if (!data) return null
  const f = data.FooterContent

  return (
    <>
      <div className="bg-dark text-white">
        <div className="max-w-5xl mx-auto px-8 pt-12 pb-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-bold uppercase tracking-widest text-xs mb-4">Rezervace</p>
            <p className="text-white/60 mb-6 text-sm leading-relaxed">
              {f.name} · {f.addressLine1} · {f.addressLine2}
            </p>
            <Button
              size="lg"
              className="bg-primary text-dark hover:bg-primary/80 font-bold text-lg px-8 py-6 rounded-xl"
              onClick={() => setOrderOpen(true)}
            >
              {f.buttonTitle}
            </Button>
          </div>
          <div>
            <iframe
              title="map"
              className="w-full rounded-xl"
              height="260"
              src="https://www.openstreetmap.org/export/embed.html?bbox=106.09213829040529%2C50.26542380510805%2C106.17917060852052%2C50.3075420423598&amp;layer=hot&amp;marker=50.28648758311509%2C106.13565444946289"
              style={{ border: "none" }}
            />
          </div>
        </div>
        <div className="border-t border-white/10 max-w-5xl mx-auto px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/40 text-xs">{f.copyright} · {f.allRights}</p>
          <a href="#" className="text-white/40 no-underline hover:text-primary text-xs transition-colors">
            {f.dataProtections}
          </a>
        </div>
      </div>

      <Dialog open={orderOpen} onOpenChange={(open) => { setOrderOpen(open) }}>
        <DialogContent className="sm:max-w-lg" onInteractOutside={() => setOrderOpen(false)}>
          <OrderForm />
        </DialogContent>
      </Dialog>
    </>
  )
}
