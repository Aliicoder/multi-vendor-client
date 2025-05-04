import { PropsWithChildren } from "react";
import CurrencyProvider from "./Currency";
import OpenSidebarProvider from "./OpenSidebar";
interface ThemeContext extends PropsWithChildren {}
function Contexts({ children }: ThemeContext) {
  return (
    <CurrencyProvider>
      <OpenSidebarProvider>{children}</OpenSidebarProvider>
    </CurrencyProvider>
  );
}

export default Contexts;
