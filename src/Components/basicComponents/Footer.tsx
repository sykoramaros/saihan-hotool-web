import { useState } from "react"
import { useQuery, gql } from "@apollo/client"
import { useLanguage } from "../../context/LanguageProvider"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { OrderModal } from "../OrderModal/OrderModal"

const FOOTER_CONTENT = gql`
  query GetFooterContent($locale: I18NLocaleCode!) {
    footer(locale: $locale) {
      ButtonTitle
      Name
      AddressLine1
      AddressLine2
      DataProtections
      Copyright
      AllRights
    }
  }
`

export const Footer = () => {
  const { currentLocale } = useLanguage()
  const [showOrderModal, setShowOrderModal] = useState(false)

  const { loading, error, data } = useQuery(FOOTER_CONTENT, {
    variables: { locale: currentLocale },
  })

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <div className="shadow-md">
        <div className="footer-container grid grid-cols-2 sm:grid-cols-3 p-8 bg-primary rounded-t-[20px]">
          {/* Mobile book button */}
          <div className="col-span-2 sm:hidden flex justify-center mb-6">
            <button
              className="text-white text-4xl bg-success py-2 px-4 rounded-lg"
              onClick={() => setShowOrderModal(true)}
            >
              {data.footer.ButtonTitle}
            </button>
          </div>
          {/* Address */}
          <div className="flex justify-center items-center">
            <div className="flex flex-col text-right text-lg uppercase">
              <address className="mb-0">{data.footer.Name}</address>
              <address className="mb-0">{data.footer.AddressLine1}</address>
              <address className="mb-0">{data.footer.AddressLine2}</address>
            </div>
          </div>
          {/* Desktop book button */}
          <div className="hidden sm:flex justify-center items-center">
            <button
              className="text-white text-4xl bg-success border-4 border-success py-2 px-4 rounded-lg mx-auto"
              onClick={() => setShowOrderModal(true)}
            >
              {data.footer.ButtonTitle}
            </button>
          </div>
          {/* Links */}
          <div className="flex justify-center items-center">
            <div className="flex flex-col text-lg">
              <a href="#" className="text-dark no-underline uppercase mb-0 text-shadow-white">
                {data.footer.DataProtections}
              </a>
              <p className="text-dark mb-0">{data.footer.Copyright}</p>
              <p className="text-dark mb-0">{data.footer.AllRights}</p>
            </div>
          </div>
          <hr className="col-span-2 sm:col-span-3 mx-auto my-8 w-3/4 border-dark/30" />
          {/* Map */}
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
      {showOrderModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowOrderModal(false)}
        >
          <div
            className="order-modal border-2 border-info rounded-2xl bg-primary"
            onClick={(e) => e.stopPropagation()}
          >
            <OrderModal />
          </div>
        </div>
      )}
    </>
  )
}
