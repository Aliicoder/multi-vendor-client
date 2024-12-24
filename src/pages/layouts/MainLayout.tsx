import { Outlet } from "react-router-dom"

function MainLayout() { 

  return (
    <div className="relative transition-all bg-[var(--main-color)] text-[--text-color] bg-slate-50 ">
   

      <Outlet />
  
    </div>
  )
}

export default MainLayout