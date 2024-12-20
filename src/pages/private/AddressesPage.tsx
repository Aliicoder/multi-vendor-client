import CustomButton from "@/components/buttons/CustomButton"
import PrimaryFrame from "@/components/Frames/PrimaryFrame"
import AddAddressPortal from "@/components/portals/AddAddressPortal"
import EditAddressPortal from "@/components/portals/EditAddressPortal"
import { useDeleteAddressMutation } from "@/store/apiSlices/clientSlice"
import { selectCurrentUser, setAddresses } from "@/store/Reducers/authReducer"
import tryCatch from "@/utils/functions/tryCatch"
import { IAddress } from "@/utils/types/types"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function AddressesPage() {
  const [addAddress,setAddAddress] = useState(false)
  const  { addresses }  = useSelector(selectCurrentUser) 
  const [ editAddress,setEditAddress] = useState<IAddress|undefined>()
  const dispatch = useDispatch()
  const [deleteAddressMutation] = useDeleteAddressMutation()
  let handleDeleteAddress = async (addressId:string) => {
    await tryCatch( async ()=>{
      if(addressId){
        let response = await deleteAddressMutation({addressId}).unwrap()
        dispatch(setAddresses(response.addresses))
      } 
    })
  }
  return (
    <>
      <AddAddressPortal addAddress={addAddress} setAddAddress={setAddAddress} />
      <EditAddressPortal editAddress={editAddress} setEditAddress={setEditAddress} />

      <PrimaryFrame className=" montserrat w-full flex flex-col overflow-y-scroll hide-scrollbar">
        <h1 className="font-bold text-blue-600">My addresses</h1>
        <div className="text-gray-950 mb-3" onClick={()=> setAddAddress(true)}>+ Add new address</div>
        <div className="bg-white h-full min-w-full rounded-xl">
        {
          addresses.length > 0 &&
          addresses.map((address:IAddress)=>
          <PrimaryFrame className="gap-1 | flex flex-col border-b border-slate-200">
            <div className="flex items-center">
              <div className="p-2 mr-2 bg-blue-500 border rounded-md font-bold text-white">{address.type}</div> 
              <p>{address.city},</p> <p>{address.area},</p> <p>{address.pinCode}</p>
            </div>
            <div className=" gap-3 | flex justify-end">
              <CustomButton onClick={()=>setEditAddress(address)}
                className="c3 px-3 py-2 gap-3 flex items-center font-medium border rounded-lg  text-blue-500" text="edit">
              </CustomButton>
              <CustomButton onClick={()=>handleDeleteAddress(address._id)}
                className="c3 px-3 py-2 gap-3 flex items-center font-medium border rounded-lg  text-red-600" text="delete">
              </CustomButton>
            </div>
          </PrimaryFrame> 
          )
        }
        </div>
      </PrimaryFrame>
    </>
  )
}

export default AddressesPage