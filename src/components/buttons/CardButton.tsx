import { selectActiveCart } from '@/store/Reducers/cartReducer'
import { IProduct, IUnit } from '@/utils/types/types'
import { useSelector } from 'react-redux'
import QuantityButton from './QuantityButton'
import AddToCartButton from './AddToCartButton'
interface CardButton {
  product:IProduct
}
function CardButton({product} :CardButton) {
  const cart = useSelector(selectActiveCart)
  const unit:IUnit | undefined = cart?.units?.find((unit:IUnit)=> unit?.productId?._id == product?._id)

  return (
    <>
      {
        unit ? 
        <QuantityButton unit={unit} />
        :
        <AddToCartButton productId={product._id} />
      }
    </>
  )
}

export default CardButton
