import ProductCard from "@/components/cards/ProductCard";
import DraggableScroll from "@/components/scroll/DraggableScroll";
import { useGetPaginatedProductsQQuery } from "@/store/apiSlices/productSlice";
import { IProduct } from "@/types/types";

function Deals() {
  const { data: response } = useGetPaginatedProductsQQuery({});
  return (
    <section className="py-5">
      <div id="deals" className="container flex flex-col montserrat mx-auto">
        <h1 id="deals-title" className="p-6 text-fs-20 font-semibold">
          Deals for you
        </h1>
        <DraggableScroll>
          {response?.products &&
            response.products.length > 0 &&
            response?.products?.map((product: IProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </DraggableScroll>
      </div>
    </section>
  );
}

export default Deals;
