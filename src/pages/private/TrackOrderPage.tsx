import CustomButton from "@/components/buttons/CustomButton";
import { IOrder } from "@/types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbBackslash } from "react-icons/tb";
import dateFormatter from "@/utils/functions/dateFormatter";
import { TiUser } from "react-icons/ti";
import { ORDER_STATUS_COLORS } from "@/constants/oreder_status_colors";

const steps = ["placed", "confirmed", "onHold", "shipped", "delivered"];
function TrackOrderPage() {
  const navigate = useNavigate();
  const order = (useLocation().state.order as IOrder) || {};
  console.log("status ", useLocation().state);
  const currentStep = useLocation().state.currentStep as number;
  return (
    <div className="flex flex-col w-full">
      <div className="flex p-6 text-fs-16 gap-3 items-center ">
        <div onClick={() => navigate(-1)} className="pl-3">
          <IoMdArrowRoundBack />
        </div>

        <CustomButton
          onClick={() => navigate(-1)}
          className="flex items-center pl-6"
        >
          <div className="flex gap-2 items-center">
            <h1>orders list</h1> <TbBackslash /> <h1>{order?._id}</h1>
          </div>
        </CustomButton>
      </div>
      <div className="flex flex-col px-4 py-4">
        <div className="flex justify-between p-6 w-full items-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col w-full gap-6 items-center"
            >
              <div className="flex flex-col gap-2 items-center">
                <div
                  className={`flex w-8 h-8 items-center justify-center rounded-full text-white font-bold transition-all duration-300 
                  ${index <= currentStep ? "bg-blue-500" : "bg-gray-300"}`}
                >
                  {index + 1}
                </div>
                <h1
                  className={`mt-2 text-sm transition-all duration-300 ${
                    index <= currentStep
                      ? "text-blue-600 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </h1>
              </div>

              <div className={`relative m-5 h-2 w-full bg-gray-300 `}>
                <div
                  className={`absolute op-0 left-0 h-full  transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-blue-500 w-full"
                      : "bg-gray-300 w-0"
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col bg-white drop-shadow-sm p-6 rounded w-full gap-6">
          <div className="flex justify-between">
            <h1
              style={{
                background: ORDER_STATUS_COLORS[order.status][1],
                color: ORDER_STATUS_COLORS[order.status][0],
              }}
              className={`rounded-md fs-10 py-1 px-2 
              md:fs-13`}
            >
              {order?.status}
            </h1>
            <h1 className="font-semibold">order statues</h1>
          </div>
          <div className="flex justify-between">
            <h1>{dateFormatter(order?.createdAt)}</h1>
            <h1 className="font-semibold">order date</h1>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <h1>{order.address.city},</h1>
              <h1>{order.address.area},</h1>
              <h1>{order.address.pinCode}</h1>
            </div>
            <h1 className="font-semibold">deliver to</h1>
          </div>
          {order.courierId && (
            <>
              <div className="flex justify-between">
                <h1 className="font-semibold">deliver partner</h1>
                <h1 className="font-semibold">estimated arrival time</h1>
              </div>
              <div className="flex justify-between w-full items-center">
                <div className="flex border border-slate-100 h-fit justify-center p-3 rounded-xl gap-3">
                  <div
                    onClick={() => navigate("/account/orders")}
                    className="bg-slate-100 rounded-full"
                  >
                    <TiUser className="bg-slate-100 border border-gray-500 rounded-full fs-39" />
                  </div>

                  <div className="flex flex-col">
                    <h1>{order.courierId.name}</h1>
                    <h1 className="text-blue-400">courier</h1>
                  </div>
                  <CustomButton className="border border-slate-200 rounded-lg shadow-sm text-blue-500 fs-16 hover:scale-95 ml-6 px-3 py-2 transition-all">
                    Contact
                  </CustomButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackOrderPage;
