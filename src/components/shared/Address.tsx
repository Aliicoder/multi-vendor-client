import { cn } from "@/lib/utils";
import { IAddress } from "@/types/types";

interface IAddressProps {
  address: IAddress;
  bg?: boolean;
}
const Address = ({ address, bg }: IAddressProps) => {
  return (
    <div
      className={cn(
        "flex items-center px-3 py-1 rounded-lg",
        bg && "bg-neutral-50"
      )}
    >
      <h1>
        {address.province},{address.city},{address.street}
      </h1>
    </div>
  );
};

export default Address;
