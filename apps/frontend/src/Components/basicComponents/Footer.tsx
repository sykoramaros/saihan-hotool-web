import { useState } from "react"
import { useLocaleQuery } from "@/hooks/use-locale-query"
import { FOOTER_CONTENT } from "@/graphql/queries"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { OrderModal } from "../OrderModal/OrderModal"
import { Button } from "@/Components/ui/button"
import { Dialog, DialogContent } from "@/Components/ui/dialog"

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

export const Footer = () => {
  const [showOrderModal, setShowOrderModal] = useState(false)
  const { data, loading } = useLocaleQuery<FooterData>(FOOTER_CONTENT)

  if (loading) return <LoadingSpinner />
  if (!data) return null

  const { FooterContent } = data

  return (
    <>
      <div className="shadow-md">
        <div className="footer-container grid grid-cols-2 sm:grid-cols-3 p-8 bg-primary rounded-t-[20px]">
          <div className="col-span-2 sm:hidden flex justify-center mb-6">
            <Button
              size="lg"
              className="text-white bg-success hover:bg-success/90 text-2xl px-8 py-6 rounded-xl shadow-lg"
              onClick={() => setShowOrderModal(true)}
            >
              {FooterContent.buttonTitle}
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col text-right text-lg uppercase">
              <address className="mb-0">{FooterContent.name}</address>
              <address className="mb-0">{FooterContent.addressLine1}</address>
              <address className="mb-0">{FooterContent.addressLine2}</address>
            </div>
          </div>
          <div className="hidden sm:flex justify-center items-center">
            <Button
              size="lg"
              className="text-white bg-success hover:bg-success/90 text-2xl px-8 py-6 rounded-xl shadow-lg mx-auto"
              onClick={() => setShowOrderModal(true)}
            >
              {FooterContent.buttonTitle}
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col text-lg">
              <a href="#" className="text-dark no-underline uppercase mb-0 text-shadow-white">
                {FooterContent.dataProtections}
              </a>
              <p className="text-dark mb-0">{FooterContent.copyright}</p>
              <p className="text-dark mb-0">{FooterContent.allRights}</p>
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
      <Dialog open={showOrderModal} onOpenChange={setShowOrderModal}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <OrderModal />
        </DialogContent>
      </Dialog>
    </>
  )
}
