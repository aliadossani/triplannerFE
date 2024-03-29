import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Text } from "@mantine/core";
import { IconChevronDown, IconSquareRoundedPlus } from "@tabler/icons-react";
import appLogo from "../assets/applogo_color.png";
import styles from "../styles/navbar.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@mantine/core";

const Navbar = () => {
  const [formData, setFormData] = useState({});
  const [isOpened, setIsOpened] = useState(false);
  const { isAuthenticated, logout, userId, fetchWithToken, userDetails } =
    useContext(AuthContext);

  useEffect(() => {
    if (userId) {
      getUserProfile();
    }
  }, [userId, userDetails]);

  const getUserProfile = async () => {
    try {
      const response = await fetchWithToken(`/users/${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setFormData(userData);
      } else {
        alert("Couldn't fetch user");
        console.log("Something went wrong");
      }
    } catch (error) {
      alert("Couldn't fetch user: " + error);
      console.log(error);
    }
  };

  return (
    <div className={styles.navbarParent}>
      {isAuthenticated ? (
        <div className={styles.navbar}>
          <div className={styles.iconContainer}>
            <NavLink to="/trips">
              <img src={appLogo} />
            </NavLink>
            <NavLink to="/trips/new" className={styles.newTrip}>
              <IconSquareRoundedPlus />
              New Trip
            </NavLink>
          </div>

          <Menu opened={isOpened} onClick={() => setIsOpened(!isOpened)}>
            <Menu.Target>
              <div className={styles.profileEntryContainer}>
                <img
                  className={styles.profileEntryImg}
                  src={
                    formData?.picture ||
                    "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                  }
                />
                <div>
                  <Text className={styles.profileEntryText}>
                    {formData?.username}
                  </Text>
                  <Text className={styles.profileEntryText}>
                    {formData?.email}
                  </Text>
                </div>
                <IconChevronDown
                  className={styles.profileEntryIcon}
                  size="1.5rem"
                />
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                <NavLink
                  to={`/user/${userId}/update`}
                  onClick={() => setIsOpened(!isOpened)}
                >
                  <Text>Edit Profile</Text>
                </NavLink>

                <Menu.Divider />

                <NavLink to="/" onClick={() => setIsOpened(!isOpened)}>
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
          <div>
            <NavLink to="/signup">
              <Button type="button" className={styles.navlinkBtn}>
                Sign Up
              </Button>
            </NavLink>
            <NavLink to="/login">
              <Button className={styles.navlinkBtn} type="button">
                Log In
              </Button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
