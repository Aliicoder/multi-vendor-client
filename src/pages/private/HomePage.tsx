import { lazy } from "react"
import { IoCartOutline } from "react-icons/io5";
import { RiHome5Line } from "react-icons/ri";
import { HiOutlineTag } from "react-icons/hi2";
import { FaBrain } from "react-icons/fa";
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
      <div className="p-3 bottom-0 left-0  w-full  | z-40  fixed flex justify-evenly bg-white border-t 
        md:hidden">
          <div className="gap-2  | relative flex flex-col items-center" >
            <RiHome5Line className="c9"/>
            <h1 className="c5">home</h1>
          </div>
          <div className="gap-2  | flex flex-col items-center">
            <IoCartOutline className="c9" />
            <h1 className="c5">cart</h1>
            <div className='absolute z-50 flex justify-center text-xs items-center rounded-full h-4 w-4 top-[-4px] right-[-4px] bg-red-500 text-white '>
              {/* <div className=' translate-y-[1px]'>{cart?.units.length}</div> */}
            </div>
          </div>
          <div className="gap-2  | flex flex-col items-center">
            <HiOutlineTag className="c9" />
            <h1 className="c5">wishList</h1>
          </div>
          <div className="gap-2  | flex flex-col items-center">
            <FaBrain className="c9" />
            <h1 className="c5">ai</h1>
          </div>
      </div>
    </>
  )
}

export default HomePage