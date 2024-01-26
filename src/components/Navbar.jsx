import { useContext } from "react";
import { NavLink } from "react-router-dom";
import appLogo from "../assets/appLogo.png";
import styles from "../styles/Navbar.module.css";
import { AuthContext } from "../contexts/AuthContext";
import AboutUsPage from "../pages/AboutUsPage";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <img src={appLogo} />
      </NavLink>
      <NavLink to="/aboutUs">
        <button type="button">AboutUs</button>
      </NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to="/trips/new">
            <button type="button">New Trip</button>
          </NavLink>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/signup">
            <button type="button">Signup</button>
          </NavLink>
          <NavLink to="/login">
            <button type="button">Login</button>
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navbar;
