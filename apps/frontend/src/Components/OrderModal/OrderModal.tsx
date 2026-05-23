import { useLocaleQuery } from "@/hooks/use-locale-query"
import { ORDER_MODAL_CONTENT } from "@/graphql/queries"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Separator } from "@/Components/ui/separator"
import { DialogHeader, DialogTitle } from "@/Components/ui/dialog"

interface OrderModalData {
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

export const OrderModal = () => {
  const { data, loading } = useLocaleQuery<OrderModalData>(ORDER_MODAL_CONTENT)

  if (loading) return <LoadingSpinner />
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
          <Label htmlFor="inputEmail">{o.email}</Label>
          <Input type="email" id="inputEmail" placeholder="@" />
        </div>
        <div className="col-span-full space-y-1.5">
          <Label htmlFor="inputAddress">{o.address}</Label>
          <Input type="text" id="inputAddress" placeholder={o.address ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="inputCity">{o.city}</Label>
          <Input type="text" id="inputCity" placeholder={o.city ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="inputCountry">{o.country}</Label>
          <Input type="text" id="inputCountry" placeholder={o.country ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="inputCheckin">{o.checkInDate}</Label>
          <Input type="date" id="inputCheckin" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="inputCheckout">{o.checkOutDate}</Label>
          <Input type="date" id="inputCheckout" />
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
          <input type="checkbox" id="checkMeOut" className="size-4 rounded" />
          <Label htmlFor="checkMeOut" className="font-normal cursor-pointer">{o.checkMeOut}</Label>
        </div>
        <div className="col-span-full">
          <Button type="submit" className="w-full bg-success text-white hover:bg-success/90">
            {o.bookButton}
          </Button>
        </div>
      </form>
    </>
  )
}
