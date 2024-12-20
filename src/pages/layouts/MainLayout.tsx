import { Outlet } from "react-router-dom"
import { lazy } from "react"
const Header = lazy(()=>import("@/components/shared/Header"))
const Footer = lazy(()=>import("@/components/shared/Footer"));

function MainLayout() { 

  return (
    <div className="relative transition-all bg-[var(--main-color)] text-[--text-color] bg-slate-50 ">
      <Header /> 

      <Outlet />

      <Footer /> 
    </div>
  )
}

export default MainLayout