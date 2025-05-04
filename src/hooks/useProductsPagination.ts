import { ICounter } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import { useGetPaginatedProductsQQuery } from "@/store/apiSlices/productSlice";
interface IProductsPagination {
  perPage?: number;
  category?: string;
  sort?: [];
  name?: string;
  brand?: string;
  shopName?: string;
}

const useProductsPagination = ({
  name,
  brand,
  shopName,
  perPage,
  category,
  sort,
}: IProductsPagination) => {
  const [counter, setCounter] = useState<ICounter>({
    prev: 0,
    curPage: 1,
    next: 2,
    pagesLen: 2,
  });
  const { data: response, isLoading } = useGetPaginatedProductsQQuery({
    name,
    brand,
    perPage,
    category,
    curPage: counter.curPage,
    sort,
    shopName,
  });
  const handleLeft = useCallback(() => {
    if (counter.prev > 0)
      setCounter({
        ...counter,
        prev: counter.prev - 1,
        curPage: counter.curPage - 1,
        next: counter.next - 1,
      });
  }, [counter]);
  const handleRight = useCallback(() => {
    if (counter.next <= counter.pagesLen)
      setCounter({
        ...counter,
        prev: counter.prev + 1,
        curPage: counter.curPage + 1,
        next: counter.next + 1,
      });
  }, [counter]);
  useEffect(() => {
    setCounter({ ...counter, pagesLen: response?.pagesLen });
  }, [isLoading]);
  return {
    products: response?.products,
    counter,
    handleLeft,
    handleRight,
    isLoading,
  };
};
export default useProductsPagination;
