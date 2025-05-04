import { Toaster } from "react-hot-toast"
import { Outlet } from "react-router-dom"
function RootLayout() { 
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

export default RootLayout