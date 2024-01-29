import { useContext } from "react";
import { NavLink } from "react-router-dom";
import appLogo from "../assets/appLogo.png";
import styles from "../styles/Navbar.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@mantine/core";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav>
      {isAuthenticated ? (
        <div className={styles.navbar}>
          <NavLink to="/trips">
            <img src={appLogo} />
          </NavLink>
          <NavLink to="/trips/new">
            <Button mt="md" type="button">
              New Trip
            </Button>
          </NavLink>
          <NavLink to="/">
            <Button mt="md" type="button" onClick={logout}>
              Logout
            </Button>
          </NavLink>
        </div>
      ) : (
        <div className={styles.navbar}>
          <NavLink to="/">
            <img src={appLogo} />
          </NavLink>
          <NavLink to="/signup">
            <Button mt="md" type="button">
              Signup
            </Button>
          </NavLink>
          <NavLink to="/login">
            <Button mt="md" type="button">
              Login
            </Button>
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
