import { Outlet } from "react-router-dom"
import { lazy } from "react"
import useSegment from "@/hooks/useSegment";
import useScreenSize from "@/hooks/useScreenSize";
const Header = lazy(()=>import("@/components/shared/Header"))
const Footer = lazy(()=>import("@/components/shared/Footer"));

function MainLayout() { 
  const secondeSegment = useSegment(2)
  const screenSize = useScreenSize()
  return (
    <div className="relative transition-all bg-[var(--main-color)] text-[--text-color] bg-slate-50 ">
    {
      secondeSegment === "account" && screenSize == "sm" ?
      null
      :
      <Header /> 
    }

      <Outlet />
    {
      secondeSegment === "account" && screenSize == "sm" ?
      null
      :
      <Footer /> 
    }
    </div>
  )
}

export default MainLayout