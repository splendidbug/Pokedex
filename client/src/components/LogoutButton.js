import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LogInOutButton.css";
import LogoutIcon from "@mui/icons-material/Logout";
const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <div className="LogOut" onClick={() => logout({ returnTo: window.location.origin })}>
      {<LogoutIcon sx={{ fontSize: 25 }} />}
    </div>
  );
};

export default LogoutButton;
