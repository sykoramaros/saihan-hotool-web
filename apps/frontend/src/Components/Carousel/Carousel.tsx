import { useCallback, useEffect, useRef, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel as EmblaCarousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/Components/ui/carousel"

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

  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api])

  return (
    <div className="carousel-container">
      <EmblaCarousel
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        setApi={setApi}
      >
        <CarouselContent className="-ml-0">
          {picture.map((item, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="flex justify-center items-center">
                <img src={item.url} className="carousel-img" alt={item.alt} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 text-white bg-black/30 border-0 hover:bg-black/50 hover:text-white" />
        <CarouselNext className="right-3 text-white bg-black/30 border-0 hover:bg-black/50 hover:text-white" />

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Slide ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === current ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </EmblaCarousel>
    </div>
  )
}
