import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside>
      <nav>
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/employees">
          Employees
        </NavLink>

        <NavLink to="/dashboard/profile">
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}