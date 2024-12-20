import { useRef } from "react";

const useSetTimeout = () =>{
  const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);

  const timeouter = (callback:()=>void,delay:number) =>{
    if (timeoutRef.current !== null) 
      clearTimeout(timeoutRef.current as number); 
  
    timeoutRef.current = setTimeout(() => {
     callback();
    }, delay);
  }
  return { timeouter }
}
export default useSetTimeout