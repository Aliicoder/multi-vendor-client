import { useSelector } from "react-redux";
import { selectActiveCart } from "@/store/Reducers/cartReducer";
import { ICartOrder, IUnit } from "@/types/types";
import Summary from "@/components/pages/CartPage/Summary";
import Header from "@/components/shared/Header";
import UnitCard from "@/components/cards/UnitCard";
function CartPage() {
  const cart = useSelector(selectActiveCart);
  return (
    <div className="flex flex-col h-svh">
      <Header className="border-b border-neutral-100" />
      <div className="flex flex-col container montserrat mx-auto h-full overflow-hidden">
        <h1 className="bg-slate-50 p-6 font-semibold ">Shopping Cart</h1>

        <div className="flex h-full">
          <div
            id="cart-left-part"
            className="flex flex-col basis-full px-5 pb-[100px]  mr-5 gap-5 overflow-y-scroll "
          >
            {cart?.orders &&
              cart.orders.map(
                (order: ICartOrder) =>
                  order.units &&
                  order.units.map((unit: IUnit, i) => (
                    <UnitCard key={i} unit={unit} />
                  ))
              )}
          </div>

          <Summary />
        </div>
      </div>
    </div>
  );
}

export default CartPage;
{
  /* <CheckoutBar
className="p-3 bottom-[var(--bottomBar-height)] left-0 w-full z-40  justify-around  border-t border-slate-100 bg-white
md:hidden"
/>
<BottomBar
className="fixed z-40 p-3 bottom-0 left-0 w-full flex justify-evenly border-t bg-white
md:hidden"
/> */
}
