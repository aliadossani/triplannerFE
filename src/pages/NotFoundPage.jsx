import { NavLink } from "react-router-dom";
import appLogo from "../assets/applogo_color.png";
import "../styles/NotFound.css";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const NotFoundPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated ? (
        <>
          <NavLink className="NotFound" to="/trips">
            <h1>404 Page Not Found, click here to go back to your Homepage</h1>
            <img src={appLogo} />
          </NavLink>
        </>
      ) : (
        <>
          <NavLink className="NotFound" to="/">
            <h1>404 Page Not Found, click here to go back to the Homepage</h1>
            <img src={appLogo} />
          </NavLink>
        </>
      )}
    </>
  );
};

export default NotFoundPage;
