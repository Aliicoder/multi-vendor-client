import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { trackElementHeight } from "@/utils/functions/resizeTrackers";
import { useNavigate } from "react-router-dom";
import WishList from "./WishList";
import Cart from "./Cart";
import { LuBrainCircuit } from "react-icons/lu";
import { cn, getInitials } from "@/lib/utils";
import Address from "./Address";
import { FaLocationArrow } from "react-icons/fa";
import AddAddressPortal from "@/components/portals/AddAddressPortal";
import { FaLocationDot } from "react-icons/fa6";
import { CurrencySelector } from "./CurrencySelector";
import LanguageSelector from "./LanguageSelector";
import Searchbar from "./Searchbar";
interface INormalHeader {
  className?: string;
}
function Header({ className }: INormalHeader) {
  const [addAddress, setAddAddress] = useState(false);
  const refHeader = useRef<HTMLDivElement>(null);
  const user = useSelector(selectCurrentUser);
  console.log("user ", user);
  const navigate = useNavigate();
  useEffect(() => {
    trackElementHeight(refHeader, "--header-height");
  }, []);
  return (
    <>
      <AddAddressPortal addAddress={addAddress} setAddAddress={setAddAddress} />
      <section
        ref={refHeader}
        className={cn(
          className,
          "sticky z-50 flex flex-col bg-white montserrat"
        )}
      >
        <div className="bg-blue-500 h-9 w-full mx-auto flex justify-between">
          <div className="container flex justify-between h-full  gap-3 items-center mx-auto">
            <div className="text-white">
              {user.addresses[0] ? (
                <div className="flex text-fs-13 gap-3 items-center">
                  <FaLocationDot className="text-fs-10" />
                  <Address address={user.addresses[0]} />
                </div>
              ) : (
                <div
                  onClick={() => setAddAddress(true)}
                  className="flex text-fs-13 cursor-pointer gap-3 hover:underline items-center"
                >
                  <FaLocationArrow className="text-fs-10" />

                  <h1>Enter your Address </h1>
                </div>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <CurrencySelector />
              <LanguageSelector />
            </div>
          </div>
        </div>

        <div className="container flex justify-between p-10 w-full gap-3 items-center mx-auto z-10">
          <h1
            onClick={() => navigate("/")}
            className="text-fs-25 cursor-pointer font-semibold"
          >
            ons
          </h1>

          <Searchbar />

          <div className="flex justify-between gap-20 items-center px-3">
            <div className="flex gap-4 items-center">
              <div onClick={() => navigate("/ai-search")} className="">
                <LuBrainCircuit className="c4" />
              </div>
              <WishList />
              <Cart />
            </div>

            <div className="flex gap-5 items-center">
              <div className="flex flex-col text-right">
                <h1 className="c2 font-medium">{user?.name}</h1>

                <h1 className="c2">account</h1>
              </div>
              <div
                id="avatar"
                onClick={() => navigate("/account/orders")}
                className="size-10 flex shrink-0 justify-center  items-center rounded-full font-semibold ring-1 ring-offset-2
                            bg-blue-500 text-white"
              >
                {getInitials(user.name)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
