import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"

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
    <Card className="overflow-hidden flex flex-col gap-0 py-0 shadow-md">
      {image && (
        <img
          src={image.url}
          className="w-full object-cover"
          alt={image.alt}
          style={{ height: "175px" }}
        />
      )}
      <CardHeader className="px-4 pt-4 pb-2">
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="px-4 py-3">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="text-muted-foreground">
              <th className="pb-2 font-medium">{tablePersonTitle}</th>
              <th className="pb-2 font-medium">{tableNightTitle}</th>
              <th className="pb-2 font-medium">{tableWeekTitle}</th>
            </tr>
          </thead>
          <tbody>
            {tableRow.map((tr, index) => (
              <tr key={index} className="border-t last:border-b">
                <td className="py-2">{tr.personNumber}</td>
                <td className="py-2 font-medium">{tr.nightPrice}$</td>
                <td className="py-2 font-medium">{tr.weekPrice}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      <Separator />
      <CardFooter className="px-4 py-3">
        <Button variant="success" className="w-full">
          {bookButton}
        </Button>
      </CardFooter>
    </Card>
  )
}
