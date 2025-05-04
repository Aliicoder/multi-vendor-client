import Border from "@/components/borders/Border";
import CustomButton from "@/components/buttons/CustomButton";
import { selectActiveCart } from "@/store/Reducers/cartReducer";
import { MdNavigateNext } from "react-icons/md";
import { useSelector } from "react-redux";

function Checkout() {
  const cart = useSelector(selectActiveCart);
  return (
    <Border
      topClassName="hidden md:block basis-4/12"
      className="flex flex-col bg-white p-6 gap-3"
    >
      <h1 className="font-semibold">Bill details</h1>
      <p className="c6 md:c2">
        <span className="font-semibold">{cart.totalNoOfProducts}</span> items in
        the cart
      </p>
      <h1 className="flex justify-between">
        <span className="font-semibold">products amount</span>{" "}
        {cart.totalAmount}$
      </h1>
      <h1 className="flex justify-between">
        <span className="font-semibold">delivery amount</span> 6$
      </h1>
      <h1 className="flex justify-between">
        <span className="font-semibold">total</span>
        {cart.totalAmount + 6}$
      </h1>
      <div className="flex justify-center pt-3">
        <CustomButton className="flex border rounded-lg text-black c3 font-medium gap-3 items-center px-3 py-2">
          Place Order
          <MdNavigateNext />
        </CustomButton>
      </div>
    </Border>
  );
}

export default Checkout;
