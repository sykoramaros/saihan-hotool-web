import { useLocaleQuery } from "@/hooks/use-locale-query"
import { HOME_CONTENT, PRICING_CONTENT } from "@/graphql/queries"
import { LeftPictureArticle } from "@/Components/LeftPictureArticle/LeftPictureArticle"
import { RightPictureArticle } from "@/Components/RightPictureArticle/RightPictureArticle"
import { Carousel } from "@/Components/Carousel/Carousel"
import { HorizontalScrollingContainer } from "@/Components/HorizontalScrollingContainer/HorizontalScrollingContainer"
import { LoadingSpinner } from "@/Components/LoadingSpinner/LoadingSpinner"

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
  HorizontalScrollingContainers: {
    docs: PriceCard[]
  }
}

export const Home = () => {
  const { data: homeData, loading: homeLoading } = useLocaleQuery<HomeData>(HOME_CONTENT)
  const { data: pricingData, loading: pricingLoading } = useLocaleQuery<PricingData>(PRICING_CONTENT)

  if (homeLoading || pricingLoading) return <LoadingSpinner />
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

      <section id="info" className="scroll-mt-20 my-20">
        <div className="flex flex-col gap-20 mx-auto lg:mx-20 mt-4 p-3">
          {h.firstArticle?.image && (
            <RightPictureArticle
              paragraph={h.firstArticle.paragraph ?? ""}
              src={h.firstArticle.image.url}
            />
          )}
          {h.secondArticle?.image && (
            <LeftPictureArticle
              paragraph={h.secondArticle.paragraph ?? ""}
              src={h.secondArticle.image.url}
            />
          )}
          {h.thirdArticle?.image && (
            <RightPictureArticle
              paragraph={h.thirdArticle.paragraph ?? ""}
              src={h.thirdArticle.image.url}
            />
          )}
        </div>
      </section>

      <br />

      <section id="prices" className="scroll-mt-20 flex justify-center">
        <div
          className="flex flex-nowrap gap-3 hide-scrollbar justify-center items-center bg-primary py-4 px-5 overflow-x-auto overflow-y-hidden w-screen"
          style={{ marginBottom: "13rem" }}
        >
          {cards.map((item) => (
            <div key={item.id} style={{ minWidth: "250px", maxWidth: "300px" }}>
              <HorizontalScrollingContainer
                image={item.image}
                title={item.title ?? ""}
                tablePersonTitle={item.tablePersonTitle ?? ""}
                tableNightTitle={item.tableNightPriceTitle ?? ""}
                tableWeekTitle={item.tableWeekPriceTitle ?? ""}
                tableRow={item.tableRow}
                bookButton={item.bookButton ?? ""}
              />
            </div>
          ))}
        </div>
      </section>

      <section id="carousel-gallery" className="scroll-mt-20">
        <div className="flex justify-center items-center">
          <div className="w-full sm:w-11/12">
            <Carousel picture={gallery} />
          </div>
        </div>
      </section>
    </div>
  )
}
