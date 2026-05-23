import { useLocaleQuery } from "@/hooks/use-locale-query"
import { ORDER_MODAL_CONTENT } from "@/graphql/queries"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"

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
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-full">
        <Label htmlFor="inputEmail">{o.email}</Label>
        <Input type="email" id="inputEmail" placeholder="@" className="mt-1" />
      </div>
      <div className="col-span-full">
        <Label htmlFor="inputAddress">{o.address}</Label>
        <Input type="text" id="inputAddress" placeholder={o.address ?? ""} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="inputCity">{o.city}</Label>
        <Input type="text" id="inputCity" placeholder={o.city ?? ""} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="inputCountry">{o.country}</Label>
        <Input type="text" id="inputCountry" placeholder={o.country ?? ""} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="inputCheckin">{o.checkInDate}</Label>
        <Input type="date" id="inputCheckin" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="inputCheckout">{o.checkOutDate}</Label>
        <Input type="date" id="inputCheckout" className="mt-1" />
      </div>
      <div className="col-span-full">
        <Label className="block mb-2">{o.roomType}</Label>
        <ul className="space-y-2">
          {[
            { id: "radio1", label: o.economy },
            { id: "radio2", label: o.superior },
            { id: "radio3", label: o.deluxe },
          ].map(({ id, label }, i) => (
            <li key={id} className="flex items-center gap-2 border rounded px-3 py-2">
              <input type="radio" name="roomType" id={id} defaultChecked={i === 0} />
              <Label htmlFor={id}>{label}</Label>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-full flex items-center gap-2">
        <input type="checkbox" id="checkMeOut" />
        <Label htmlFor="checkMeOut">{o.checkMeOut}</Label>
      </div>
      <div className="col-span-full">
        <Button type="submit" className="bg-success text-white hover:bg-success/90">
          {o.bookButton}
        </Button>
      </div>
    </form>
  )
}
