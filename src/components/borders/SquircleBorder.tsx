import useSquircle from '@/hooks/useSquircle'
import { Squircle } from 'corner-smoothing'
import { MotionProps } from 'framer-motion';
import { HTMLProps, ReactNode } from 'react'
interface ISquircle extends MotionProps, Omit<HTMLProps<HTMLDivElement>, keyof MotionProps> {
  className?: string;
  children?: ReactNode;
  onClick?: (e: any) => void
}
function SquircleBorder({className,children,onClick}:ISquircle) {
  const cornerRadius = useSquircle()
  return (
    <Squircle onClick={onClick} cornerRadius={cornerRadius} className={className}>
      {children}
    </Squircle>
  )
}

export default SquircleBorder