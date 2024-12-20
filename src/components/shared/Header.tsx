import { selectCurrentUser } from '@/store/Reducers/authReducer';
import { useSelector } from 'react-redux';
import { useEffect, useRef} from 'react';
import { trackElementHeight } from '@/utils/functions/resizeTrackers';
import Searchbar from './Searchbar';
import WishList from './WishList';
import Cart from './Cart';
import { useNavigate } from 'react-router-dom';
import { TiUser } from "react-icons/ti";
function Header() {
  const refHeader= useRef<HTMLDivElement>(null)
  const user = useSelector(selectCurrentUser); 
  const navigate = useNavigate()
  //const defaultAddress = user?.addresses ? user.addresses[0] : {}
  useEffect(()=>{
    trackElementHeight(refHeader)
  },[])
  return (
  <div ref={refHeader} className='top-0 | sticky  border-b   
    before:content-[""] before:w-lvw  before:h-full before:left-0  before:absolute before:bg-white z-50 before:z-0'>

    <div className="z-10 relative container mx-auto p-[2%]  flex justify-between  flex-wrap  gap-3 ">
    

        <div className='p-3 | montserrat flex justify-between 
          md:hidden'>
          <div>
            <div> 
              souq.
            </div>
            <div>
              {
                "set your address"
              }
            </div>
          </div>
          <div className='basis-1/12 aspect-square rounded-full overflow-hidden'>
           <img className='' src={"/fb.jpg"} alt="" />
          </div>
        </div>
        {/* in small screens  */}

      <h1 onClick={()=>navigate('/')} className='c5 hidden font-semibold
       md:block'>
        souq 
      </h1>

      <Searchbar />

      <div className='items-center gap-12 w-full justify-between px-3 hidden md:flex  md:w-auto md:px-0'>
        <div className='flex gap-2 md:gap-4 items-center'>
          <WishList />
          <Cart />
        </div>
  
        <div className='relative hidden items-center  gap-5 
          md:flex'>
          <div className='flex flex-col text-right'>
            <h1 className='c2 font-medium' >
              {user?.name} 
            </h1>

            <h1 className='c2' >
              account
            </h1>
          </div>

          <div onClick={()=>navigate("account/orders")} className=" bg-slate-100 rounded-full" >
            <TiUser className='c7' />
          </div>

        
        </div>

      </div>
    </div>
  </div>
  )
}

export default Header


// {
//   user ?

//   <div className='relative hidden items-center  gap-5 
//     md:flex'>
//     <div className='flex flex-col text-right'>
//       <h1 className='c2 font-medium' >{user?.name ? user.name : <Link to={'login'} >log in</Link> }</h1>
//       <h1 className='c2' >{role == 1999 ?"admin":(role == 2000 ?"seller":"account")}</h1>
//     </div>
//     <div onClick={()=>setIsOpenClientMenu(prev=>!prev)} className={`${isOpenClientMenu ?"transition-all !rotate-180 ":"" } 
//        max-w-8 c2 aspect-square  rounded-full  overflow-hidden rotate-0 `}>
//       <FaChevronDown />
//     </div>
//     <ul className={`${isOpenClientMenu ?"block":"hidden"}  
//       absolute  montserrat font-medium top-full py-[10%] px-[10%] bg-white c4 border rounded-md right-0 mt-[40%]`}>
//       <Link to={"/dashboard/accountSettings"} className='p-[4%] text-nowrap'>Profile</Link>
//       <li className='p-[4%] text-nowrap '>
//         <LinkButton className='' text='Orders' to={'dashboard/orders'} direction={'left'}>
//          <GiPathDistance className='c5' />
//         </LinkButton>
//       </li>
//       <li className='p-[4%] text-nowrap'>Profile</li>
//       <li className='p-[4%] text-nowrap'>Log out</li>
//     </ul>
//   </div>
//   :
//   <div className='c3 py-3 gap-3 hidden  justify-center  items-center
//     md:flex'>
//     <LinkButton className='px-[4%] py-[2%] font-semibold bg-transparent border' to={"login"} text='Login' direction={'right'}>
//       <IoLogIn />
//     </LinkButton>
//     <LinkButton className='px-[4%] py-[2%] text-nowrap font-semibold bg-transparent ' to={"signup"} text='Sign up' direction={'right'}> 
//     </LinkButton>
//   </div>
// }


// <ul className={`${isOpenClientMenu ?"block":"hidden"}  
//   absolute  montserrat font-medium top-full py-[10%] px-[10%] bg-white c4 border rounded-md right-0 mt-[40%]`}>
//   <Link to={"/dashboard/accountSettings"} className='p-[4%] text-nowrap'>Profile</Link>
//   <li className='p-[4%] text-nowrap '>
//     <LinkButton className='' text='Orders' to={'dashboard/orders'} direction={'left'}>
//       <GiPathDistance className='c5' />
//     </LinkButton>
//   </li>
//   <li className='p-[4%] text-nowrap'>
//     Profile
//   </li>
//   <li className='p-[4%] text-nowrap'>
//     Log out
//   </li>
// </ul>