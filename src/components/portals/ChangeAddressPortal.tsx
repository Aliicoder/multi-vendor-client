import ReactDOM from "react-dom";
import { IAddress } from "@/utils/types/types";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { MdClose } from "react-icons/md";
interface IChangeAddressPortal {
  isChangeAddress:boolean
  setIsChangeAddress:React.Dispatch<React.SetStateAction<boolean>>
  setAddress:React.Dispatch<React.SetStateAction<IAddress>>
}
function ChangeAddressPortal({isChangeAddress,setIsChangeAddress,setAddress}:IChangeAddressPortal) {
  const {addresses} = useSelector(selectCurrentUser)

  const handleSetAddress = (address:IAddress) =>{
    setAddress(address)
    setIsChangeAddress(false)
  }

  const portalElement = document.getElementById("portals")
  if (!portalElement) return null
  return ReactDOM.createPortal(
   <>
      {
        isChangeAddress &&
        <div className="p-6 | w-[90vw] h-[80vh] border rounded-lg absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2  bg-white 
          md:container">
          <div onClick={()=>setIsChangeAddress(false)} className=" flex justify-end">
            <MdClose className="c9 m-4 scale-150 md:c5 md:scale-100" />
          </div>
          <div className="gap-3 | flex flex-col overflow-y-scroll">          
            { addresses.map((address:IAddress)=>
            <div onClick={()=>handleSetAddress(address)} className="c6 gap-1 | flex items-center bg-slate-50 rounded-lg cursor-pointer ">

                <div className="p-2 mr-2 | border rounded-md font-bold text-white bg-blue-500">
                  {address.type}
                </div> 
                <p>{address.city},</p> 
                <p>{address.area},</p> 
                <p>{address.pinCode}</p>

            </div> 
            )}
          </div>
        </div>
       
      }
   </>
    ,
    portalElement
  );
}

export default ChangeAddressPortal;
