import { IUnit } from "@/types/types";
import QuantityButton from "../buttons/QuantityButton";
import { currencyFormatter } from "@/utils/functions/currencyFormatter";
const UnitCard = ({ unit }: { unit: IUnit }) => {
  return (
    <div className="flex bg-white border border-neutral-100 justify-content-between rounded-md shadow-sm overflow-hidden shrink-0">
      <div className="basis-2/12 flex justify-center w-full bg-gray-50 items-center shrink-0">
        <img
          className="object-cover scale-75 "
          src={unit?.productId?.media[0]?.url}
          alt=""
        />
      </div>

      <div className="flex flex-col h-full justify-center gap-3 pl-10">
        <h1 className="font-semibold fs-13">{unit?.productId?.name}</h1>
        <h1 className="w-2/3 fs-8 line-clamp-3">
          {unit.productId?.description}
        </h1>
        <h1
          className="text-fs-13  font-semibold
"
        >
          {currencyFormatter("INR", unit.price)}
        </h1>
      </div>

      <div className="flex flex-col justify-between p-6 gap-2 ml-auto">
        <div />

        <QuantityButton unit={unit} />
      </div>
    </div>
  );
};

export default UnitCard;
