import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "@/components/buttons/CustomButton";
import useProductsPagination from "@/hooks/useProductsPagination";
import { IProduct } from "@/types/types";
import { IoIosArrowBack } from "react-icons/io";
import Header from "@/components/shared/Header";
import Pagination from "@/components/shared/Pagination";
import ProductCard from "@/components/cards/ProductCard";
function ShopProductsPage() {
  const { shopName } = useParams();
  const { products, counter, handleLeft, handleRight } = useProductsPagination({
    perPage: 8,
    shopName: shopName,
  });
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-dvh montserrat mx-auto">
      <Header className="border-b border-neutral-100" />
      <div className="container flex flex-col mx-auto">
        <CustomButton
          onClick={() => navigate(`/`)}
          className="flex bg-slate-50 p-6 gap-3 items-center"
        >
          <IoIosArrowBack />
          {shopName}
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
    </div>
  );
}

export default ShopProductsPage;
{
  /* <div className="absolute">
<BottomBar />
</div> */
}
