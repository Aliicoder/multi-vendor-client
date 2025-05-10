import { useNavigate } from "react-router-dom";
import { IProduct } from "@/types/types";
import { BsArrowRightShort } from "react-icons/bs";
import CustomButton from "@/components/buttons/CustomButton";
import { useGetPaginatedProductsQQuery } from "@/store/apiSlices/productSlice";
import ProductCard from "@/components/cards/ProductCard";
function TopProducts() {
  const { data: response } = useGetPaginatedProductsQQuery({
    outOfStock: false,
    discount: {
      lte: 0,
    },
    curPage: 1,
    perPage: 8,
  });
  const navigate = useNavigate();
  return (
    <section className="py-5">
      <div className="container flex flex-col mx-auto">
        <div className="flex justify-between p-6 items-center">
          <h1 className="font-semibold fs-20">Top products</h1>
          <CustomButton
            onClick={() =>
              navigate("products", { state: { title: "Best Offers" } })
            }
            className="flex fs-16 gap-2 items-center"
          >
            view more
            <BsArrowRightShort />
          </CustomButton>
        </div>

        <div className="grid grid-cols-4 gap-3 px-3">
          {response?.products &&
            response?.products.length > 0 &&
            response?.products.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default TopProducts;
