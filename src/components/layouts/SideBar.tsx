import { IMainNavigators, mainNavigators } from "@/constants/navigators";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import { useLogoutMutation } from "@/store/apiSlices/authSlice";
import { cn, getInitials } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { FaArrowLeft } from "react-icons/fa";
function Sidebar() {
  const user = useSelector(selectCurrentUser);
  const [logoutMutation] = useLogoutMutation();
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  return (
    <div className="relative  py-10  flex flex-col justify-between bg-white ">
      <div />
      <div className="right-full top-0  absolute w-[100vw] h-full bg-white " />

      <div>
        <ul className="w-fit mr-6">
          {mainNavigators.map((navigator: IMainNavigators, i) => {
            let selected =
              pathname === navigator.link ||
              (navigator.link.length > 1 &&
                pathname.startsWith(navigator.link));
            return (
              <li
                className={cn(
                  selected && "text-blue-500 bg-slate-50 rounded-lg",
                  "relative"
                )}
                key={navigator.title}
              >
                <Link
                  className="my-3 p-3 gap-3  mx-5 transition-all flex montserrat items-center"
                  to={navigator.link}
                >
                  <p>{navigator.icon} </p>
                  <h3 className={`font-medium text-nowrap`}>
                    {navigator.title}
                  </h3>
                </Link>
                {navigator.subNavigators &&
                  navigator.subNavigators.length > 0 && (
                    <div
                      className={cn(
                        selected ? "flex flex-col" : "hidden",
                        "text-black"
                      )}
                    ></div>
                  )}
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={() => navigate("/")}
        className="flex montserrat items-center gap-3  rounded-l-full text-white  py-3 px-4 bg-blue-500 "
      >
        <FaArrowLeft />

        <h3 className=" font-medium ml-2">ons</h3>
      </button>
      <div className="flex rounded-lg  drop-shadow-sm bg-white border border-neutral-100 mr-5 ">
        <button
          onClick={logoutMutation}
          className="px-3 flex montserrat items-center bg-blue-50 "
        >
          <TbLogout2 className="text-red-500" />
        </button>
        <div className="  p-3 gap-5 flex items-center mr-5  ">
          <div
            id="avatar"
            className="size-10 flex shrink-0 justify-center  items-center rounded-full font-semibold ring-1 ring-offset-2
                            bg-blue-500 text-white"
          >
            {getInitials(user.name)}
          </div>
          <div className="flex flex-col font-medium max-md:hidden">
            <h1 className="text-fs-13 w-[15ch] truncate ">{user?.name}</h1>
            <h1 className="text-fs-10 w-[15ch] truncate">{user?.email}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
