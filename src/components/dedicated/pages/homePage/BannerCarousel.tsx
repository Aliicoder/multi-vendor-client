import Autoplay from "embla-carousel-autoplay"
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
      className="container 
        md:mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
    <CarouselContent className="m-0">
      {IMAGES.map((url, index) => (
        <CarouselItem  className=" p-0 D | flex items-center justify-center  | overflow-hidden  aspect-triangle w-full rounded-m 
          md:rounded-md "  key={index}>
          <img className="" src={url} alt="" loading="lazy"/>
        </CarouselItem>
      ))}
    </CarouselContent>

  </Carousel>

  )
}

export default BannerCarousel