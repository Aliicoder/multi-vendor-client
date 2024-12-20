import { Squircle } from 'corner-smoothing'
import { PropsWithChildren } from 'react'
interface Styles extends PropsWithChildren {
  cornerRadius: number
  topStyle?: string
  bottomStyle?: string
  onClick?:() => void
}
function Border({topStyle,bottomStyle,cornerRadius,onClick,children}:Styles) {
  return (
      <Squircle onClick={onClick} cornerRadius={cornerRadius} className={topStyle}>
        <Squircle cornerRadius={cornerRadius} className={bottomStyle}>
          {children}
        </Squircle>
      </Squircle>
  )
}

export default Border