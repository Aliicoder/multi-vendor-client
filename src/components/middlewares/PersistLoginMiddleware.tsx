import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRefreshMutation } from "@/store/apiSlices/authSlice";
import { setCredentials } from "@/store/Reducers/authReducer";
import Loader from "../portals/Loader";

function PersistLoginMiddleware() { 
  const [ refreshMutation ] = useRefreshMutation();
  const [isLoading,setIsLoading] = useState(true)
  const dispatch = useDispatch()  
  const navigate = useNavigate()
  useEffect(()=>{
    const refreshUser = async () =>{
      try{
        let response = await refreshMutation({}).unwrap() 
        dispatch(setCredentials(response.user))
        navigate("/home")
      }catch(error){}finally{
        setIsLoading(false)
      }
    }  
    refreshUser()
  },[])
  return (
    <>
      <Loader isLoading={isLoading} />
      { 
        isLoading ? 
        null 
        : 
        <Outlet />
      }
    </>
  )
}

export default PersistLoginMiddleware