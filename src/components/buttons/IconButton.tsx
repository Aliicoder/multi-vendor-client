import { PropsWithChildren } from 'react'
import { Button } from "@/components/ui/button"
interface ButtonProps extends PropsWithChildren {
  text?:string
  type?: "submit" | "reset" | "button" | undefined
  disabled?:boolean
  direction: "left" | "right"
  className?:string
  onClick?:() => void
  form?:string
}
function IconButton({children,className,disabled=false,text,direction,type,onClick,form}:ButtonProps) {
  return (
      <Button form={form} type={type} disabled={disabled} className={`${className}  flex gap-2 cp-6 h-fit items-center`} onClick={onClick}>
          {direction == "left" && children}
          {text&&<span>{text}</span>}
          {direction == "right" && children}   
      </Button>
  )
}

export default IconButton