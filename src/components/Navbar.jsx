import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Text } from '@mantine/core';
import appLogo from "../assets/appLogo.png";
import styles from "../styles/navbar.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@mantine/core";

const Navbar = () => {
  const { isAuthenticated, logout, userId } = useContext(AuthContext);
  

  return (
    <nav>
      {isAuthenticated ? (
        <div className={styles.navbar}>
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
