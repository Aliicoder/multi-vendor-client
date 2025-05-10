import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "@/components/buttons/CustomButton";
import useProductsPagination from "@/hooks/useProductsPagination";
import { IProduct } from "@/types/types";
import { IoIosArrowBack } from "react-icons/io";
import Header from "@/components/shared/Header";
import BottomBar from "@/components/shared/BottomBar";
import Pagination from "@/components/shared/Pagination";
import ProductCard from "@/components/cards/ProductCard";
function ProductsPage() {
  const { state } = useLocation();
  const { products, counter, handleLeft, handleRight } = useProductsPagination({
    name: state?.name,
    brand: state?.brand,
    perPage: 8,
  });
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-dvh montserrat">
      <Header className="border-b border-neutral-100 " />

      <div className="container flex flex-col mx-auto">
        <CustomButton
          onClick={() => navigate(`/`)}
          className="flex bg-slate-50 p-6 gap-3 items-center"
        >
          <IoIosArrowBack />

          {state?.name && `${state.name} search results`}
          {state?.brand && !state?.name && `${state.brand} brand`}
          {state?.title && !state?.name && !state?.brand && state.title}
        </CustomButton>

        <div className="grid grid-cols-4 gap-4 px-6">
          {products &&
            products.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
        <div className="flex justify-center p-6">
          <Pagination
            counter={counter}
            onLeftClick={handleLeft}
            onRightClick={handleRight}
          />
        </div>
      </div>
      <div className="absolute">
        <BottomBar
          className="fixed z-40 p-3 bottom-0 left-0 w-full flex justify-evenly border-t bg-white
        md:hidden"
        />
      </div>
    </div>
  );
}

export default ProductsPage;
