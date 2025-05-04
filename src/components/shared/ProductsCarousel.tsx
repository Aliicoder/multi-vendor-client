import DraggableScroll from "../scroll/DraggableScroll";
import { IProduct } from "@/types/types";
import ProductCard from "../cards/ProductCard";
interface IProductsCarousel {
  title: string;
  products: IProduct[];
}
function ProductsCarousel({ title, products }: IProductsCarousel) {
  return (
    <div className="container  flex flex-col montserrat mx-auto">
      <h1 className="p-6 font-semibold fs-20">{title}</h1>
      <DraggableScroll className="px-6">
        {products?.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </DraggableScroll>
    </div>
  );
}

export default ProductsCarousel;
