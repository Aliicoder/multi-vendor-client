import { selectActiveCart } from '@/store/Reducers/cartReducer'
import { LuShoppingCart } from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const navigate = useNavigate()
  const cart = useSelector(selectActiveCart)
  return (
    <div onClick={()=>navigate("/cart")} className='relative c4 p-[8%] cursor-pointer '>
      <LuShoppingCart  />
      <div className='absolute flex justify-center text-xs items-center rounded-full h-4 w-4 top-[-4px] right-[-4px] bg-red-500 text-white '>
        <div className=' translate-y-[1px]'>{cart?.units.length}</div>
      </div>
    </div>
  )
}

export default Cart