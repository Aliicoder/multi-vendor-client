import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaGithub, FaGoogle } from "react-icons/fa";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,FormDescription} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useLocation, useNavigate } from "react-router-dom"
import loginValidation from "@/utils/validations/loginValidation";
import toast from "react-hot-toast";
import { useLoginMutation } from "@/store/apiSlices/authSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/Reducers/authReducer";
import IconButton from "../buttons/IconButton";
import { IoLogIn } from "react-icons/io5";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { useState } from "react";
import { motion } from "framer-motion";
import tryCatch from "@/utils/functions/tryCatch";
const LogInForm = () => {
  const [showInput,setShowInput] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const [login,{isLoading}] = useLoginMutation()
  const from = location?.state?.from?.pathname || "/" 
  const form = useForm<z.infer<typeof loginValidation>>({resolver: zodResolver(loginValidation),})
  const handleShowInput = (status:boolean) =>{
    if(status == true)
      return setShowInput(true)
    setShowInput(false)
  }
  async function onSubmit(values: z.infer<typeof loginValidation>) {
    await tryCatch( async ()=>{
      const response = await login(values).unwrap();console.log(response)
      dispatch(setCredentials(response.user))
      toast.success(response.message)
      navigate(from)
    })
  }
  return ( 
   <div className=" w-full | flex justify-center items-center | h-lvh bg-slate-50  
    md:w-1/2 ">
      <Form {...form}>
      <motion.form
          initial={{
            x:"100vw"
          }} 
          animate={{
            x:0,
          }}
          exit={{
            x:"100vw"
          }}
       className="relative space-8  border border-solid  p-5 rounded-sm bg-white" 
       onSubmit={form.handleSubmit(onSubmit)} >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  { 
                    showInput ? 
                    <VscEye onClick={()=>handleShowInput(false)} className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2"/>
                    :
                    <VscEyeClosed onClick={()=>handleShowInput(true)} className="absolute top-1/2 right-2 -translate-x-1/2 -translate-y-1/2" />
                  }
                  <Input type={showInput ? "text" : "password"} placeholder="Enter your password"  {...field} />
                </div>
              </FormControl>
              <FormDescription>
                Forgot your password ? <span className="underline cursor-pointer">change password</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex gap-3 cp-6 items-center mt-3 ">
              <FormControl>
              <Checkbox
                  className=""
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
                <Label htmlFor="terms" className="p-0 !mt-0">
                  Remember me
                </Label>
            </FormItem>
          )}
        />
        <div className="flex justify-end cp-24">
          <IconButton {...( isLoading == true ? dispatch: null)} text="Login" direction={"right"}>
            <IoLogIn />
          </IconButton>
        </div>
        <div className="flex justify-center">
          <h1 className="font-medium">or</h1>
        </div>
        <div className="flex  gap-3 mt-4 ">
          <IconButton className="border bg-white hover:bg-slate-50 text-black" text="via Google" direction={"left"}>
            <FaGoogle className="text-red-500" />
          </IconButton>
          <IconButton className="border bg-white hover:bg-slate-50 text-black" text="via Github" direction={"left"}>
            <FaGithub />
          </IconButton>
        </div>
        <h1 className="py-3 c2 mulish font-semibold text-center">do you have account ? <Link className="text-blue-400 underline" to="/signup">Sign Up</Link> </h1>
      </motion.form>
    </Form>
   </div>
   );
}
 
export default LogInForm;