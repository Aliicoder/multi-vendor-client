import { IProduct } from "@/types/types";
import { useGetPaginatedProductsQQuery } from "@/store/apiSlices/productSlice";
import ProductCard from "@/components/cards/ProductCard";
import DraggableScroll from "@/components/scroll/DraggableScroll";
function NewArrivals() {
  const { data: response } = useGetPaginatedProductsQQuery({
    perPage: 8,
    curPage: 1,
    sort: ["-createdAt"],
    outOfStock: false,
  });
  return (
    <section className="py-5">
      <div id="deals" className="container flex flex-col montserrat mx-auto">
        <h1 id="deals-title" className="p-6 text-fs-20 font-semibold">
          New Arrivals
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

export default NewArrivals;
