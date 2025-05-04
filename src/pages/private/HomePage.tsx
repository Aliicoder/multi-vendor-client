import BottomBar from "@/components/shared/BottomBar";
import Header from "@/components/shared/Header";
import useSegment from "@/hooks/useSegment";
import useScreenSize from "@/hooks/useScreenSize";
import Footer from "@/components/shared/Footer";
import Deals from "@/components/pages/homePage/Deals";
import TopProducts from "@/components/pages/homePage/TopProducts";
import BestOffers from "@/components/pages/homePage/BestOffers";
import BannerCarousel from "@/components/pages/homePage/BannerCarousel";
import CategoriesNav from "@/components/pages/homePage/CategoriesNav";

function HomePage() {
  const secondeSegment = useSegment(2);
  const screenSize = useScreenSize();
  return (
    <>
      {secondeSegment === "account" && screenSize == "sm" ? null : (
        <Header className="" />
      )}
      <CategoriesNav />
      <BannerCarousel />
      <Deals />
      <TopProducts />
      <BestOffers />
      <BottomBar
        className="fixed z-40 p-3 bottom-0 left-0 w-full flex justify-evenly border-t bg-white
        md:hidden"
      />

      {secondeSegment === "account" && screenSize == "sm" ? null : <Footer />}
    </>
  );
}

export default HomePage;
