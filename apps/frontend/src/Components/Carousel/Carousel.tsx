import { useState, useEffect } from "react"

interface CarouselProps {
  picture: Array<{ url: string; alt: string }>
}

export const Carousel = ({ picture }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (picture.length <= 1) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % picture.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [picture.length])

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + picture.length) % picture.length)
  const next = () => setCurrentIndex((i) => (i + 1) % picture.length)

  return (
    <div className="carousel-container">
      <div className="relative">
        {picture.map((item, index) => (
          <div
            key={index}
            className={`${index === currentIndex ? "block" : "hidden"}`}
          >
            <div className="flex justify-center items-center">
              <img
                src={item.url}
                className="carousel-img"
                alt={item.alt}
              />
            </div>
          </div>
        ))}
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/30 p-2 rounded-full text-2xl leading-none"
          onClick={prev}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/30 p-2 rounded-full text-2xl leading-none"
          onClick={next}
          aria-label="Next"
        >
          ›
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {picture.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Slide ${index + 1}`}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
