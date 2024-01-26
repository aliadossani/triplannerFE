import { NavLink } from "react-router-dom";
import appLogo from "../assets/appLogo.png";
import { Center } from "@mantine/core";
import "../styles/NotFound.css";

const NotFoundPage = () => {
  return (
    <NavLink className="NotFound" to="/">
      <h2>404 Page Not Found, click here to go back to the Homepage</h2>
      <img src={appLogo} />
    </NavLink>
  );
};

export default NotFoundPage;
