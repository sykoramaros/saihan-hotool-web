import { useQuery, gql } from "@apollo/client"
import { useLanguage } from "../../context/LanguageProvider"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"

const ORDER_MODAL = gql`
  query GetOrderModal($locale: I18NLocaleCode!) {
    orderModal(locale: $locale) {
      documentId
      email
      address
      city
      country
      checkInDate
      checkOutDate
      roomType
      Economy
      Superior
      Deluxe
      checkMeOut
      BookButton
    }
  }
`

export const OrderModal = () => {
  const { currentLocale } = useLanguage()

  const { loading, error, data } = useQuery(ORDER_MODAL, {
    variables: { locale: currentLocale },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error.message}</p>

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-full">
        <label htmlFor="inputEmail" className="block mb-1 font-medium">
          {data.orderModal.email}
        </label>
        <input
          type="email"
          id="inputEmail"
          placeholder="@"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="col-span-full">
        <label htmlFor="inputAddress" className="block mb-1 font-medium">
          {data.orderModal.address}
        </label>
        <input
          type="text"
          id="inputAddress"
          placeholder={data.orderModal.address}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="inputCity" className="block mb-1 font-medium">
          {data.orderModal.city}
        </label>
        <input
          type="text"
          id="inputCity"
          placeholder={data.orderModal.city}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="inputCountry" className="block mb-1 font-medium">
          {data.orderModal.country}
        </label>
        <input
          type="text"
          id="inputCountry"
          placeholder={data.orderModal.country}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="inputCheckin" className="block mb-1 font-medium">
          {data.orderModal.checkInDate}
        </label>
        <input
          type="date"
          id="inputCheckin"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="inputCheckout" className="block mb-1 font-medium">
          {data.orderModal.checkOutDate}
        </label>
        <input
          type="date"
          id="inputCheckout"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="col-span-full">
        <label className="block mb-2 font-medium">{data.orderModal.roomType}</label>
        <ul className="space-y-2">
          {[
            { id: "radio1", label: data.orderModal.Economy },
            { id: "radio2", label: data.orderModal.Superior },
            { id: "radio3", label: data.orderModal.Deluxe },
          ].map(({ id, label }, i) => (
            <li key={id} className="flex items-center gap-2 border rounded px-3 py-2">
              <input
                type="radio"
                name="roomType"
                id={id}
                defaultChecked={i === 0}
              />
              <label htmlFor={id}>{label}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-full flex items-center gap-2">
        <input type="checkbox" id="checkMeOut" />
        <label htmlFor="checkMeOut">{data.orderModal.checkMeOut}</label>
      </div>
      <div className="col-span-full">
        <button
          type="submit"
          className="bg-success text-white px-6 py-2 rounded"
        >
          {data.orderModal.BookButton}
        </button>
      </div>
    </form>
  )
}
