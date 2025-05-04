import CustomButton from "@/components/buttons/CustomButton";
import { selectActiveCart } from "@/store/Reducers/cartReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Summary() {
  const navigate = useNavigate();
  const cart = useSelector(selectActiveCart);
  return (
    <div className="flex flex-col basis-4/12">
      <div className="flex flex-col bg-white border border-neutral-100 p-6 rounded-md gap-3">
        <p className="c2">
          <span className="font-semibold">{cart.totalNoOfProducts}</span> items
          in the cart
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

        <CustomButton
          onClick={() => navigate("checkout")}
          theme="black"
          className="rounded-lg mt-10"
        >
          Proceed to checkout
        </CustomButton>
      </div>
    </div>
  );
}

export default Summary;

// {
//   hasCoupon ?
//   <div className="flex gap-3">
//     <Input placeholder="" />

//     <IconButton text="Apply" direction={"right"}>
//     </IconButton>
//   </div>
//   :
//   <div>do you have a coupon ? click</div>
// }
