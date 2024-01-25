import { useContext } from "react";
import { NavLink } from "react-router-dom";
import appLogo from "../assets/appLogo.png";
import styles from "../styles/Navbar.module.css";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <NavLink to="/">
        <img src={appLogo} />
      </NavLink>
      {isAuthenticated ? (
        <>
          <li>
            <NavLink to="/trips/new">New Trip</NavLink>
          </li>
          <li>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </>
      )}
    </nav>
  );
};

export default Navbar;
