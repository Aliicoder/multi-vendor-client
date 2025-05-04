import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function PaymentMethods() {
  return (
    <Select >
      <SelectTrigger  className=" mt-3 | w-full rounded-lg">
        <SelectValue   placeholder="Choose Payment method" />
      </SelectTrigger>
      <SelectContent className="montserrat">
        <SelectItem  value="cod">cash on delivery</SelectItem>
        <SelectItem disabled value="upi">UPI</SelectItem>
        <SelectItem disabled value="card">Stripe</SelectItem>
      </SelectContent>
    </Select> 
  )
}

export default PaymentMethods

// onValueChange={(value: IPaymentOptions) => setPaymentMethod(value)}