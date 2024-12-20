import { lazy, Suspense } from "react"
const SignUpForm = lazy(()=>import("@/components/forms/SignUpForm"))
function SignUpPage() {
  return (
  <>
    <div className="relative flex ">
      <Suspense fallback={null}>
        <SignUpForm />
      </Suspense>
      <div className="w-full | hidden justify-center items-center 
        md:flex md:w-1/2">
        <img src="/svgs/signup.svg" className=" w-1/2" alt="" />
      </div>
    </div>
  </>
  )
}

export default SignUpPage

