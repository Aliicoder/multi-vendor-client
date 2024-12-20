import { TbLocationQuestion } from "react-icons/tb";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/Reducers/authReducer";
import { SlLocationPin } from "react-icons/sl";
import { useEffect, useRef } from "react";

function MainNav() {   
  const { addresses } = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const refMainNav = useRef<HTMLDivElement>(null)
  const mainNav = refMainNav.current
  const defaultAddress = addresses[0]

  useEffect(()=>{
    const handleResize = () => {
      if (mainNav) {
        const height = mainNav.clientHeight;
        document.documentElement.style.setProperty("--header-height", `${height}`);
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    if (refMainNav.current) 
      resizeObserver.observe(refMainNav.current);
  },[])

  return (
    <div ref={refMainNav} className={` relative   montserrat bg-white  transition-all  items-center px-10 montserrat h-10   lg:flex`}>
      <div className="container mx-auto flex justify-between ">
        <div className="flex items-center gap-2">
          {
            defaultAddress ? 
              <>
                <SlLocationPin className="c2" />
                <span className="c2" onClick={()=>navigate("/account/addresses")}>
                  {defaultAddress?.city} ,
                  {defaultAddress?.area} ,
                  {defaultAddress?.pinCode}
                </span>
              </>
            :
            <>
              <TbLocationQuestion className="c2" />
              <span className="c2" onClick={()=>navigate("/account/addresses")}>set your location</span>
            </>
          }
        </div>
  
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
          <FaFacebookF className="c2" />
           <FaInstagram className="c2" />
           <BsTwitterX className="c2" />
          </div>
          <div className="flex items-center gap-2">
              <RiCustomerService2Line className="c2" />
              <Link to={"/id/support"} className="c2 hover:underline cursor-pointer">support</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNav