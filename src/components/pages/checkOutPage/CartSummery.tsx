import Border from "@/components/borders/Border"
import { selectActiveCart } from "@/store/Reducers/cartReducer"
import { useSelector } from "react-redux"

function CartSummery() {
  const cart = useSelector(selectActiveCart)
  return (
    <Border className="flex flex-col  gap-3 bg-white border rounded-md">
        <h1 className="p-[3%] font-semibold bg-blue-500 text-white">CheckOut</h1>
        <div className="p-[3%] flex flex-col gap-3">
          <p className="c2"><span className="font-semibold">{cart.totalNoOfProducts}</span> items in the cart</p>
          <h1 className="flex justify-between"><span className="font-semibold">products amount</span> {cart.totalAmount}$</h1>
          <h1 className="flex justify-between"><span className="font-semibold">delivery amount</span> 6$</h1>
          <h1 className="flex justify-between"><span className="font-semibold">total</span> {cart.totalAmount + 6}$</h1>
        </div>
    </Border>
  )
}

export default CartSummery