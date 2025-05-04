import { useLocation, useNavigate } from "react-router-dom";
import CustomButton from "@/components/buttons/CustomButton";
import useProductsPagination from "@/hooks/useProductsPagination";
import { IProduct } from "@/types/types";
import { IoIosArrowBack } from "react-icons/io";
import Header from "@/components/shared/Header";
import Pagination from "@/components/shared/Pagination";
import ProductCard from "@/components/cards/ProductCard";
function CategoryProductsPage() {
  const { state } = useLocation();
  console.log("State ", state);
  const { products, counter, handleLeft, handleRight } = useProductsPagination({
    category: state.category,
    perPage: 8,
  });
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen montserrat">
      <Header />
      <div className="container flex flex-col basis-full mx-auto">
        <CustomButton
          onClick={() => navigate(`/`)}
          className="flex bg-slate-50 p-6 w-fit gap-3 items-center"
        >
          <IoIosArrowBack />

          {state?.category}
        </CustomButton>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 px-6">
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
    </div>
  );
}

export default CategoryProductsPage;
