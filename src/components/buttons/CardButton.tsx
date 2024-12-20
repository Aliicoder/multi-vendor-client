import { selectActiveCart } from '@/store/Reducers/cartReducer'
import { IProduct, IUnit } from '@/utils/types/types'
import { useSelector } from 'react-redux'
import { RiAddLine } from 'react-icons/ri'
import useMutations from '@/hooks/useMutations'
import CustomButton from './CustomButton'
import React from 'react'
interface CardButton {
  product:IProduct
}
function CardButton({product} :CardButton) {
  const cart = useSelector(selectActiveCart)
  const {addToCart , deleteFromCart ,isAdded,isDeleted } = useMutations()
  const unit:IUnit | undefined = cart?.units?.find((unit:IUnit)=> unit?.productId?._id == product?._id)
  const handleAddToCart = (productId:string,event:React.MouseEvent<HTMLDivElement>) =>{
    event.stopPropagation()
    addToCart(productId)
  }
  const handleDeleteFromCart = (productId:string,event:React.MouseEvent<HTMLDivElement>) =>{
    event.stopPropagation()
    deleteFromCart(productId)
  }
  return (
    <>
      {
        unit ? 
        <div className="pt-3 flex justify-end 
          md:pt-6">
          <CustomButton  className="c3 px-3 py-2 gap-3 cursor-auto flex items-center font-medium border rounded-lg  text-black" >
            <div onClick={(event)=>handleDeleteFromCart(unit?.productId?._id,event)}  
              className={` ${isDeleted ? "pointer-events-none":""}   aspect-square cursor-pointer `} > 
              <img className='w-2 aspect-square 
              md:w-3' src="/svgs/minus.svg" alt="" />
            </div>

            <div 
              className={` relative c5   `} >
              <div className="absolute c4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                md:c2">
                {unit.noOfProducts}
              </div>
              <RiAddLine className="opacity-0" />
            </div>


            <div onClick={(event)=>handleAddToCart(unit?.productId?._id,event)} 
              className={` ${isAdded ? "pointer-events-none":""}  aspect-square   cursor-pointer`} >
              <img className='w-2 aspect-square 
              md:w-3' src="/svgs/pluse.svg" alt="" />
            </div>
          </CustomButton>
      </div>
        :
        <div className="pt-3  flex justify-end  
          md:pt-6">
          <CustomButton onClick={()=>addToCart(product._id)} 
            className="c3 px-3 py-2 gap-3 flex items-center font-medium border rounded-lg  text-black" text="Add to cart">
          </CustomButton>
        </div>
      }
    </>
  )
}

export default CardButton
// ${isAdded ? "pointer-events-none":""}