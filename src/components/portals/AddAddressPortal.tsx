import ReactDOM from "react-dom";
import AddAddressForm from "../forms/AddAddressForm";
import PrimaryFrame from "../Frames/PrimaryFrame";
import { IoIosCloseCircle } from "react-icons/io";
interface IAddAddressPortal {
  addAddress:boolean
  setAddAddress:React.Dispatch<React.SetStateAction<boolean>>
}
function AddAddressPortal({addAddress,setAddAddress}:IAddAddressPortal) {

  const portalElement = document.getElementById("portals");
  if (!portalElement) {
    return null; 
  }

  return ReactDOM.createPortal(
   <>
      {
        addAddress &&
        <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2  ">
          <PrimaryFrame>
            <div onClick={()=>setAddAddress(false)} className=" p-2 | flex justify-end">
              <IoIosCloseCircle className="c5" />
            </div>
            <AddAddressForm />
          </PrimaryFrame>
        </div>
       
      }
   </>
    ,
    portalElement
  );
}

export default AddAddressPortal;
