import { useLocaleQuery } from "@/hooks/use-locale-query"
import { COOKIES_MODAL_CONTENT } from "@/graphql/queries"
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner"

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
    <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-gray-100 p-8">
      <div className="hidden md:flex justify-center items-center">
        {c.image && (
          <img
            className="max-h-48 object-contain"
            src={c.image.url}
            alt={c.image.alt}
          />
        )}
      </div>
      <div className="text-center md:text-start px-5 pt-3">
        <h1 className="text-2xl font-semibold">{c.title}</h1>
        <p>{c.text}</p>
        <button
          className="bg-success text-white text-lg mt-2 px-5 py-2 rounded"
          onClick={onClose}
        >
          {c.acceptButton}
        </button>
      </div>
    </div>
  )
}
