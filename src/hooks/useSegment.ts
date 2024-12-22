import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useSegment = (segmentNo:number = 1) =>{
  const  { pathname } = useLocation() 
  const [segments,setSegments] = useState<string[]>([])
  let urlSegments = pathname.toLowerCase().split('/');
  useEffect(()=>{ 
     setSegments(urlSegments)
  },[pathname])
  return  segments[segmentNo] 
}
export default useSegment
