import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { IAddress } from "@/types/types";
import { useState } from "react";
import { FaCaretDown, FaCircleCheck, FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
interface ISetDeliveryAddressProps {
  deliveryAddress: IAddress;
  setDeliveryAddress: React.Dispatch<React.SetStateAction<IAddress>>;
}
const SetDeliveryAddress = ({
  deliveryAddress,
  setDeliveryAddress,
}: ISetDeliveryAddressProps) => {
  const { addresses } = useSelector(selectCurrentUser);
  const [isChangeAddress, setIsChangeAddress] = useState(false);

  return (
    <div
      onClick={() => setIsChangeAddress((prev) => !prev)}
      className="relative flex flex-col border-neutral-100 border rounded-lg ov"
    >
      <div className="flex bg-white justify-around p-3 items-center px-10">
        <div className="flex bg-slate-100 justify-center p-3 rounded-full aspect-square items-center">
          <FaLocationDot className="fs-20" />
        </div>
        <div className="flex flex-col p-6 mr-auto">
          <h1 className="font-bold fs-20">Delivering to</h1>
          <h1 className="fs-16">
            {deliveryAddress.province},{deliveryAddress.city},
            {deliveryAddress.street}
          </h1>
        </div>
        <h1>
          <FaCaretDown />
        </h1>
      </div>
      {isChangeAddress && (
        <div className="absolute p-5  mt-3 top-full left-0 z-50 w-full   ">
          <div className="p-5 bg-white border rounded-lg  ">
            <div className="gap-3 flex flex-col ">
              {addresses.map((address: IAddress) => (
                <div
                  onClick={() => setDeliveryAddress(address)}
                  className="text-fs-16 gap-1  flex items-center  rounded-lg cursor-pointer "
                >
                  <span className="bg-neutral-50 py-1 px-2 rounded-lg">
                    {address.province},{address.city},{address.street}
                  </span>
                  {deliveryAddress._id === address._id && (
                    <FaCircleCheck className="ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetDeliveryAddress;
