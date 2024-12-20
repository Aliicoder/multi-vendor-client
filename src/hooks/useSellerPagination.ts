import { ICounter } from "@/utils/types/types";
import { useCallback, useEffect, useState } from "react"
import { useFetchSellersChunkQQuery , util } from "@/store/apiSlices/sellerSlice";
import { useDispatch } from "react-redux";
interface IShopsPagination {
  name?: string
  perPage?: number
  sort?:{}
}
const useSellersPagination = ({name,perPage,sort}:IShopsPagination) =>{
  const [counter,setCounter] = useState<ICounter>({prev:0,curPage:1,next:2,pagesLen:2});
  const {data:response,isLoading} = useFetchSellersChunkQQuery({name,curPage:counter.curPage,perPage,sort})
  const dispatch = useDispatch()
  const handleLeft = useCallback(() =>{
    if(counter.prev > 0){
      setCounter({...counter,prev:counter.prev-1,curPage:counter.curPage-1,next:counter.next-1})
      dispatch(util.invalidateTags(["Sellers"]))
    }
  },[counter])
  const handleRight = useCallback( () =>{
    if(counter.next <= counter.pagesLen){
      setCounter({...counter,prev:counter.prev+1,curPage:counter.curPage+1,next:counter.next+1})
      dispatch(util.invalidateTags(["Sellers"]))
    }
  },[counter])
  useEffect(()=>{
    if(response?.sellersChunk)
      setCounter({...counter,pagesLen:response.pagesLen})
  },[])
  return { sellers:response?.sellers , counter , handleLeft , handleRight ,isLoading}
}
export default useSellersPagination