import React from 'react'
import CustomButton from './CustomButton'
import useMutations from '@/hooks/useMutations'
interface IAddToCart {
  productId: string
}
function AddToCartButton({productId}:IAddToCart) {
  const { addToCart } = useMutations()
  const handleAddToCart = (productId:string,event:React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    addToCart(productId)
  }
  return (
    <div className="pt-3  flex justify-end  
      md:pt-6">
      <CustomButton onClick={(event)=>handleAddToCart(productId,event)} 
        className="c3 px-3 py-2 gap-3 flex items-center font-medium border rounded-lg  text-black" text="Add to cart">
      </CustomButton>
    </div>
  )
}

export default AddToCartButton