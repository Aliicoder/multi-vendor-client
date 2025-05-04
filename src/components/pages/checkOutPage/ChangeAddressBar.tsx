import CustomButton from "@/components/buttons/CustomButton"
import { trackElementHeight } from "@/utils/functions/resizeTrackers"
import { useEffect, useRef, useState } from "react"
import { FaLocationDot } from "react-icons/fa6";
import { IAddress } from "@/types/types"
import ChangeAddressPortal from "@/components/portals/ChangeAddressPortal"
interface IChangeAddressBar {
  address:IAddress
  setAddress:React.Dispatch<React.SetStateAction<IAddress>>
}
export default function ChangeAddressBar({setAddress,address}:IChangeAddressBar) {
  const refChangeLocationBar = useRef<HTMLDivElement>(null)
  const [isChangeAddress,setIsChangeAddress] = useState(false)
  const handleChangeAddress = () => {
    setIsChangeAddress(true)
  }
  useEffect(()=>{
    trackElementHeight(refChangeLocationBar,"--changeAddressBar-height")
  },[])
  return (
    <>
      <ChangeAddressPortal isChangeAddress={isChangeAddress} setIsChangeAddress={setIsChangeAddress} setAddress={setAddress} />

      <div ref={refChangeLocationBar} 
        className="p-3 px-10 bottom-[var(--placeOrderBar-height)] left-0 w-full | z-40 fixed flex  justify-around bg-white 
        md:hidden">
        <div className="flex justify-center items-center">
          <FaLocationDot className="c9" />
        </div>
        <div className="flex flex-col">
          <div className="c7">
              Delivering to <span className="font-bold text-blue-500">{address.type}</span>
            </div>
            <div className="c6">
              {address.city},{address.area},{address.pinCode}  
            </div> 
        </div>
  
        <CustomButton onClick={handleChangeAddress} className="font-bold" text="change">
        </CustomButton>
      </div>
    </>
  )
}
