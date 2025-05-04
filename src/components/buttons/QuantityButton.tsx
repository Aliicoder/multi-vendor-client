import useMutations from "@/hooks/useMutations";
import CustomButton from "./CustomButton";
import { IUnit } from "@/types/types";
import { RiAddLine } from "react-icons/ri";
import { RiAddFill } from "react-icons/ri";
import { IoMdRemove } from "react-icons/io";
interface IQuantityButton {
  unit: IUnit;
}
function QuantityButton({ unit }: IQuantityButton) {
  const { addToCart, deleteFromCart, isAddedToCart, isDeletedFromCart } =
    useMutations();
  const handleAddToCart = (
    productId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    addToCart(productId);
  };
  const handleDeleteFromCart = (
    productId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    deleteFromCart(productId);
  };
  return (
    <div className="flex justify-end ">
      <CustomButton
        theme="white"
        className="flex border-blue-300 gap-3 items-center"
      >
        <div
          onClick={(event) => handleDeleteFromCart(unit.productId?._id, event)}
          className={` ${isAddedToCart ? "pointer-events-none" : ""}   aspect-square cursor-pointer `}
        >
          <IoMdRemove />
        </div>

        <div className="c5 relative">
          <div className="text-sm -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2">
            {unit?.quantity}
          </div>
          <RiAddLine className="opacity-0" />
        </div>

        <div
          onClick={(event) => handleAddToCart(unit.productId?._id, event)}
          className={` ${isDeletedFromCart ? "pointer-events-none" : ""}  aspect-square   cursor-pointer`}
        >
          <RiAddFill />
        </div>
      </CustomButton>
    </div>
  );
}

export default QuantityButton;
