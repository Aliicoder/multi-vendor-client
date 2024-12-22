import useScreenSize from "@/hooks/useScreenSize"
import NormalHeader from "./header/NormalHeader"
import SmallHeader from "./header/SmallHeader"

function Header() {
  const screenSize = useScreenSize()
  return (
    screenSize === "sm" ?
      <SmallHeader />
      :
      <NormalHeader />
   
  )
}

export default Header

