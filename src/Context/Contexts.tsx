import { PropsWithChildren } from 'react'
import ThemeProvider from './ThemeContext'
interface ThemeContext extends PropsWithChildren{}
function Contexts({children}:ThemeContext){
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

export default Contexts