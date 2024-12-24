import Border from '@/components/borders/Border'
import CustomButton from '@/components/buttons/CustomButton'
import { selectActiveCart } from '@/store/Reducers/cartReducer'
import { MdNavigateNext } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Summary() {
  const navigate = useNavigate()
  const cart = useSelector(selectActiveCart)
  return (
    <div className="p-6 | hidden flex-col 
      md:flex md:basis-4/12">
      <Border cornerRadius={16} topStyle="!p-[0.5px]" bottomStyle="flex flex-col p-6 gap-3 bg-white">
        <h1 className="font-semibold">Summery</h1>
     

        <p className="c2"><span className="font-semibold">{cart.totalNoOfProducts}</span> items in the cart</p>
        <h1 className="flex justify-between"><span className="font-semibold">products amount</span> {cart.totalAmount}$</h1>
        <h1 className="flex justify-between"><span className="font-semibold">delivery amount</span> 6$</h1>
        <h1 className="flex justify-between"><span className="font-semibold">total</span>{cart.totalAmount +6}$</h1>
        
        <div className="flex justify-center pt-3">

          <CustomButton onClick={()=>navigate("checkout")} text='Checkout' direction={"right"}
            className='c3 px-3 py-2 gap-3 flex items-center font-medium border rounded-lg  text-black'>
            <MdNavigateNext />
          </CustomButton>
        </div>
      </Border>
    </div>
  )
}

export default Summary


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