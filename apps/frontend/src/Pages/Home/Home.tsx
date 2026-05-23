import { useCallback, useEffect, useRef, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { useLocaleQuery } from "@/hooks/use-locale-query"
import { HOME_CONTENT, PRICING_CONTENT } from "@/graphql/queries"
import { Spinner } from "@/Components/ui/spinner"
import { Carousel as EmblaCarousel, CarouselContent, CarouselItem, type CarouselApi } from "@/Components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Button } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Article {
  head: string | null
  paragraph: string | null
  image: { url: string; alt: string } | null
}

interface HomeData {
  HomeContent: {
    title: string | null
    subhead: string | null
    firstArticle: Article | null
    secondArticle: Article | null
    thirdArticle: Article | null
    gallery: { image: { url: string; alt: string } }[]
  }
}

interface PriceCard {
  id: string
  image: { url: string; alt: string } | null
  title: string | null
  tablePersonTitle: string | null
  tableNightPriceTitle: string | null
  tableWeekPriceTitle: string | null
  tableRow: { personNumber: number; nightPrice: number; weekPrice: number }[]
  bookButton: string | null
}

interface PricingData {
  HorizontalScrollingContainers: { docs: PriceCard[] }
}

export const Home = () => {
  const { data: homeData, loading: homeLoading } = useLocaleQuery<HomeData>(HOME_CONTENT)
  const { data: pricingData, loading: pricingLoading } = useLocaleQuery<PricingData>(PRICING_CONTENT)

  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideCount, setSlideCount] = useState(0)
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }))

  useEffect(() => {
    if (!carouselApi) return
    setSlideCount(carouselApi.scrollSnapList().length)
    setCurrentSlide(carouselApi.selectedScrollSnap())
    carouselApi.on("select", () => setCurrentSlide(carouselApi.selectedScrollSnap()))
  }, [carouselApi])

  const scrollPrev = useCallback(() => carouselApi?.scrollPrev(), [carouselApi])
  const scrollNext = useCallback(() => carouselApi?.scrollNext(), [carouselApi])
  const scrollTo = useCallback((i: number) => carouselApi?.scrollTo(i), [carouselApi])

  if (homeLoading || pricingLoading) return <Spinner />
  if (!homeData || !pricingData) return null

  const h = homeData.HomeContent
  const cards = pricingData.HorizontalScrollingContainers.docs
  const gallery = h.gallery.map((g) => g.image)

  return (
    <div>
      <h1 className="text-center mt-20 text-4xl md:text-6xl font-bold text-shadow-black" id="top-page">
        {h.title}
      </h1>
      <h2 className="text-center text-xl md:text-2xl text-muted-foreground mt-2">{h.subhead}</h2>
      <hr className="mx-auto w-3/4 my-8" />

      {/* Info sekce — střídající se articles s obrázkem */}
      <section id="info" className="scroll-mt-20 my-20">
        <div className="flex flex-col gap-20 mx-auto lg:mx-20 mt-4 p-3">
          {h.firstArticle?.image && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col justify-center">
                <p className="text-xl text-center sm:text-start">{h.firstArticle.paragraph}</p>
              </div>
              <div className="flex justify-center items-center px-10">
                <img src={h.firstArticle.image.url} alt={h.firstArticle.image.alt} width={300} />
              </div>
            </div>
          )}
          {h.secondArticle?.image && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="hidden sm:flex justify-center items-center">
                <img src={h.secondArticle.image.url} alt={h.secondArticle.image.alt} width={300} />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xl text-center sm:text-start">{h.secondArticle.paragraph}</p>
              </div>
              <div className="sm:hidden flex justify-center items-center px-10">
                <img src={h.secondArticle.image.url} alt={h.secondArticle.image.alt} width={300} />
              </div>
            </div>
          )}
          {h.thirdArticle?.image && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col justify-center">
                <p className="text-xl text-center sm:text-start">{h.thirdArticle.paragraph}</p>
              </div>
              <div className="flex justify-center items-center px-10">
                <img src={h.thirdArticle.image.url} alt={h.thirdArticle.image.alt} width={300} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing sekce */}
      <section id="prices" className="scroll-mt-20 flex justify-center">
        <div
          className="flex flex-nowrap gap-3 hide-scrollbar justify-center items-center bg-primary py-4 px-5 overflow-x-auto overflow-y-hidden w-screen"
          style={{ marginBottom: "13rem" }}
        >
          {cards.map((item) => (
            <div key={item.id} style={{ minWidth: "250px", maxWidth: "300px" }}>
              <Card className="overflow-hidden flex flex-col gap-0 py-0 shadow-md">
                {item.image && (
                  <img src={item.image.url} alt={item.image.alt} className="w-full object-cover" style={{ height: "175px" }} />
                )}
                <CardHeader className="px-4 pt-4 pb-2">
                  <CardTitle className="text-2xl text-center">{item.title}</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="px-4 py-3">
                  <table className="w-full text-center text-sm">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="pb-2 font-medium">{item.tablePersonTitle}</th>
                        <th className="pb-2 font-medium">{item.tableNightPriceTitle}</th>
                        <th className="pb-2 font-medium">{item.tableWeekPriceTitle}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.tableRow.map((row, i) => (
                        <tr key={i} className="border-t last:border-b">
                          <td className="py-2">{row.personNumber}</td>
                          <td className="py-2 font-medium">{row.nightPrice}$</td>
                          <td className="py-2 font-medium">{row.weekPrice}$</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
                <Separator />
                <CardFooter className="px-4 py-3">
                  <Button variant="success" className="w-full">{item.bookButton}</Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Carousel galerie */}
      <section id="carousel-gallery" className="scroll-mt-20">
        <div className="flex justify-center items-center">
          <div className="w-full sm:w-11/12 relative">
              <EmblaCarousel opts={{ loop: true }} plugins={[autoplay.current]} setApi={setCarouselApi}>
                <CarouselContent className="-ml-0">
                  {gallery.map((img, i) => (
                    <CarouselItem key={i} className="pl-0">
                      <img src={img.url} className="w-full h-auto object-cover object-center" alt={img.alt} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </EmblaCarousel>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
              onClick={scrollPrev}
              aria-label="Previous"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
              onClick={scrollNext}
              aria-label="Next"
            >
              <ChevronRight className="size-6" />
            </button>
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: slideCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors ${i === currentSlide ? "bg-primary" : "bg-primary/30"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
