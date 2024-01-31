import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import appLogo from "../assets/applogo_color.png";
import image1 from "../assets/image1.jpeg"
import { NavLink } from "react-router-dom";
import styles from "../styles/Homepage.module.css";
import { Button } from "@mantine/core";

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/trips");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {isAuthenticated ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.heroSection}>
          <div className={styles.heroBackground}></div>
            <img src={appLogo} />
            <h1>Plan, Pack, and Play <br/> WanderBasket, your ultimate travel grocery companion</h1>
          
            <p>
            Join 5 million people already using WanderBasket for efficient vacation planning! Coordinate 
            groceries effortlessly, assign tasks, and get a ready-to-print shared shopping list. 
            Simplify group getaways and try WanderBasket for free.
            </p>
            <NavLink className={styles.signupBtn} to="/signup">
                <Button type="button">
                  Sign Up For Free
                </Button>
            </NavLink>
          </div>

          <div className={styles.descriptionSection}>
            <img src={image1} />
            <div className={styles.textCtn}>
              <h2>Smart Grocery Lists</h2>
              <p>No more wandering through aisles wondering what to buy! WanderBasket's integrated grocery 
                list feature simplifies your shopping experience. Tailored to your preferences and dietary 
                needs, our smart lists ensure you never miss a crucial ingredient. Plan meals effortlessly, 
                save time, and indulge in stress-free shopping with the perfect grocery companion.</p>
            </div>
          </div>
          <div className={`${styles.descriptionSection} ${styles.reversed}`}>
            <div className={styles.textCtn}>
                <h2>Discover the Unseen</h2>
                <p>Effortlessly transition from exploration to shopping with WanderBasket's seamless integration. 
                  As you learn about local cuisines and specialties, add the ingredients to your virtual basket 
                  with a simple click. The transition from planning to purchasing has never been smoother.</p>
            </div>  
            <img src={image1} />
          </div>
          <div className={styles.descriptionSection}>
            <img src={image1} />
            <div className={styles.textCtn}>
                <h2>User-Friendly Interface</h2>
                <p>WanderBasket's intuitive React-based interface ensures a delightful user experience. 
                  Navigate through destinations, view rich content, and manage your grocery list effortlessly. 
                  The responsive design ensures that you can access WanderBasket anytime, anywhere, across various devices.</p>
            </div>
          </div>

        </>
      )}
    </>
  );
};

export default HomePage;
