import useMutations from '@/hooks/useMutations';
import CustomButton from './CustomButton'
import { TbTag } from "react-icons/tb";
import { selectWishList } from '@/store/Reducers/wishListReducer';
import { useSelector } from 'react-redux';
import { FaTag } from "react-icons/fa6";

interface ITagButton {
  productId: string;
}
function TagButton({productId}:ITagButton) {
  const {addToWishList,deleteFromWhishList} = useMutations()
  const wishList = useSelector(selectWishList)
  const tagged = wishList.products.find(product => product._id === productId)
  const handleTagging = (productId:string,event:React.MouseEvent<HTMLButtonElement>) =>{
    event.stopPropagation()
    if(tagged)
      deleteFromWhishList(productId) 
    else
      addToWishList(productId)
  }
  return (
    <CustomButton onClick={(event)=>handleTagging(productId,event)} 
      className="c6 p-2 top-3 right-3   absolute aspect-square shadow-none rounded-lg border text-black bg-white hover:bg-white
        md:c4 md:p-2 md:top-6 md:right-6  md:rounded-xl ">
        {
          tagged ?
          <FaTag />
          :
          <TbTag />

        }
    </CustomButton>
)
}

export default TagButton