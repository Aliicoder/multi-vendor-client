import { ICounter } from "@/utils/types/types";
import { useCallback, useEffect, useState } from "react"
import { useFetchProductsChunkQQuery } from "@/store/apiSlices/productSlice";
interface IProductsPagination {
  perPage?: number
  category?: string
  sort?:{}
  name?: string
  shopName?: string
}

const useProductsPagination = ({perPage,category,sort,shopName}:IProductsPagination) =>{
  const [counter,setCounter] = useState<ICounter>({prev:0,curPage:1,next:2,pagesLen:2});
  const {data:response,isLoading} = useFetchProductsChunkQQuery({perPage,category,curPage:counter.curPage,sort,shopName})
  const handleLeft = useCallback(() =>{
    if(counter.prev > 0)
      setCounter({...counter,prev:counter.prev-1,curPage:counter.curPage-1,next:counter.next-1})
    
  },[counter])
  const handleRight = useCallback( () =>{
    if(counter.next <= counter.pagesLen)
      setCounter({...counter,prev:counter.prev+1,curPage:counter.curPage+1,next:counter.next+1})
    
  },[counter])
  useEffect(()=>{
      setCounter({...counter,pagesLen:response?.pagesLen})
  },[isLoading])
  return { products:response?.products , counter , handleLeft , handleRight ,isLoading}
}
export default useProductsPagination