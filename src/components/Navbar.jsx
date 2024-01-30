import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Text } from "@mantine/core";
import appLogo from "../assets/applogo_bk.png";
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
            New Trip
          </NavLink >
          
          <Menu>
            <Menu.Target>
              <Text className={styles.profileCtn}>
                My Profile
              </Text>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                <NavLink to={`/user/${userId}/update`}>
                  <Text>Edit Profile</Text>
                </NavLink >
                
                <Menu.Divider />

                <NavLink to="/">
                  <Text onClick={logout}>Logout</Text>
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
            <Button type="button">
              Signup
            </Button>
          </NavLink>
          <NavLink to="/login">
            <Button type="button">
              Login
            </Button>
          </NavLink>
        </div>
      )}
    </nav>
  );
}; 

export default Navbar;
