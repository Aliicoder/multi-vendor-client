import { IMainNavigators, mainNavigators } from '@/constants/navigators';
import { Link } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import useSegment from '@/hooks/useSegment';
import tryCatch from '@/utils/functions/tryCatch';
import { logout } from '@/store/Reducers/authReducer';
import { useLogoutMutation } from '@/store/apiSlices/authSlice';
import { useDispatch } from 'react-redux';
import useScreenSize from '@/hooks/useScreenSize';

function SideBar() {
  const thirdSegment = useSegment(3);
  const screenSize = useScreenSize()
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useDispatch();

  async function handleLogout() {
    await tryCatch(async () => {
      const response = await logoutMutation({}).unwrap();
      console.log("response >> ", response);
      dispatch(logout());
    });
  }

  return (
    thirdSegment === undefined || screenSize !== "sm" ? 
      <div className="mx-auto w-full gap-3 px-5 | relative flex flex-col justify-center | border-r bg-white
        md:w-fit md:items-start">
        { mainNavigators.map((navigator: IMainNavigators) => (
        <Link
          to={navigator.link}
          key={navigator.title}
          className={`${
            thirdSegment === navigator.segment
              ? "text-blue-600 bg-slate-50 rounded-lg"
              : ""
          } px-4 py-2 gap-3 | relative flex montserrat items-center transition-all`}
        >
          <p
            className="c9 p-2 | bg-gray-50 rounded-full
          md:c4 md:scale-100"
          >
            {navigator.icon}
          </p>
          <h3
            className={`c9 font-medium 
          md:c4`}
          >
            {navigator.title}
          </h3>
        </Link>
        ))}
        <button onClick={handleLogout}
          className={`px-4 mt-10 py-2 gap-3 | flex montserrat items-center rounded-md`}>
          <TbLogout2 className="c9  
            md:c4"/>
          <h3 className={`c9 font-medium 
            md:c4`}>
            Logout
          </h3>
        </button>

        <div className="absolute h-full bg-white w-[100vw] right-full" />
      </div>
     :
     null
  );
}

export default SideBar;