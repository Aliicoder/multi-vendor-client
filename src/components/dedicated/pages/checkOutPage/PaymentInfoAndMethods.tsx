import Border from '@/components/borders/Border'
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { IPaymentOptions } from '@/pages/private/CheckOutPage'
import { selectActiveCart } from '@/store/Reducers/cartReducer'
import { Select } from '@radix-ui/react-select'
import { useSelector } from 'react-redux'

interface IPaymentInfoAndMethods {
  setPaymentMethod:React.Dispatch<React.SetStateAction<IPaymentOptions | undefined>>
  className?:string
}
function PaymentInfoAndMethods({setPaymentMethod,className}:IPaymentInfoAndMethods) {
  const cart = useSelector(selectActiveCart)
  return (
   <div className={` ${className} p-6 | hidden flex-col 
      md:flex md:basis-4/12`}>
      <Border cornerRadius={16} topStyle="!p-[0.5px]" bottomStyle="flex flex-col p-6 gap-3 bg-white">
        <h1 className="font-semibold">Bill details</h1>
        <p className="c6 md:c2"><span className="font-semibold">{cart.totalNoOfProducts}</span> items in the cart</p>
        <h1 className="flex justify-between"><span className="font-semibold">products amount</span> {cart.totalAmount}$</h1>
        <h1 className="flex justify-between"><span className="font-semibold">delivery amount</span> 6$</h1>
        <h1 className="flex justify-between"><span className="font-semibold">total</span>{cart.totalAmount +6}$</h1>
        <Select onValueChange={(value: IPaymentOptions) => setPaymentMethod(value)}>
          <SelectTrigger  className=" mt-3 | w-full rounded-lg">
            <SelectValue   placeholder="Choose Payment method" />
          </SelectTrigger>
          <SelectContent className="montserrat">
            <SelectItem  value="cod">cash on delivery</SelectItem>
            <SelectItem disabled value="upi">UPI</SelectItem>
            <SelectItem disabled value="card">Stripe</SelectItem>
          </SelectContent>
        </Select> 
      </Border>
   </div>
  )
}

export default PaymentInfoAndMethods