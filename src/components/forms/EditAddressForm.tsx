import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import addressValidation from "@/utils/validations/addressValidation"
import tryCatch from "@/utils/functions/tryCatch"
import { IAddress } from "@/utils/types/types"
import { useEffect } from "react"
import { useEditAddressMutation } from "@/store/apiSlices/clientSlice"
import { useDispatch } from "react-redux"
import { setAddresses } from "@/store/Reducers/authReducer"
interface IEditAddressForm {
  address: IAddress
}
function EditAddressForm({address:{_id,area,city,phone,pinCode,province,type}}:IEditAddressForm) {
  const [editAddressMutation] = useEditAddressMutation()
  const form = useForm<z.infer<typeof addressValidation>>({resolver: zodResolver(addressValidation)})
  const dispatch = useDispatch()

  useEffect(() =>{
    form.setValue("_id",_id)
    form.setValue("type",type)
    form.setValue("province",province)
    form.setValue("city",city)
    form.setValue("area",area)
    form.setValue("phone",phone)
    form.setValue("pinCode",pinCode)
  },[])

  async function  onSubmit(values: z.infer<typeof addressValidation>) {
    await tryCatch( async ()=> {
      const response = await editAddressMutation(values).unwrap()
      dispatch(setAddresses(response.addresses))
    })
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  bg-white border p-6 rounded-md">
      <div className="flex rounded-md gap-3">

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-1/2 relative max-h-16">
              <FormLabel >Type</FormLabel>
              <Select  onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="border">
                  <SelectTrigger>
                    <SelectValue className="border" placeholder="Location Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent side="bottom" align="end" sideOffset={4}>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
      <div className="flex gap-3">

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>Area</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
      <div className="flex gap-3">

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pinCode"
          render={({ field }) => (
            <FormItem className="basis-1/2">
              <FormLabel>Pin Code</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
    
      <div className="flex gap-3">
        <Button type="submit">Save</Button>
      </div>

    </form>
  </Form>
  )
}

export default EditAddressForm