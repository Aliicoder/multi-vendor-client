import { selectCurrentUser } from '@/store/Reducers/authReducer';
import { useSelector } from 'react-redux';
import { useEffect, useRef} from 'react';
import { trackElementHeight } from '@/utils/functions/resizeTrackers';
import { useNavigate } from 'react-router-dom';
import { TiUser } from "react-icons/ti";
import Searchbar from '../Searchbar';
import CustomButton from '@/components/buttons/CustomButton';
import { FaChevronDown } from "react-icons/fa";
function Header() {
  const refHeader= useRef<HTMLDivElement>(null)
  const { addresses } = useSelector(selectCurrentUser)
  const defaultAddress = addresses[0] 
  const navigate = useNavigate()
  useEffect(()=>{
    trackElementHeight(refHeader,"--header-height")
  },[])
  return (
    <div ref={refHeader} >
      <div className='p-3 | montserrat flex justify-between'>
        <div className=' gap-3 | flex flex-col'>
          <div onClick={()=>navigate("account/addresses")} className='gap-3 | flex items-center'>
            <div className='c6 | text-blue-500 font-semibold'>
              ons into 
            </div>
            <div className="c4 p-1 w-fit |  bg-blue-500  rounded-md font-bold text-white">
              {defaultAddress.type}
            </div> 
            <FaChevronDown className='c3'/>
          </div>
        {
        defaultAddress ?
        <>
          <div className='c6 gap-2 | flex items-center'>
              <span className='text-blue-500'>
                deliver to
              </span>  
              {defaultAddress.city},{defaultAddress.area},{defaultAddress.pinCode}  
          </div>
         
        </>
          :
          <CustomButton className='text-blue-500'>
            set your address 
          </CustomButton>
        }
        </div>
        <div onClick={()=>navigate("account")} 
          className=" mx-3 c9 scale-150 |  flex justify-center items-center " >
          <TiUser className='text-xl border border-blue-500 bg-slate-100 rounded-full' />
        </div>
      </div>

      <Searchbar />

    </div>
  )
}

export default Header
