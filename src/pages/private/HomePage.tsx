import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Deals from "@/components/pages/homePage/Deals";
import TopProducts from "@/components/pages/homePage/TopProducts";
import BannerCarousel from "@/components/pages/homePage/BannerCarousel";
import CategoriesNav from "@/components/pages/homePage/CategoriesNav";
import NewArrivals from "@/components/pages/homePage/NewArrivals";

function HomePage() {
  return (
    <>
      <Header />
      <CategoriesNav />
      <BannerCarousel />
      <Deals />
      <TopProducts />
      <NewArrivals />

      <Footer />
    </>
  );
}

export default HomePage;
