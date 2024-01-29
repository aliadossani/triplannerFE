import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Text } from '@mantine/core';
import appLogo from "../assets/appLogo.png";
import styles from "../styles/Navbar.module.css";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, userId } = useContext(AuthContext);
  

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
          
          <Menu shadow="md" width={200}>
      <Menu.Target>
        <Text size="lg" c="black">My Profile</Text>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          
          <NavLink to={`/user/${userId}/update`}>
            <Text size="md" c="black">Edit Profile</Text>
          </NavLink >
          
          <Menu.Divider />

          <NavLink to="/">
            <Text size="md" c="black" onClick={logout}>Logout</Text>
          </NavLink>
        </Menu.Label>

      </Menu.Dropdown>
    </Menu>
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
