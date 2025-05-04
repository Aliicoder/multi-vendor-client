import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import signupValidation from "@/validations/signupValidation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@radix-ui/react-label"
import { motion } from "framer-motion"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import { useSignupMutation } from "@/store/apiSlices/authSlice"
import { useState } from "react"
import { errorToast, successToast } from "@/lib/utils"
import CustomButton from "../buttons/CustomButton"
interface ISignUpForm {
  className?: string
}
const SignupForm = ({ className }: ISignUpForm) => {
  const [signup] = useSignupMutation()
  const [showInput, setShowInput] = useState(false)
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof signupValidation>>({
    resolver: zodResolver(signupValidation),
  })

  async function onSubmit(values: z.infer<typeof signupValidation>) {
    try {
      const response = await signup(values).unwrap()
      successToast(response)
      navigate("/login")
    } catch (error: any) {
      console.log("error >>", error)
      errorToast
    }
  }
  return (
    <div className={className}>
      <Form {...form}>
        <motion.form
          className="flex flex-col bg-white border border-solid p-5 rounded-sm gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    autoComplete="on"
                    placeholder=""
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
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
                    {showInput ? (
                      <VscEye
                        onClick={() => setShowInput(false)}
                        className="-translate-x-1/2 -translate-y-1/2 absolute right-2 top-1/2"
                      />
                    ) : (
                      <VscEyeClosed
                        onClick={() => setShowInput(true)}
                        className="-translate-x-1/2 -translate-y-1/2 absolute right-2 top-1/2"
                      />
                    )}
                    <Input
                      type={showInput ? "text" : "password"}
                      autoComplete="on"
                      placeholder=""
                      required
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex cp-6 gap-3 items-center">
                <FormControl>
                  <Checkbox
                    className=""
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <Label htmlFor="terms" className="p-0 !mt-0 c2 montserrat">
                  I agree to the privacy policy and term
                </Label>
              </FormItem>
            )}
          />
          <CustomButton theme="black" className="">
            Signup
          </CustomButton>
          <h1 className="text-center text-fs-13 font-semibold mulish">
            Already Sign up ?{" "}
            <Link className="text-blue-400 underline" to="/login">
              Sign in
            </Link>{" "}
          </h1>
        </motion.form>
      </Form>
    </div>
  )
}

export default SignupForm
