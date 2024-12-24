import useMutations from '@/hooks/useMutations'
import CustomButton from './CustomButton'
import { IUnit } from '@/utils/types/types'
import { RiAddLine } from 'react-icons/ri'
import { RiAddFill } from "react-icons/ri";
import { IoMdRemove } from "react-icons/io";
interface IQuantityButton {
  unit:IUnit
}
function QuantityButton({unit}:IQuantityButton) {
  const {addToCart , deleteFromCart ,isAdded,isDeleted } = useMutations()
  const handleAddToCart = (productId:string,event:React.MouseEvent<HTMLDivElement>) =>{
    event.stopPropagation()
    addToCart(productId)
  }
  const handleDeleteFromCart = (productId:string,event:React.MouseEvent<HTMLDivElement>) =>{
    event.stopPropagation()
    deleteFromCart(productId)
  }
  return (
    <div className="pt-3 flex justify-end 
      md:pt-6">
      <CustomButton  className="c3 px-3 py-2 gap-3 cursor-auto flex items-center font-medium border rounded-lg  text-black" >
        <div onClick={(event)=>handleDeleteFromCart(unit.productId?._id,event)}  
          className={` ${isDeleted ? "pointer-events-none":""}   aspect-square cursor-pointer `} > 
          <IoMdRemove />

        </div>

        <div 
          className={` relative c5   `} >
          <div className="absolute c4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            md:c2">
            {unit.noOfProducts}
          </div>
          <RiAddLine className="opacity-0" />
        </div>


        <div onClick={(event)=>handleAddToCart(unit.productId?._id,event)} 
          className={` ${isAdded ? "pointer-events-none":""}  aspect-square   cursor-pointer`} >
          <RiAddFill />
        </div>
      </CustomButton>
    </div>
  )
}

export default QuantityButton