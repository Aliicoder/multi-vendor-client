import ReactDOM from "react-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { IAddress } from "@/utils/types/types";
import EditAddressForm from "../forms/EditAddressForm";
interface IAddAddressPortal {
  editAddress:IAddress | undefined
  setEditAddress:React.Dispatch<React.SetStateAction<IAddress|undefined>>
}
function EditAddressPortal({editAddress,setEditAddress}:IAddAddressPortal) {

  const portalElement = document.getElementById("portals");
  if (!portalElement) {
    return null; 
  }

  return ReactDOM.createPortal(
   <>
      {
        editAddress  &&
        <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2  ">
          <div>
            <div onClick={()=>setEditAddress(undefined)} className=" p-2 | flex justify-end">
              <IoIosCloseCircle className="c5" />
            </div>

            <EditAddressForm address={editAddress}/>
          </div>
        </div>
       
      }
   </>
    ,
    portalElement
  );
}

export default EditAddressPortal;
