import { useCallback, useEffect, useRef, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel as EmblaCarousel, CarouselContent, CarouselItem, type CarouselApi } from "@/Components/ui/carousel"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  picture: Array<{ url: string; alt: string }>
}

export const Carousel = ({ picture }: CarouselProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }))

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = useCallback(() => api?.scrollNext(), [api])
  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api])

  return (
    <div className="relative">
      <div className="carousel-container">
        <EmblaCarousel opts={{ loop: true }} plugins={[autoplay.current]} setApi={setApi}>
          <CarouselContent className="-ml-0">
            {picture.map((item, index) => (
              <CarouselItem key={index} className="pl-0">
                <img src={item.url} className="carousel-img" alt={item.alt} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </EmblaCarousel>
      </div>

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
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current ? "bg-primary" : "bg-primary/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
