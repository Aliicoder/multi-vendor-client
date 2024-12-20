import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from "@/components/ui/carousel"
import { useRef } from "react"
const IMAGES = [
  "/banners/IMG2.avif","/banners/IMG2.avif","/banners/IMG2.avif"
]

function BannerCarousel() {
  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  return (
    <Carousel
    plugins={[plugin.current]}
    className="mt-2  container w-full
      md:mx-auto"
    onMouseEnter={plugin.current.stop}
    onMouseLeave={plugin.current.reset}
  >
    <CarouselContent className="mx-12 ">
      {IMAGES.map((url, index) => (
        <CarouselItem className="" key={index}>
          <Card>
            <CardContent className="p-0 | flex aspect-triangle overflow-hidden  items-center justify-center  
              md:rounded-md ">
              <img className="object-contain" src={url} alt="" loading="lazy"/>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>

  </Carousel>

  )
}

export default BannerCarousel