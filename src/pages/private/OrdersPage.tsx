import CustomButton from "@/components/buttons/CustomButton";
import { useFetchOrdersQuery } from "@/store/apiSlices/orderSlice";
import { IOrder } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "@/utils/functions/currencyFormatter";
import { ORDER_STATUS_COLORS } from "@/constants/oreder_status_colors";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/Reducers/authReducer";
const perPage = 10;
const curPage = 1;
function OrdersPage() {
  const userId = useSelector(selectCurrentUser).userId;
  const navigate = useNavigate();
  const { data: response } = useFetchOrdersQuery(
    { userId, perPage, curPage },
    { refetchOnMountOrArgChange: true }
  );
  console.log(`response`, response);
  const handleTrackOrder = (order: IOrder, currentStep: number) => {
    navigate(`${order._id}`, { state: { order, currentStep } });
  };
  return (
    <div className="flex p-5 flex-col w-full overflow-y-scroll  hide-scrollbar ">
      <h1 className="p-5 text-blue-500 font-bold tracking-wide"> Orders</h1>

      {response?.orders &&
        response?.orders?.map((order: IOrder) => (
          <div
            key={order?.productId?._id}
            className="gap-1 flex border border-neutral-100 flex-col overflow-hidden rounded-md mt-3 mx-3 "
          >
            <div className="flex bg-white">
              <div className="basis-2/12 bg-blue-50 relative shrink-0 ">
                <img
                  className="object-cover scale-75"
                  src={order?.productId?.media[0]?.url}
                  alt=""
                />
                <div className="size-9 rounded-full flex z-10 bg-white border border-neutral-200 absolute bottom-5 right-5">
                  <h1 className="m-auto  ">{order.quantity}</h1>
                </div>
              </div>

              <div className=" flex flex-col p-6 gap-3 w-full justify-center ">
                <div className="flex gap-3">
                  <h1 className="rounded-md fs-10 py-1 px-2 bg-gray-100 text-gray-500">
                    {order?._id}
                  </h1>
                  <h1
                    style={{
                      background: ORDER_STATUS_COLORS[order.deliveryStatus][1],
                      color: ORDER_STATUS_COLORS[
                        order.deliveryStatus
                      ][0] as string,
                    }}
                    className="rounded-md fs-10 py-1 px-2 "
                  >
                    {order?.deliveryStatus}
                  </h1>
                </div>
                <div className="flex w-full fs-13 gap-3 items-center">
                  <h1 className="font-semibold">{order.productId?.name}</h1>
                </div>

                <h1 className="w-9/12 c2 line-clamp-3">
                  {order?.productId?.description}
                </h1>
                <div className="flex gap-3">
                  <h1 className="rounded-md w-fit c2 px-2 py-1">
                    {currencyFormatter("INR", order.amount)}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-3 gap-3 bg-blue-50">
              <CustomButton
                className=" h-9 flex justify-content-center items-center"
                theme="black"
              >
                cancel
              </CustomButton>
              <CustomButton
                onClick={() =>
                  handleTrackOrder(
                    order,
                    ORDER_STATUS_COLORS[order.deliveryStatus][2] as number
                  )
                }
                className=" h-9 flex justify-content-center items-center"
                theme="white"
              >
                track
              </CustomButton>
            </div>
          </div>
        ))}
    </div>
  );
}

export default OrdersPage;
