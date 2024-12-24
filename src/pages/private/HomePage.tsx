import BottomBar from "@/components/shared/BottomBar";
import Header from "@/components/shared/Header";
import useSegment from "@/hooks/useSegment";
import useScreenSize from "@/hooks/useScreenSize";
import { lazy } from "react"
import Footer from "@/components/shared/Footer";
const BannerCarousel = lazy(()=>import("@/components/dedicated/pages/homePage/BannerCarousel"));
const CategoriesCarousel = lazy(()=>import("@/components/dedicated/pages/homePage/CategoriesCarousel"));
const FeaturedProducts = lazy(()=>import("@/components/dedicated/pages/homePage/FeaturedProducts"));
const SellersShops = lazy(()=>import("@/components/dedicated/pages/homePage/SellersShops"));
function HomePage() { 
  const secondeSegment = useSegment(2)
  const screenSize = useScreenSize()
  return (
    <>
    {
      secondeSegment === "account" && screenSize == "sm" ?
      null
      :
      <Header /> 
    }
      <CategoriesCarousel />
      <BannerCarousel />
      <FeaturedProducts />
      <SellersShops />
      <BottomBar />

    {
      secondeSegment === "account" && screenSize == "sm" ?
      null
      :
      <Footer /> 
    }
    </>
  )
}

export default HomePage