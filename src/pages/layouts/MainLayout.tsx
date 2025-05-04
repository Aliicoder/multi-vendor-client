import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="bg-[#eff6ff80]">
      <Outlet />
    </div>
  );
}

export default MainLayout;
