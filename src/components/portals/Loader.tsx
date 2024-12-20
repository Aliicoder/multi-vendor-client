import React from "react"
import { BarLoader } from "react-spinners"
const overrideCss : React.CSSProperties = {
  position: "absolute",
  height: "2px",
  top: "0",
  left : "0" ,
  width: "100%",
}
type ConditionParams = {
  condition: boolean
}
const absoluteConditionalLoader = ({condition}:ConditionParams) => {
  return ( 
    <div className="absolute top-0 w-full">
      {
        condition&&
        <BarLoader cssOverride={overrideCss}/>
      }
    </div>
   );
}
 
export default absoluteConditionalLoader;