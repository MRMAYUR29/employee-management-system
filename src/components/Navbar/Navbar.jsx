import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { logout } from "../../redux/slices/authSlice";
import { clearAuth } from "../../utils/authStorage";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    clearAuth();
    navigate("/");
  };

  return (
    <nav>
      <h3>Employee Management</h3>

      <div>
        <span>{user?.name}</span>
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}