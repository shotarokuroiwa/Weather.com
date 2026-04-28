import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";

const Layout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <SideBar />
      </aside>

      <main className="content" style={{ marginLeft: "250px", }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
