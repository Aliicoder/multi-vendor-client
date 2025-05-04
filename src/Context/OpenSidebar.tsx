import { PropsWithChildren, useState , createContext, SetStateAction, Dispatch} from 'react'
interface OpenSidebarType {
  openSidebar: boolean;
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

export const OpenSidebar = createContext<OpenSidebarType>({
  openSidebar: false,
  setOpenSidebar: () => {}, 
});
interface OpenSidebarProvider extends PropsWithChildren {}
function OpenSidebarProvider({children}:OpenSidebarProvider) {
  const [openSidebar,setOpenSidebar] = useState(false);
  return (
    <OpenSidebar.Provider value={{openSidebar,setOpenSidebar}}>
      {children}
    </OpenSidebar.Provider>
  )
}

export default OpenSidebarProvider