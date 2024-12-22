import BottomBar from "@/components/shared/BottomBar";
import { lazy } from "react"
const BannerCarousel = lazy(()=>import("@/components/dedicated/pages/homePage/BannerCarousel"));
const CategoriesCarousel = lazy(()=>import("@/components/dedicated/pages/homePage/CategoriesCarousel"));
const FeaturedProducts = lazy(()=>import("@/components/dedicated/pages/homePage/FeaturedProducts"));
const SellersShops = lazy(()=>import("@/components/dedicated/pages/homePage/SellersShops"));
function HomePage() { 
  return (
    <>
      <CategoriesCarousel />
      <BannerCarousel />
      <FeaturedProducts />
      <SellersShops />
      <BottomBar />
    </>
  )
}

export default HomePage