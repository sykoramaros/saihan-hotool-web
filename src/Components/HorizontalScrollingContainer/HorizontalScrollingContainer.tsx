import { useBaseUrl } from "../../context/BaseUrlProvider"

interface TableRow {
  id: string
  PersonNumber: number
  NightPrice: number
  WeekPrice: number
}

interface HorizontalScrollingContainerProps {
  image: { url: string; alternativeText: string } | null
  title: string
  tablePersonTitle: string
  tableNightTitle: string
  tableWeekTitle: string
  tableRow: TableRow[]
  bookButton: string
}

export const HorizontalScrollingContainer = ({
  image,
  title,
  tablePersonTitle,
  tableNightTitle,
  tableWeekTitle,
  tableRow,
  bookButton,
}: HorizontalScrollingContainerProps) => {
  const BASE_URL = useBaseUrl()

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden flex flex-col">
      {image && (
        <img
          src={BASE_URL + image.url}
          className="w-full mx-auto object-cover"
          alt={image.alternativeText}
          style={{ maxHeight: "175px" }}
        />
      )}
      <hr className="mx-auto w-3/4 my-2" />
      <h5 className="text-3xl text-center px-2">{title}</h5>
      <hr className="mx-auto w-3/4 my-2" />
      <div className="p-3">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-1">{tablePersonTitle}</th>
              <th className="py-1">{tableNightTitle}</th>
              <th className="py-1">{tableWeekTitle}</th>
            </tr>
          </thead>
          <tbody>
            {tableRow.map((tr, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="py-1">{tr.PersonNumber}</td>
                <td className="py-1">{tr.NightPrice}$</td>
                <td className="py-1">{tr.WeekPrice}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3 flex justify-center mt-auto">
        <button className="text-xl bg-success text-white w-3/4 py-2 rounded-lg">
          {bookButton}
        </button>
      </div>
    </div>
  )
}
