import { IProduct } from "@/types/types";
import { useNavigate } from "react-router-dom";
import TagButton from "../buttons/TagButton";
import CardButton from "../buttons/CardButton";
import { cn } from "@/lib/utils";
import { Currency } from "@/Context/Currency";
import { useContext, useMemo } from "react";
import { currencyFormatter } from "@/utils/functions/currencyFormatter";

interface IProductCartProps {
  product: IProduct;
  theme?: "white" | "blue";
}

const ProductCard = ({ product, theme = "white" }: IProductCartProps) => {
  const navigate = useNavigate();
  const { selectedCurrency, exchangeRates } = useContext(Currency);

  const { productPrice, discountedPrice, hasDiscount } = useMemo(() => {
    const basePrice = exchangeRates[selectedCurrency.changeCode!]
      ? exchangeRates[selectedCurrency.changeCode!] * product.price
      : product.price;

    const hasDiscount = product.discount > 0;
    const discountedValue = hasDiscount
      ? basePrice - (basePrice * product.discount) / 100
      : basePrice;

    return {
      productPrice: basePrice.toFixed(2),
      discountedPrice: discountedValue.toFixed(2),
      hasDiscount,
    };
  }, [
    product.price,
    product.discount,
    exchangeRates,
    selectedCurrency.changeCode,
  ]);

  const handleCardClick = () => navigate(`/products/${product._id}`);
  const handleShopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`shops/${product.shopName}`);
  };

  return (
    <div
      key={product._id}
      onClick={handleCardClick}
      className={cn(
        `flex flex-col bg-white drop-shadow-sm m-3 rounded-lg basis-3/12 cursor-pointer overflow-hidden shrink-0`,
        theme === "blue" && "bg-[#eff6ff60]"
      )}
    >
      <div className="basis-3/5 bg-gray-50 flex justify-center items-center overflow-hidden relative">
        <img
          className="aspect-square scale-75 object-contain pointer-events-none"
          src={product?.media[0].url}
          alt={product.name}
        />
        <TagButton
          productId={product._id}
          className="absolute z-20 right-3 top-3"
        />
        {hasDiscount && (
          <div className="bg-blue-500 p-2 rounded-r text-white -left-0 absolute font-bold top-3">
            {product.discount}%
          </div>
        )}
      </div>

      <div className="flex flex-col p-5 grow">
        <h1 className="text-fs-13 font-semibold line-clamp-2">
          {product.description}
        </h1>

        <div className="flex justify-end gap-2 mt-3">
          {hasDiscount && (
            <span className="text-fs-13 text-gray-400 line-through">
              {currencyFormatter(selectedCurrency.code, discountedPrice)}
            </span>
          )}
          <span className="text-fs-13 font-semibold">
            {currencyFormatter(selectedCurrency.code, productPrice)}
          </span>
        </div>

        <div className="flex flex-col">
          <h1
            onClick={handleShopClick}
            className="text-blue-500 cursor-pointer hover:underline text"
          >
            {product.shopName}
          </h1>
          <div className="text-fs-13">{product.name}</div>
        </div>

        <div className="mt-auto">
          <CardButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
