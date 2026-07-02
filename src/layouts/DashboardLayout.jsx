import {Outlet} from "react-router-dom"

export default function DashboardLayout() {
  return (
    <>
      <h1>Navbar</h1>
      <h1>Sidebar</h1>
      <Outlet/>
    </>
  );
}
