import { useLocaleQuery } from "@/hooks/use-locale-query"
import { ORDER_MODAL_CONTENT } from "@/graphql/queries"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"

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
        <label htmlFor="inputEmail" className="block mb-1 font-medium">{o.email}</label>
        <input type="email" id="inputEmail" placeholder="@" className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>
      <div className="col-span-full">
        <label htmlFor="inputAddress" className="block mb-1 font-medium">{o.address}</label>
        <input type="text" id="inputAddress" placeholder={o.address ?? ""} className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>
      <div>
        <label htmlFor="inputCity" className="block mb-1 font-medium">{o.city}</label>
        <input type="text" id="inputCity" placeholder={o.city ?? ""} className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>
      <div>
        <label htmlFor="inputCountry" className="block mb-1 font-medium">{o.country}</label>
        <input type="text" id="inputCountry" placeholder={o.country ?? ""} className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>
      <div>
        <label htmlFor="inputCheckin" className="block mb-1 font-medium">{o.checkInDate}</label>
        <input type="date" id="inputCheckin" className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>
      <div>
        <label htmlFor="inputCheckout" className="block mb-1 font-medium">{o.checkOutDate}</label>
        <input type="date" id="inputCheckout" className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>
      <div className="col-span-full">
        <label className="block mb-2 font-medium">{o.roomType}</label>
        <ul className="space-y-2">
          {[
            { id: "radio1", label: o.economy },
            { id: "radio2", label: o.superior },
            { id: "radio3", label: o.deluxe },
          ].map(({ id, label }, i) => (
            <li key={id} className="flex items-center gap-2 border rounded px-3 py-2">
              <input type="radio" name="roomType" id={id} defaultChecked={i === 0} />
              <label htmlFor={id}>{label}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-full flex items-center gap-2">
        <input type="checkbox" id="checkMeOut" />
        <label htmlFor="checkMeOut">{o.checkMeOut}</label>
      </div>
      <div className="col-span-full">
        <button type="submit" className="bg-success text-white px-6 py-2 rounded">
          {o.bookButton}
        </button>
      </div>
    </form>
  )
}
