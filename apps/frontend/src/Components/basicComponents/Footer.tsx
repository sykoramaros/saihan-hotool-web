import { useState } from "react"
import { useLocaleQuery } from "@/hooks/use-locale-query"
import { FOOTER_CONTENT, ORDER_MODAL_CONTENT } from "@/graphql/queries"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
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
  if (!data) return null
  const o = data.OrderModalContent
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl">{o.bookButton}</DialogTitle>
      </DialogHeader>
      <Separator />
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
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
        <div className="space-y-1.5">
          <Label htmlFor="checkin">{o.checkInDate}</Label>
          <Input type="date" id="checkin" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="checkout">{o.checkOutDate}</Label>
          <Input type="date" id="checkout" />
        </div>
        <div className="col-span-full space-y-2">
          <Label>{o.roomType}</Label>
          <RadioGroup defaultValue="economy" className="gap-2">
            {[
              { value: "economy", label: o.economy },
              { value: "superior", label: o.superior },
              { value: "deluxe", label: o.deluxe },
            ].map(({ value, label }) => (
              <div key={value} className="flex items-center gap-3 border rounded-md px-3 py-2 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value} className="cursor-pointer font-normal">{label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="col-span-full flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="font-normal cursor-pointer">{o.checkMeOut}</Label>
        </div>
        <div className="col-span-full">
          <Button type="submit" variant="success" className="w-full">{o.bookButton}</Button>
        </div>
      </form>
    </>
  )
}

export const Footer = () => {
  const [showOrder, setShowOrder] = useState(false)
  const { data } = useLocaleQuery<FooterData>(FOOTER_CONTENT)

  if (!data) return null
  const f = data.FooterContent

  return (
    <>
      <div className="shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-3 p-8 bg-primary rounded-t-[20px]">
          <div className="col-span-2 sm:hidden flex justify-center mb-6">
            <Button variant="success" size="lg" className="text-2xl px-8 py-6 rounded-xl shadow-lg" onClick={() => setShowOrder(true)}>
              {f.buttonTitle}
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col text-right text-lg uppercase">
              <address className="mb-0">{f.name}</address>
              <address className="mb-0">{f.addressLine1}</address>
              <address className="mb-0">{f.addressLine2}</address>
            </div>
          </div>
          <div className="hidden sm:flex justify-center items-center">
            <Button variant="success" size="lg" className="text-2xl px-8 py-6 rounded-xl shadow-lg mx-auto" onClick={() => setShowOrder(true)}>
              {f.buttonTitle}
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col text-lg">
              <a href="#" className="text-dark no-underline uppercase mb-0 text-shadow-white">{f.dataProtections}</a>
              <p className="text-dark mb-0">{f.copyright}</p>
              <p className="text-dark mb-0">{f.allRights}</p>
            </div>
          </div>
          <hr className="col-span-2 sm:col-span-3 mx-auto my-8 w-3/4 border-dark/30" />
          <div className="col-span-2 sm:col-span-3">
            <iframe
              title="map"
              className="w-full border-2 shadow-sm rounded-lg"
              height="350"
              src="https://www.openstreetmap.org/export/embed.html?bbox=106.09213829040529%2C50.26542380510805%2C106.17917060852052%2C50.3075420423598&amp;layer=hot&amp;marker=50.28648758311509%2C106.13565444946289"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </div>
      <Dialog open={showOrder} onOpenChange={setShowOrder}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <OrderForm />
        </DialogContent>
      </Dialog>
    </>
  )
}
