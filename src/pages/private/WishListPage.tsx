import useMutations from "@/hooks/useMutations";
import { IProduct } from "@/types/types";
import { useSelector } from "react-redux";
import { selectWishList } from "@/store/Reducers/wishListReducer";
import CustomButton from "@/components/buttons/CustomButton";

function WishListPage() {
  const wishList = useSelector(selectWishList);
  const { deleteFromWhishList, addToCart } = useMutations();
  const addProductToCart = (productId: string) => {
    addToCart(productId);
    deleteFromWhishList(productId);
  };
  return (
    <div className="flex flex-col p-5 w-full gap-2 hide-scrollbar overflow-y-scroll">
      <h1 className="p-5 text-blue-500 font-bold tracking-wide"> Wishlist</h1>

      {wishList &&
        wishList?.products?.map((product: IProduct) => (
          <div
            key={product._id}
            className="flex rounded-lg overflow-hidden border border-neutral-100  mt-3 mx-3  bg-white"
          >
            <div className="basis-2/12">
              <img
                className="object-fit-cover h-full"
                src={product.media[0].url}
                alt=""
              />
            </div>

            <div className="flex flex-col gap-3 justify-center  pl-10">
              <h1 className="w-9/12 | font-semibold fs-16">{product.name}</h1>
              <h1 className="w-9/12 fs-10 line-clamp-3">
                {product.description}
              </h1>

              <div className="flex gap-2 pt-5">
                <CustomButton
                  onClick={() => addProductToCart(product._id)}
                  theme="white"
                  className=" h-9 flex justify-content-center items-center"
                >
                  Add to cart
                </CustomButton>
                <CustomButton
                  onClick={() => deleteFromWhishList(product._id)}
                  theme="black"
                  className=" h-9 flex justify-content-center items-center"
                >
                  delete
                </CustomButton>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default WishListPage;
