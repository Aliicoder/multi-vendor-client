import { Outlet } from "react-router-dom";
import SideBar from "@/components/layouts/SideBar";

function AccountLayout() {
  return (
    <>
      <div className="container flex mx-auto h-[100svh]">
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}

export default AccountLayout;
