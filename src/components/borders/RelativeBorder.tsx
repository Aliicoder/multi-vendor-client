import useSquircle from '@/hooks/useSquircle'
import { Squircle } from 'corner-smoothing'
import { PropsWithChildren } from 'react'
interface Styles extends PropsWithChildren {
  className?: string
  topClass?: string
  onClick?:() => void
}
function RelativeBorder({className,onClick,children,topClass}:Styles) {
  const cornerRadius = useSquircle()
  return (
      <div onClick={onClick} className={`${topClass} drop-shadow-sm`}>
        <Squircle cornerRadius={cornerRadius} className={className}>
          {children}
        </Squircle>
      </div>
  )
}

export default RelativeBorder