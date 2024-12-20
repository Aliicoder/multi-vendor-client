import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"
function MainLayout() { 
  return (
    < >
      <Outlet />
      <Toaster 
          toastOptions={{
            position:"top-right",
            className:"noOutline"
          }}
        />
    </>
   
  )
}

export default MainLayout