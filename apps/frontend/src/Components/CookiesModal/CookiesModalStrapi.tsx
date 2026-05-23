import { useLocaleQuery } from "@/hooks/use-locale-query"
import { COOKIES_MODAL_CONTENT } from "@/graphql/queries"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"
import { Button } from "@/Components/ui/button"
import { DialogHeader, DialogTitle, DialogDescription } from "@/Components/ui/dialog"
import { Separator } from "@/Components/ui/separator"

interface CookiesModalData {
  CookiesModalContent: {
    image: { url: string; alt: string } | null
    title: string | null
    text: string | null
    acceptButton: string | null
  }
}

interface CookiesModalStrapiProps {
  onClose: () => void
}

export const CookiesModalStrapi = ({ onClose }: CookiesModalStrapiProps) => {
  const { data, loading } = useLocaleQuery<CookiesModalData>(COOKIES_MODAL_CONTENT)

  if (loading) return <LoadingSpinner />
  if (!data) return null

  const c = data.CookiesModalContent

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center p-6 gap-4">
      <div className="hidden md:flex justify-center items-center">
        {c.image && (
          <img
            className="max-h-40 object-contain"
            src={c.image.url}
            alt={c.image.alt}
          />
        )}
      </div>
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
