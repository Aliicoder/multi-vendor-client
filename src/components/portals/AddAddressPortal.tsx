import AddAddressForm from "../forms/AddAddressForm";
interface IAddAddressPortal {
  addAddress: boolean;
  setAddAddress: React.Dispatch<React.SetStateAction<boolean>>;
}
function AddAddressPortal({ addAddress, setAddAddress }: IAddAddressPortal) {
  return (
    <>
      {addAddress && (
        <div className="flex f bg-white border  rounded-lg -translate-x-1/2 -translate-y-1/2 fixed left-1/2 top-1/2 z-50">
          <AddAddressForm setAddAddress={setAddAddress} />
        </div>
      )}
    </>
  );
}

export default AddAddressPortal;
