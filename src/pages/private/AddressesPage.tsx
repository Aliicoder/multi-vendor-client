import CustomButton from "@/components/buttons/CustomButton";
import AddAddressPortal from "@/components/portals/AddAddressPortal";
import {
  useDeleteAddressMutation,
  useSetAddressAsDefaultMutation,
} from "@/store/apiSlices/userSlice";
import { selectCurrentUser, setAddresses } from "@/store/Reducers/authReducer";
import { IAddress } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import Address from "@/components/shared/Address";
import { errorToast } from "@/lib/utils";
import { useState } from "react";
import UpdateAddressPortal from "@/components/portals/UpdateAddressPortal";
function AddressesPage() {
  const { userId, addresses } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [deleteAddressMutation] = useDeleteAddressMutation();
  const [setAsDefault] = useSetAddressAsDefaultMutation();

  const [addAddress, setAddAddress] = useState(false);
  const [editAddress, setEditAddress] = useState<IAddress | undefined>();

  let handleDeleteAddress = async (addressId: string) => {
    try {
      let response = await deleteAddressMutation({
        userId,
        addressId,
      }).unwrap();
      dispatch(setAddresses(response.addresses));
    } catch (error: any) {
      errorToast(error.data.message ?? "something went wrong");
    }
  };
  let handleSetAsDefault = async (addressId: string) => {
    try {
      let response = await setAsDefault({ userId, addressId }).unwrap();
      dispatch(setAddresses(response.addresses));
    } catch (error: any) {
      errorToast(error.data.message ?? "something went wrong");
    }
  };
  const openInGoogleMaps = (lat: number, lon: number) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <AddAddressPortal addAddress={addAddress} setAddAddress={setAddAddress} />
      <UpdateAddressPortal
        editAddress={editAddress}
        setEditAddress={setEditAddress}
      />

      <div className="flex p-5 gap-5 flex-col w-full hide-scrollbar">
        <div className="p-5 pb-0 w-full  gap-3">
          <h1 className="text-blue-500 font-semibold"> Addresses</h1>

          <CustomButton
            className="text-fs-13 hover:underline"
            onClick={() => setAddAddress(true)}
          >
            new address +
          </CustomButton>
        </div>

        {addresses.length > 0 &&
          addresses.map((address: IAddress) => (
            <div className="flex flex-col  border bg-white border-slate-100 rounded-lg ">
              <div className="flex justify-between fs-16 gap-3  p-6 items-center  ">
                <Address address={address} bg />
              </div>

              <div className="flex justify-between p-3 ">
                <div className="flex gap-3 items-center text-fs-13 text-slate-500 ml-5">
                  <div>phone : {address.phone}</div>

                  <CustomButton
                    onClick={() => openInGoogleMaps(address.lat, address.lng)}
                    theme="none"
                    className=" h-9 flex justify-content-center items-center text-blue-500"
                  >
                    view location
                  </CustomButton>
                </div>
                <div className="flex gap-3">
                  <CustomButton
                    theme="white"
                    className=" h-9 flex justify-content-center items-center"
                    onClick={() => setEditAddress(address)}
                  >
                    edit
                  </CustomButton>

                  <CustomButton
                    onClick={() => handleDeleteAddress(address._id)}
                    theme="black"
                    className=" h-9 flex justify-content-center items-center"
                  >
                    delete
                  </CustomButton>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default AddressesPage;
