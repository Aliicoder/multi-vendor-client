import { IMainNavigators , mainNavigators } from '@/constants/navigators'
import { Link } from 'react-router-dom'
import { TbLogout2 } from "react-icons/tb";
import useSegment from '@/hooks/useSegment';
import tryCatch from '@/utils/functions/tryCatch';
import { logout } from '@/store/Reducers/authReducer';
import { useLogoutMutation } from '@/store/apiSlices/authSlice';
import { useDispatch } from 'react-redux';

function SideBar() {
  const secondSegment = useSegment(2)
  const [logoutMutation] = useLogoutMutation()
  const dispatch = useDispatch()
  async function handleLogout() {
    await tryCatch( async () =>{
      const response = await logoutMutation({}).unwrap();  console.log("response >> ",response)
      dispatch(logout())
    })
  }
  return (
    <div className={`gap-6 pr-10 | relative | flex flex-col justify-center border-r  bg-white `} >
  
      <div className='gap-3 | flex flex-col'>
        {
          mainNavigators.map((navigator:IMainNavigators)=>
            <Link key={navigator.title} 
              className={` ${secondSegment == navigator.segment ? "text-blue-600 bg-slate-50 rounded-lg":""}
                relative px-4 py-2 gap-3  flex montserrat items-center  transition-all `} 
              to={navigator.link} >
              <p className='c4'>{navigator.icon} </p>
                <h3 className={` c3 font-medium `}>
                  {navigator.title}
                </h3>
              
            </Link>  
          )
        }
      </div>
      <button 
        onClick={handleLogout}
        className={`p-4 gap-3  flex montserrat items-center rounded-md`}  >
        <TbLogout2 />
          <h3 className={`c3 font-medium text-nowrap`}>
            Logout
          </h3>
      </button>

      <div className='absolute h-full bg-white w-[100vw] right-full' />
    </div>
  )
}

export default SideBar

// {
//   navigator.subNavigators && navigator.subNavigators.length > 0 && 
//   <div className={` ${firstSegment === navigator.title.toLowerCase() ? "flex flex-col": "hidden"} text-black`}>
//     {
//        navigator.subNavigators.map((subNavigator:ISubNavigator) =>(
//         <Link key={subNavigator.title} className='transition-all flex montserrat items-center gap-3  mx-5  p-[3%]' to={subNavigator.link}>
//           <p className='c4 opacity-0'>{navigator.icon} </p>
//           <h1 className={`${secondSegment === subNavigator.segment ? "font-semibold":""}`}>
//             {subNavigator.title}
//           </h1>
//         </Link>
//       ))
//     }
//   </div>
// }