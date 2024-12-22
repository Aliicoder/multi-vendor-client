import { Outlet } from "react-router-dom"
import { useRef } from "react"
import SideBar from "@/components/layouts/SideBar"
import useScreenSize from "@/hooks/useScreenSize"
import BottomBar from "@/components/shared/BottomBar"

function AccountLayout() {
  const refProfileLayout = useRef<HTMLDivElement>(null)
  const screenSize = useScreenSize()
  return (
    <div ref={refProfileLayout} style={{ height: screenSize != "sm" ? `calc(100vh - var(--header-height))`: "100vh" }} 
      className={`relative container mx-auto flex `}>
      <SideBar />
      <Outlet/>
      <BottomBar />
    </div>
  )
}

export default AccountLayout


