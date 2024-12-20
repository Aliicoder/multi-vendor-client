import { Outlet } from "react-router-dom"
import { useRef } from "react"
import SideBar from "@/components/layouts/SideBar"

function AccountLayout() {
  const refProfileLayout = useRef<HTMLDivElement>(null)
  return (
    <div ref={refProfileLayout} style={{ height: `calc(100vh - var(--header-height))` }} 
      className={`relative container mx-auto flex `}>
      <SideBar />
      <Outlet/>
    </div>
  )
}

export default AccountLayout


