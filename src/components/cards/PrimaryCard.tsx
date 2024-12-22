import { PropsWithChildren } from 'react'
import Border from '../borders/Border'
function PrimaryCard({children}:PropsWithChildren) {
  return (
    <Border
      topStyle="p-[1px]  bg-slate-200 "
      bottomStyle="group flex flex-col h-full bg-white" 
      cornerRadius={16}>
      {children}
    </Border>    
  )
}

export default PrimaryCard