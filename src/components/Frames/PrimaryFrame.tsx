import { PropsWithChildren } from 'react'
interface IPrimaryFrame extends PropsWithChildren {
  className?: string ;
}
function PrimaryFrame({children,className}:IPrimaryFrame) {
  return (
    <div className={` ${className} gap-2 p-6  `}>
      {children}
    </div>
  )
}

export default PrimaryFrame