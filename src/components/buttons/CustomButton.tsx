import React, { PropsWithChildren } from 'react'
interface ButtonProps extends PropsWithChildren {
  text?:string
  type?: "submit" | "reset" | "button" | undefined
  disabled?:boolean
  direction?: "left" | "right"
  className?:string
  onClick?:(event: React.MouseEvent<HTMLButtonElement>) => void;
}
function CustomButton({children,className,disabled=false,text,direction="right",type,onClick}:ButtonProps) {
  return (
    <button  type={type} disabled={disabled} className={className} onClick={onClick}>
      {direction == "left" && children}
      {text&&<span>{text}</span>}
      {direction == "right" && children}   
    </button>
  )
}

export default CustomButton