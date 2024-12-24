import { selectCurrentUser } from '@/store/Reducers/authReducer';
import { useSelector } from 'react-redux';
import { useEffect, useRef} from 'react';
import { trackElementHeight } from '@/utils/functions/resizeTrackers';
import { useNavigate } from 'react-router-dom';
import { TiUser } from "react-icons/ti";
import Searchbar from '../Searchbar';
import WishList from '../WishList';
import Cart from '../Cart';

function NormalHeader() {
  const refHeader= useRef<HTMLDivElement>(null)
  const user = useSelector(selectCurrentUser); 
  const navigate = useNavigate()
  useEffect(()=>{
    trackElementHeight(refHeader,"--header-height")
  },[])
  return (
    <div ref={refHeader} className='top-0 | sticky  border-b border-slate-100 
    before:content-[""] before:w-lvw  before:h-full before:left-0  before:absolute before:bg-white z-50 before:z-0'>

    <div className="z-10 relative container mx-auto p-[2%]  flex justify-between  flex-wrap  gap-3 ">
    
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

export default NormalHeader