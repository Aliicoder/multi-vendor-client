import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaGithub, FaGoogle } from "react-icons/fa";
import {Form,FormControl,FormField, FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useLocation, useNavigate } from "react-router-dom"
import signupValidation from "@/utils/validations/signupValidation";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch} from "react-redux";
import { Label } from "@radix-ui/react-label";
import { useSignupMutation } from "@/store/apiSlices/authSlice";
import { setCredentials } from "@/store/Reducers/authReducer";
import toast from "react-hot-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import IconButton from "../buttons/IconButton";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { IoLogIn } from "react-icons/io5";
import tryCatch from "@/utils/functions/tryCatch";
const SignUpForm = () => {
  const [showInput,setShowInput] = useState(false)
  const [signup,{isLoading}] = useSignupMutation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const from = location?.state?.from?.pathname || "/home"
  const form = useForm<z.infer<typeof signupValidation>>({resolver: zodResolver(signupValidation)})
  const handleShowInput = (status:boolean) =>{
    if(status == true)
      return setShowInput(true)
    setShowInput(false)
  }
  async function onSubmit(values: z.infer<typeof signupValidation>) {
   await tryCatch( async () =>{
    const response = await signup(values).unwrap()
    dispatch(setCredentials(response.user))
    toast.success(response.message)
    navigate(from)
   })
  }
  return ( 
   <div className="flex justify-center items-center | w-full h-lvh bg-slate-50 
      md:w-1/2">
      <Form {...form}>
      <motion.form
            initial={{
              x:"-100vw"
            }} 
            animate={{
              x:0,
            }}
            exit={{
              x:"-100vw"
            }}
       className="relative space-8  border border-solid  p-5 rounded-sm bg-white" 
       onSubmit={form.handleSubmit(onSubmit)} >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="on" placeholder="" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" autoComplete="on" required {...field} />
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
                  <Input type={showInput ? "text" : "password"}  autoComplete="on" placeholder="" required {...field} />
                </div>      
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter The Password again</FormLabel>
              <FormControl>
                  <Input type={showInput ? "text" : "password"}  autoComplete="on" placeholder="" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
               <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex gap-3 cp-6 items-center ">
              <FormControl>
              <Checkbox
                  className=""
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
                <Label htmlFor="terms" className="p-0 !mt-0 montserrat c2">
                  I agree to the privacy policy and term
                </Label>
            </FormItem>
          )}
        />
         <div className="flex justify-end cp-24">
          <IconButton {...( isLoading == true ? dispatch: null)} text="Sign up" direction={"right"}>
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
        <h1 className="py-3 c2 mulish font-semibold text-center">Already Sign up ? <Link className="underline text-blue-400" to="/login">Sign in</Link> </h1>
      </motion.form>
    </Form>
   </div>
   );
}
 
export default SignUpForm;