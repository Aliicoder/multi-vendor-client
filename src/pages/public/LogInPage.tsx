import { lazy, Suspense } from "react"
const LogInForm = lazy(()=>import("@/components/forms/LogInForm"))
function LogInPage() {
  return (
    <div className="relative flex ">
      <div className="hidden justify-center items-center 
        md:flex md:w-1/2">
        <img src="/svgs/login.svg" className=" w-1/2" alt="" />
      </div>
      <Suspense fallback={null}>
        <LogInForm />
      </Suspense>
    </div>
  )
}

export default LogInPage