import { Card, CardContent, CardFooter } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"

interface TableRow {
  personNumber: number
  nightPrice: number
  weekPrice: number
}

interface HorizontalScrollingContainerProps {
  image: { url: string; alt: string } | null
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
  return (
    <Card className="overflow-hidden flex flex-col gap-0 py-0">
      {image && (
        <img
          src={image.url}
          className="w-full mx-auto object-cover"
          alt={image.alt}
          style={{ maxHeight: "175px" }}
        />
      )}
      <hr className="mx-auto w-3/4 my-2" />
      <h5 className="text-3xl text-center px-2">{title}</h5>
      <hr className="mx-auto w-3/4 my-2" />
      <CardContent className="p-3">
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
                <td className="py-1">{tr.personNumber}</td>
                <td className="py-1">{tr.nightPrice}$</td>
                <td className="py-1">{tr.weekPrice}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      <CardFooter className="p-3 flex justify-center mt-auto">
        <Button className="text-xl bg-success text-white hover:bg-success/90 w-3/4 h-auto py-2">
          {bookButton}
        </Button>
      </CardFooter>
    </Card>
  )
}
