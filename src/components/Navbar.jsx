import { useContext } from "react";
import { NavLink } from "react-router-dom";
import appLogo from "../assets/appLogo.png";
import styles from "../styles/Navbar.module.css";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  

  return (
    <nav className={styles.navbar}>
      {isAuthenticated ? (
        <>
          <NavLink to="/trips">
            <img src={appLogo} />
          </NavLink>
          <NavLink to="/trips/new">
            <button type="button">New Trip</button>
          </NavLink >
          <NavLink to="/">
          <button type="button" onClick={logout}>
            Logout
          </button>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/">
            <img src={appLogo} />
          </NavLink>
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
