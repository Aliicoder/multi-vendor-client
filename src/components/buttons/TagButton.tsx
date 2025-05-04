import useMutations from "@/hooks/useMutations";
import CustomButton from "./CustomButton";
import { TbTag } from "react-icons/tb";
import { selectWishList } from "@/store/Reducers/wishListReducer";
import { useSelector } from "react-redux";
import { FaTag } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface ITagButton {
  productId: string;
  className?: string;
}
function TagButton({ productId, className }: ITagButton) {
  const {
    addToWishList,
    deleteFromWhishList,
    isAddedToWishList,
    isDeletedFromWishList,
  } = useMutations();
  const wishList = useSelector(selectWishList);
  const tagged = wishList.products.find((product) => product._id === productId);
  const handleTagging = (
    productId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (tagged) deleteFromWhishList(productId);
    else addToWishList(productId);
  };
  return (
    <CustomButton
      disabled={isAddedToWishList || isDeletedFromWishList}
      onClick={(event) => handleTagging(productId, event)}
      theme="white"
      className={cn("border-blue-300 aspect-square", className)}
    >
      {tagged ? <FaTag /> : <TbTag />}
    </CustomButton>
  );
}

export default TagButton;
