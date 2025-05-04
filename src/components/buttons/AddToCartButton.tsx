import React from "react";
import useMutations from "@/hooks/useMutations";
import CustomButton from "./CustomButton";
interface IAddToCart {
  productId: string;
}
function AddToCartButton({ productId }: IAddToCart) {
  const { addToCart, isAddedToCart } = useMutations();
  const handleAddToCart = (
    productId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    addToCart(productId);
  };
  return (
    <div className="flex justify-end">
      <CustomButton
        className="border-blue-300"
        disabled={isAddedToCart}
        onClick={(event) => handleAddToCart(productId, event)}
        theme="white"
      >
        Add to cart
      </CustomButton>
    </div>
  );
}

export default AddToCartButton;
