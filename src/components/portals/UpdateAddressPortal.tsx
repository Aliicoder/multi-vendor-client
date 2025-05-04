import { IAddress } from "@/types/types";
import UpdateAddressForm from "../forms/UpdateAddressForm";
interface IAddAddressPortal {
  editAddress: IAddress | undefined;
  setEditAddress: React.Dispatch<React.SetStateAction<IAddress | undefined>>;
}
function UpdateAddressPortal({
  editAddress,
  setEditAddress,
}: IAddAddressPortal) {
  return (
    <>
      {editAddress && (
        <div className="flex f bg-white border  rounded-lg -translate-x-1/2 -translate-y-1/2 fixed left-1/2 top-1/2 z-50">
          <UpdateAddressForm
            address={editAddress}
            setEditAddress={setEditAddress}
          />
        </div>
      )}
    </>
  );
}

export default UpdateAddressPortal;
