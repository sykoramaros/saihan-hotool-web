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
import { useOrderModal } from "@/context/OrderModalContext"

interface Article {
  head: string | null
  paragraph: string | null
  image: { url: string; alt: string } | null
}

interface HomeData {
  HomeContent: {
    title: string | null
    subhead: string | null
    reserveButton: string | null
    pricingTitle: string | null
    galleryTitle: string | null
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

  const { open: openOrder } = useOrderModal()
  const roomValues = ["economy", "superior", "deluxe"]

  if (homeLoading || pricingLoading) return <Spinner />
  if (!homeData || !pricingData) return null

  const h = homeData.HomeContent
  const cards = pricingData.HorizontalScrollingContainers.docs
  const gallery = h.gallery.map((g) => g.image)

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary/20 py-16 md:py-24 px-6 text-center" id="top-page">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{h.title}</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">{h.subhead}</p>
        <Button size="lg" className="bg-primary text-foreground hover:bg-primary/80 text-lg px-8" onClick={() => openOrder()}>
          {h.reserveButton}
        </Button>
      </div>

      {/* Info sekce */}
      <section id="info" className="scroll-mt-20 py-16 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col gap-16">
          {[h.firstArticle, h.secondArticle, h.thirdArticle].filter(Boolean).map((a, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div>
                {a!.head && (
                  <h3 className="text-2xl font-bold mb-3 border-l-4 border-primary pl-4">{a!.head}</h3>
                )}
                <p className="text-lg leading-relaxed text-muted-foreground">{a!.paragraph}</p>
              </div>
              {a!.image && (
                <img
                  src={a!.image.url}
                  alt={a!.image.alt}
                  className="rounded-2xl object-cover w-full max-h-72 shadow-lg"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pricing sekce */}
      <section id="prices" className="scroll-mt-20 bg-primary/10 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 border-l-4 border-primary pl-4">{h.pricingTitle}</h2>
          <div className="flex flex-nowrap gap-4 hide-scrollbar overflow-x-auto pb-4 pr-6">
            {cards.map((item, idx) => (
              <div key={item.id} style={{ minWidth: "220px", maxWidth: "300px" }}>
                <Card className="overflow-hidden flex flex-col gap-0 py-0 shadow-md">
                  {item.image && (
                    <img src={item.image.url} alt={item.image.alt} className="w-full object-cover h-44" />
                  )}
                  <CardHeader className="px-4 pt-4 pb-2">
                    <CardTitle className="text-xl text-center">{item.title}</CardTitle>
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
                    <Button variant="success" className="w-full" onClick={() => openOrder(roomValues[idx])}>{item.bookButton}</Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel galerie */}
      <section id="carousel-gallery" className="scroll-mt-20 py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4">{h.galleryTitle}</h2>
        <div className="relative">
          <EmblaCarousel opts={{ loop: true }} plugins={[autoplay.current]} setApi={setCarouselApi}>
            <CarouselContent className="-ml-0">
              {gallery.map((img, i) => (
                <CarouselItem key={i} className="pl-0">
                  <div className="aspect-video overflow-hidden rounded-xl">
                    <img src={img.url} className="w-full h-full object-cover object-center" alt={img.alt} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </EmblaCarousel>
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
            onClick={scrollPrev}
            aria-label="Previous"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
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
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === currentSlide ? "bg-primary" : "bg-primary/30"}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
