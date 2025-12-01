import { Outlet } from "react-router-dom";
import { SideBar } from "../components";

export const AdminRouter = () => {
  return (
    <>
      <div className="body__admin">
        <SideBar />
        <main className="main__admin">
          <Outlet />
        </main>
      </div>
    </>
  );
};
