import { useEffect, useState } from "react";

const useScreenSize = () =>{
  const [screenSize, setScreenSize] = useState<"sm"|"md"|"lg">("sm");
  const updateCornerRadius = () => {
    if (window.matchMedia("(min-width: 1024px)").matches) {
      setScreenSize("lg");
    } else if (window.matchMedia("(min-width: 768px)").matches) {
      setScreenSize("md"); 
    } else {
      setScreenSize("sm"); 
    }
  };

  useEffect(() => {
    updateCornerRadius();
    window.addEventListener("resize", updateCornerRadius);
    return () => {
      window.removeEventListener("resize", updateCornerRadius);
    };
  }, []);

  return screenSize
}

export default useScreenSize